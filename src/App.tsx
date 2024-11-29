import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './components/Navbar/Navbar';
import LoginSignupPage from './components/LoginSignupPage/LoginSignupPage';
import ViewPartyPage from './components/ViewPartyPage/ViewPartyPage';
import AddPartyPage from './components/AddPartyPage/AddPartyPage';
import ChatGPTPage from './components/ChatGPTPage/ChatGPTPage';
import ChatPage from './components/ChatPage/ChatPage';
import MyPostersPage from './components/MyPostersPage/MyPostersPage';
import './App.css';

const App: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    // Show a loading screen while authentication status is being determined
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div> {/* Circular loading spinner */}
      </div>
    );
  }

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <ViewPartyPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/add-party"
          element={
            isAuthenticated ? <AddPartyPage /> : <Navigate to="/login" replace />
          }
        />
        <Route 
          path="/chat-gpt" 
          element={<ChatGPTPage />}
        />
        <Route 
          path="/login" 
          element={<LoginSignupPage />} 
        />
        <Route 
          path="/chat" 
          element={<ChatPage />} 
        />
        <Route 
          path="/my-posters" 
          element={<MyPostersPage />} />
      </Routes>
    </Router>
  );
};

export default App;
