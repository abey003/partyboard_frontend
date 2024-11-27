import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import './LoginSignupPage.css';

const LoginSignupPage: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to View Party page after successful login
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Welcome to PartyBoard 🎉</h1>
        <p className="subtitle">
          Log in to explore and share the best parties around the globe!
        </p>
        <button className="button" onClick={() => loginWithRedirect()}>
          Login / Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginSignupPage;
