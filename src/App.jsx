import { useState } from 'react';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import FlightList from './Components/FlightList';

function App() {
  const [flights, setFlights] = useState([]);

  const searchFlights = async ({ origin, destination, date }) => {
    try {
      // Get token
      const tokenRes = await axios.post(
        'https://test.api.amadeus.com/v1/security/oauth2/token',
        'grant_type=client_credentials&client_id=YOUR_KEY&client_secret=YOUR_SECRET',
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      
      const token = tokenRes.data.access_token;
      
      // Search flights
      const flightRes = await axios.get(
        'https://test.api.amadeus.com/v2/shopping/flight-offers',
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate: date,
            adults: 1,
            max: 20
          }
        }
      );
      
      setFlights(flightRes.data.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Search failed. Check console.');
    }
  };

  return (
    <div className="min-h-screen font-Grotest bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">✈️ Flight Search</h1>
      <SearchForm onSearch={searchFlights} />
      <FlightList flights={flights} />
    </div>
  );
}

export default App;