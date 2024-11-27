import React, { useState } from 'react';
import './AddPartyPage.css';

const AddPartyPage: React.FC = () => {
  const [eventName, setEventName] = useState<string>(''); // State for event name
  const [eventDate, setEventDate] = useState<string>(''); // State for event date
  const [eventLocation, setEventLocation] = useState<string>(''); // State for event location
  const [eventPoster, setEventPoster] = useState<string>(''); // State for event poster

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Here you can handle the form submission (e.g., send data to the backend)
    const partyData = {
      name: eventName,
      date: eventDate,
      location: eventLocation,
      poster: eventPoster,
    };

    console.log(partyData); // For now, just log the data

    // You can perform further actions like sending the data to the backend
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
            onChange={(e) => setEventLocation(e.target.value)}
            placeholder="Enter the event poster url"
            required
          />
        </div>

        <button type="submit" className="add-party-button">Add Party</button>
      </form>
    </div>
  );
};

export default AddPartyPage;
