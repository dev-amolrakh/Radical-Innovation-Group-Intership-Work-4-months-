import React, { useState } from "react";
import axios from "axios";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';  // Import the necessary styles

function App() {
  const [phone, setPhone] = useState(""); // State for phone number
  const [otp, setOtp] = useState(""); // State for OTP
  const [name, setName] = useState(""); // State for user name
  const [email, setEmail] = useState(""); // State for user email
  const [step, setStep] = useState(1); // Step 1: Enter phone; Step 2: Enter OTP
  const [welcomeMessage, setWelcomeMessage] = useState(""); // State for welcome message
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to check if user is authenticated

  const sendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/send-otp", {
        phone_number: phone,
      });
      if (response.status === 200) {
        setStep(2); // Move to OTP verification step
        alert("OTP sent successfully!");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Error sending OTP. Please try again.");
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/verify-otp", {
        phone_number: phone,
        otp: otp,
      });
      if (response.status === 200) {
        alert("OTP verified successfully!");
        setStep(1); // Reset after verification
        setIsAuthenticated(true); // User is authenticated after OTP verification
        setWelcomeMessage("Welcome! OTP verified successfully."); // Show welcome message
      }
    } catch (error) {
      alert("Invalid OTP. Please try again.");
      console.error("Error verifying OTP:", error);
    }
  };

  const signOut = () => {
    setIsAuthenticated(false); // Reset authentication state
    setPhone(""); // Clear phone number
    setOtp(""); // Clear OTP input
    setStep(1); // Reset to phone number step
    setName(""); // Clear user name
    setEmail(""); // Clear user email
    setWelcomeMessage(""); // Clear welcome message
    alert("You have been signed out.");
  };

  return (
    <div style={styles.container}>
      <h1>Phone Number OTP Verification</h1>
      {welcomeMessage && <h2 style={styles.welcomeMessage}>{welcomeMessage}</h2>}

      {isAuthenticated ? (
        <div>
          <button style={styles.signOutButton} onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <>
          {step === 1 ? (
            <div style={styles.form}>
              <input
                style={styles.input}
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                style={styles.input}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <PhoneInput
                style={styles.input}
                international
                placeholder="Enter phone number"
                value={phone}
                onChange={setPhone} // Handle phone number change
              />
              <button style={styles.button} onClick={sendOtp}>Send OTP</button>
            </div>
          ) : (
            <div style={styles.form}>
              <input
                style={styles.input}
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button style={styles.button} onClick={verifyOtp}>Verify OTP</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial, sans-serif",
  },
  welcomeMessage: {
    color: "green",
    fontSize: "20px",
    marginTop: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    maxWidth: "400px",
    margin: "0 auto",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "80%",
    maxWidth: "350px",
    margin: "5px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  signOutButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default App;
