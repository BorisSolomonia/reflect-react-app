// src/components/ThirdPartySignIn.js
import React from 'react';
import axios from 'axios';

const ThirdPartySignIn = () => {
  const handleThirdPartySignIn = async (provider) => {
    try {
      const response = await axios.get(`/auth/oauth2/authorization/${provider}`);
      // Redirect user to third-party login page
      window.location.href = response.data.authorizationUrl;
    } catch (error) {
      console.error('Third-Party Sign-In Error:', error);
    }
  };

  return (
    <div>
      <h2>Third-Party Sign-In</h2>
      <button onClick={() => handleThirdPartySignIn('google')}>Sign In with Google</button>
    </div>
  );
};

export default ThirdPartySignIn;
