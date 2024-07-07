import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookFlight } from '../services/api';

function Booking() {
  const { id } = useParams();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await bookCar(id, startDate, endDate, token);
      navigate('/profile');
    } catch (error) {
      console.error('Booking failed', error);
    }
  };

  return (
    <form onSubmit={handleBooking}>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      <button type="submit">Book</button>
    </form>
  );
}

export default Booking;
