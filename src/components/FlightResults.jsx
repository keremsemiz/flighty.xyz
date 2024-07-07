import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchFlights } from '../services/api';

function FlightResults() {
  const [flights, setFlights] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const origin = params.get('origin');
    const maxPrice = params.get('maxPrice');

    const fetchFlights = async () => {
      const data = await searchFlights(origin, maxPrice);
      setFlights(data.data);
    };

    fetchFlights();
  }, [location.search]);

  return (
    <div>
      <h1>Flight Results</h1>
      <ul>
        {flights.map((flight, index) => (
          <li key={index}>
            {flight.destination}: {flight.price.total} EUR
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FlightResults;
