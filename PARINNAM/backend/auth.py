# auth.py
from flask import Blueprint, request, jsonify, current_app
from twilio.rest import Client
from random import randint
import smtplib
import jwt
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash
from functools import wraps
import config
import logging

# Create a Blueprint instance for the authentication module
auth_app = Blueprint('auth', __name__)

# Twilio client setup
twilio_client = Client(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN)

# Temporary storage for OTPs and users
otps = {}
users = {}

# Set up logging
logging.basicConfig(level=logging.DEBUG)

def generate_otp():
    return randint(100000, 999999)

def send_otp_via_sms(phone_number, otp):
    message = f"Your OTP is: {otp}"
    try:
        twilio_client.messages.create(
            body=message,
            from_=config.TWILIO_PHONE_NUMBER,
            to=phone_number
        )
    except Exception as e:
        logging.error(f"Failed to send SMS: {e}")
        raise Exception(f"SMS sending failed: {str(e)}")

def send_otp_via_email(email, otp):
    sender_email = config.EMAIL_USERNAME
    password = config.EMAIL_PASSWORD
    message = f"Subject: Your OTP\n\nYour OTP is: {otp}"

    try:
        with smtplib.SMTP_SSL(config.SMTP_SERVER, config.SMTP_PORT) as server:
            server.login(sender_email, password)
            server.sendmail(sender_email, email, message)
    except Exception as e:
        logging.error(f"Failed to send email: {e}")
        raise Exception(f"Email sending failed: {str(e)}")

@auth_app.route('/send-otp', methods=['POST'])
def send_otp():
    data = request.json
    contact = data['contact']
    otp = generate_otp()
    otps[contact] = otp

    try:
        if data['method'] == 'sms':
            send_otp_via_sms(contact, otp)
        elif data['method'] == 'email':
            send_otp_via_email(contact, otp)
        return jsonify({'message': 'OTP sent successfully'}), 200
    except Exception as e:
        logging.error(f"Error sending OTP: {e}")
        return jsonify({'message': 'Failed to send OTP', 'error': str(e)}), 500
