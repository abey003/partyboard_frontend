import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import './MyPostersPage.css';

interface Party {
  _id: string;
  name: string;
  date: string;
  location: string;
  poster: string;
}

const MyPostersPage: React.FC = () => {
  const [myParties, setMyParties] = useState<Party[]>([]);
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  // Fetch user's parties on component load
  useEffect(() => {
    const fetchUserParties = async () => {
      if (isAuthenticated && user?.email) {
        try {
          const response = await axios.get(`http://localhost:5000/parties/user`, {
            params: { email: user.email }, // Send user's email as query param
          });
          setMyParties(response.data); // Store the fetched parties
        } catch (error) {
          alert('Error fetching user parties.');
        }
      }
    };

    fetchUserParties();
  }, [isAuthenticated, user]);

  // Delete party handler
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this party?')) {
      try {
        await axios.delete(`http://localhost:5000/parties/${id}`);
        // Remove the deleted party from the state
        setMyParties(myParties.filter((party) => party._id !== id));
        alert('Party deleted successfully!');
      } catch (error) {
        alert('Failed to delete party.');
      }
    }
  };

  // Navigate to Add Party Page with pre-filled data for updating
  const handleUpdate = (party: Party) => {
    navigate('/add-party', { state: { party } }); // Pass party data as state
  };

  return (
    <div className="my-posters-container">
      <h1>My Uploaded Posters</h1>
      {myParties.length === 0 ? (
        <p>You haven't uploaded any parties yet.</p>
      ) : (
        <div className="posters-grid">
          {myParties.map((party) => (
            <div key={party._id} className="poster-card">
              <div className="poster-details">
                <h2>{party.name}</h2>
                <p>{party.date}</p>
                <p>{party.location}</p>
              </div>
              <img src={party.poster} alt={party.name} className="poster-image" />
              <div className="poster-actions">
                <button onClick={() => handleUpdate(party)} className="update-button">
                  Update
                </button>
                <button onClick={() => handleDelete(party._id)} className="delete-button">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPostersPage;
