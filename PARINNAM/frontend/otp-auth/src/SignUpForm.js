import React, { useState } from 'react';
import axiosInstance from './axiosInstance';

function SignUpForm() {
    const [contact, setContact] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [token, setToken] = useState('');

    const sendOtp = async () => {
        setErrorMessage('');
        try {
            await axiosInstance.post('/send-otp', {
                contact,
                method: contact.includes('@') ? 'email' : 'sms'
            });
            setIsOtpSent(true);
            alert('OTP sent successfully!');
        } catch (error) {
            const errorMsg = error.response?.data?.error || 'Failed to send OTP. Please check the contact details.';
            setErrorMessage(errorMsg);
        }
    };

    const verifyOtp = async () => {
        setErrorMessage('');
        try {
            const response = await axiosInstance.post('/verify-otp', { contact, otp });
            setToken(response.data.token);
            setIsOtpVerified(true);
            alert('OTP verified successfully!');
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Invalid OTP. Please try again.';
            setErrorMessage(errorMsg);
        }
    };

    const handleSignUp = async () => {
        if (!isOtpVerified) {
            setErrorMessage('Please verify the OTP before signing up.');
            return;
        }

        try {
            await axiosInstance.post('/sign-up', { contact, password }, {
                headers: { 'x-access-token': token }
            });
            alert('Sign-up successful!');
            // Redirect to login or homepage
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Sign-up failed. Please try again.';
            setErrorMessage(errorMsg);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h2>Sign Up</h2>
            <input
                type="text"
                placeholder="Email or Mobile"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                disabled={isOtpSent || isOtpVerified}
                style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
            />
            {!isOtpSent && (
                <button onClick={sendOtp} style={{ width: '100%', padding: '10px' }}>Send OTP</button>
            )}
            {isOtpSent && !isOtpVerified && (
                <>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                    />
                    <button onClick={verifyOtp} style={{ width: '100%', padding: '10px' }}>Verify OTP</button>
                </>
            )}
            {isOtpVerified && (
                <>
                    <input
                        type="password"
                        placeholder="Set Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                    />
                    <button onClick={handleSignUp} style={{ width: '100%', padding: '10px' }}>Sign Up</button>
                </>
            )}
            {errorMessage && (
                <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
            )}
        </div>
    );
}

export default SignUpForm;
