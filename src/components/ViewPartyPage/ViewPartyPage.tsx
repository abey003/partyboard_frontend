import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewPartyPage.css';

interface Party {
  id: string;
  name: string;
  date: string;
  location: string;
  poster: string;
}

const ViewPartyPage: React.FC = () => {
  const [parties, setParties] = useState<Party[]>([]); // State for storing parties
  const [loading, setLoading] = useState<boolean>(true); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error message

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/parties'); // URL to fetch parties from the backend
        setParties(response.data); // Set the response data to state
      } catch (error) {
        setError('Error fetching parties');
      } finally {
        setLoading(false);
      }
    };

    fetchParties();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div> {/* Circular loading spinner */}
      </div>
    );
  }

  return (
    <div className="view-party-container">
      <h1>View Parties</h1>
      <p>Here you can explore upcoming parties happening around the world!</p>

      {error && <p>{error}</p>}

      {parties.length === 0 ? (
        <p className="no-events-message">No events now</p>
      ) : (
        <div className="party-list">
          {parties.map((party) => (
            <div key={party.id} className="party-card">
              <h2>{party.name}</h2>
              <p>Date: {party.date}</p>
              <p>Location: {party.location}</p>
              {party.poster && <img src={party.poster} alt={party.name} className="party-poster" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewPartyPage;
