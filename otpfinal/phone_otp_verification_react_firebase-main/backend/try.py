from flask import Flask, request, jsonify
from twilio.rest import Client
import random
import os

app = Flask(__name__)

# Twilio configuration
TWILIO_ACCOUNT_SID = os.environ.get("TWILIO_ACCOUNT_SID")  # Store in environment variables
TWILIO_AUTH_TOKEN = os.environ.get("TWILIO_AUTH_TOKEN")    # Store in environment variables
TWILIO_PHONE_NUMBER = os.environ.get("TWILIO_PHONE_NUMBER")  # Store in environment variables

# Initialize Twilio client
client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

# Store OTPs temporarily (for demonstration purposes only; use a database for production)
otp_storage = {}

@app.route('/send-otp', methods=['POST'])
def send_otp():
    data = request.get_json()
    phone_number = data.get('phone_number')
    
    if not phone_number:
        return jsonify({"error": "Phone number is required"}), 400
    
    # Generate a random 6-digit OTP
    otp = random.randint(100000, 999999)
    otp_storage[phone_number] = otp  # Store the OTP for verification purposes
    
    # Send the OTP via Twilio
    try:
        client.messages.create(
            body=f"Your OTP is: {otp}",
            from_=TWILIO_PHONE_NUMBER,
            to=phone_number
        )
        return jsonify({"message": "OTP sent successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
