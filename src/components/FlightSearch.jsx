import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './search.css'

function FlightSearch() {
  const [origin, setOrigin] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/results?origin=${origin}&maxPrice=${maxPrice}`);
  };
  return (
    <div className='container'>
      <h1 className='title'>Flightmagic</h1>
      <form onSubmit={handleSearch}>
        <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Origin" required />
        <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max Price" required />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default FlightSearch;
