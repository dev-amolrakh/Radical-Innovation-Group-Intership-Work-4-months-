import React, { useState } from 'react';
import axios from 'axios';

function SignupPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [correctOtp, setCorrectOtp] = useState('');
  const [message, setMessage] = useState('');

  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleOtpChange = (e) => setOtp(e.target.value);

  const sendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        phone_number: phoneNumber
      });
      setMessage(response.data.message);
      setCorrectOtp(response.data.otp);
    } catch (error) {
      console.error(error);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/verify_otp', {
        otp,
        correct_otp: correctOtp
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage('Invalid OTP');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input
        type="text"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="Enter your phone number"
      />
      <button onClick={sendOtp}>Send OTP</button>

      {message && <p>{message}</p>}

      {correctOtp && (
        <>
          <input
            type="text"
            value={otp}
            onChange={handleOtpChange}
            placeholder="Enter OTP"
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
}

export default SignupPage;
