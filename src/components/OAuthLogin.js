import React from 'react';
import { oauthLogin } from '../services/authService';

const OAuthLogin = () => {
    const handleOAuthLogin = (provider) => {
        oauthLogin(provider)
            .then(response => {
                window.location.href = response.data.redirectUrl;
            })
            .catch(error => {
                console.error('OAuth login failed', error);
            });
    };

    return (
        <div>
            <button onClick={() => handleOAuthLogin('google')}>Login with Google</button>
            <button onClick={() => handleOAuthLogin('facebook')}>Login with Facebook</button>
        </div>
    );
};

export default OAuthLogin;
