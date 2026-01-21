import { useState } from 'react';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import FlightList from './Components/FlightList';

function App() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);




  const searchFlights = async ({ origin, destination, date }) => {
    try {
      setLoading(true)
      // Get token
      const tokenRes = await axios.post(
        'https://test.api.amadeus.com/v1/security/oauth2/token',
        `grant_type=client_credentials&client_id=${import.meta.env.VITE_AMADEUS_API_KEY}&client_secret=${import.meta.env.VITE_AMADEUS_API_SECRET}`,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      const token = tokenRes.data.access_token;


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

      const normalizedFlights = flightRes.data.data.map(flight => {
        const itinerary = flight.itineraries[0];
        const segments = itinerary.segments;

        return {
          id: flight.id,
          price: Number(flight.price.total),
          stops: segments.length - 1,
          airline: segments[0].carrierCode,
          departure: segments[0].departure.at,
          arrival: segments[segments.length - 1].arrival.at,
          duration: itinerary.duration
        };
      });

      setFlights(normalizedFlights);








    } catch (error) {
      console.error('Error:', error);
      alert('Search failed. Check console.');
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen font-Grotest bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">✈️ Flight Search</h1>
      <SearchForm onSearch={searchFlights} />
      <FlightList flights={flights} loading={loading  } />
    </div>
  );
}

export default App;