from flask import Flask, request, jsonify
from twilio.rest import Client
import random
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Twilio credentials from your Twilio account
account_sid = 'AC359e8d636673bc89023c7804e1a3e94e'
auth_token = '44f469ec6ad88b92eb97a1b4c3d09b29'
twilio_number = '+13347218102'

# In-memory storage for OTP (you can replace it with a database)
otp_storage = {}

# Function to send OTP
def send_otp(phone_number):
    otp = random.randint(10000, 99999)
    message_body = f"Welcome to PARINAAM by YUKTII Ventures. Your one-time password (OTP) is {otp} All the best, Team YUKTII Ventures."

    # Initialize Twilio Client
    client = Client(account_sid, auth_token)

    # Send SMS
    client.messages.create(
        body=message_body,
        from_=twilio_number,
        to=phone_number
    )

    # Store OTP in-memory (or save to database)
    otp_storage[phone_number] = otp
    print(f"OTP sent to {phone_number}: {otp}")
    return otp

@app.route('/send-otp', methods=['POST'])
def send_otp_route():
    data = request.json
    phone_number = data.get('phone_number')

    if not phone_number:
        return jsonify({"message": "Phone number is required"}), 400

    # Send OTP and store it
    send_otp(phone_number)
    return jsonify({"message": "OTP sent successfully!"}), 200

@app.route('/verify-otp', methods=['POST'])
def verify_otp_route():
    data = request.json
    phone_number = data.get('phone_number')
    otp = data.get('otp')

    if not phone_number or not otp:
        return jsonify({"message": "Phone number and OTP are required"}), 400

    # Verify OTP
    stored_otp = otp_storage.get(phone_number)
    if stored_otp is None:
        return jsonify({"message": "OTP not found. Please request OTP first."}), 400

    if int(otp) == stored_otp:
        # OTP is correct, proceed with signup or other operations
        return jsonify({"message": "OTP verified successfully!"}), 200
    else:
        return jsonify({"message": "Invalid OTP. Please try again."}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
