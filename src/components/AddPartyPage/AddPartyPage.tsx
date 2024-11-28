import React, { useState } from 'react';
import axios from 'axios';  // Import axios
import './AddPartyPage.css';

const AddPartyPage: React.FC = () => {
  // Define state for each form field
  const [eventName, setEventName] = useState<string>(''); 
  const [eventDate, setEventDate] = useState<string>(''); 
  const [eventLocation, setEventLocation] = useState<string>(''); 
  const [eventPoster, setEventPoster] = useState<string>(''); 

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create the party data to send to the backend
    const partyData = {
      name: eventName,
      date: eventDate,
      location: eventLocation,
      poster: eventPoster,
    };

    try {
      // Send the data to the backend using axios POST request
      const response = await axios.post('http://localhost:5000/parties', partyData, {
        headers: {
          'Content-Type': 'application/json',  // Ensure the request is sent as JSON
        },
      });

      // Handle successful response
      console.log('Party added:', response.data);
      alert('Party added successfully!');
    } catch (error: any) {
      // Handle error
      console.error('Error adding party:', error);
      alert('Error adding party');
    }
  };

  return (
    <div className="add-party-container">
      <h1>Add a Party</h1>
      <p>Use this form to add details of your upcoming party.</p>

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

        <button type="submit" className="add-party-button">Add Party</button>
      </form>
    </div>
  );
};

export default AddPartyPage;
