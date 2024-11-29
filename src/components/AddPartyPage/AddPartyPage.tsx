import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // For accessing and navigating with state
import { useAuth0 } from '@auth0/auth0-react'; // Import useAuth0 to get user info
import axios from 'axios';
import './AddPartyPage.css';

const AddPartyPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0(); // Get Auth0 user info

  // Check if we're updating a party by looking for prefilled data in state
  const partyToEdit = location.state?.party;

  // Define state for each form field
  const [eventName, setEventName] = useState<string>(partyToEdit?.name || '');
  const [eventDate, setEventDate] = useState<string>(partyToEdit?.date || '');
  const [eventLocation, setEventLocation] = useState<string>(partyToEdit?.location || '');
  const [eventPoster, setEventPoster] = useState<string>(partyToEdit?.poster || '');
  const [email, setEmail] = useState<string | null>(null);

  // Fetch email when the component loads
  useEffect(() => {
    if (isAuthenticated && user?.email) {
      setEmail(user.email); // Set email in state
    } else {
      console.log('User not authenticated');
    }
  }, [isAuthenticated, user]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert('Error: Email is required. Please log in again.');
      return;
    }

    // Create the party data to send to the backend
    const partyData = {
      name: eventName,
      date: eventDate,
      location: eventLocation,
      poster: eventPoster,
      email, 
    };

    try {
      if (partyToEdit) {
        // Update an existing party
        await axios.put(`http://localhost:5000/parties/${partyToEdit._id}`, partyData);
        alert('Party updated successfully!');
      } else {
        // Add a new party
        await axios.post('http://localhost:5000/parties', partyData);
        alert('Party added successfully!');
      }
      navigate('/my-posters'); // Redirect to My Posters page
    } catch (error: any) {
      alert('Failed to save party.');
    }
  };

  return (
    <div className="add-party-container">
      <h1>{partyToEdit ? 'Update Party' : 'Add a Party'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="event-name">Event Name</label>
          <input
            type="text"
            id="event-name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Enter the event name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="event-date">Event Date</label>
          <input
            type="date"
            id="event-date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="event-location">Event Location</label>
          <input
            type="text"
            id="event-location"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            placeholder="Enter the event location"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="event-poster">Event Poster</label>
          <input
            type="text"
            id="event-poster"
            value={eventPoster}
            onChange={(e) => setEventPoster(e.target.value)}
            placeholder="Enter the event poster URL"
            required
          />
        </div>
        <button type="submit" className="add-party-button">
          {partyToEdit ? 'Update Party' : 'Add Party'}
        </button>
      </form>
    </div>
  );
};

export default AddPartyPage;
