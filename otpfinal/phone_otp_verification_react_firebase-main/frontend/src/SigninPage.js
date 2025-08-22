import React, { useState } from 'react';
import axios from 'axios';

function SigninPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const signIn = async () => {
    try {
      const response = await axios.post('http://localhost:5000/signin', {
        email,
        password
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage('Invalid email or password');
    }
  };

  return (
    <div>
      <h2>Signin</h2>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your email"
      />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Enter your password"
      />
      <button onClick={signIn}>Signin</button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default SigninPage;
