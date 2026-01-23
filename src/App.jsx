import { useState } from 'react';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import Filters from './Components/Filters';
import FlightList from './Components/FlightList';
import PriceGraph from './Components/PriceGraph';

function App() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Filter states
  const [selectedStops, setSelectedStops] = useState([]); 
  const [maxPrice, setMaxPrice] = useState(2000);
  const [selectedAirlines, setSelectedAirlines] = useState([]); 

  // Get unique airlines from flights
  const getUniqueAirlines = () => {
    const airlines = flights.map(flight => flight.airline);
    return [...new Set(airlines)]; // Remove duplicates
  };

  // Filter flights based on user selections
  const getFilteredFlights = () => {
    let filtered = [...flights];

    // Filter by stops
    if (selectedStops.length > 0) {
      filtered = filtered.filter(flight => {
        const stops = flight.stops >= 2 ? 2 : flight.stops; // 2+ stops = 2
        return selectedStops.includes(stops);
      });
    }

    // Filter by price
    filtered = filtered.filter(flight => flight.price <= maxPrice);

    // Filter by airline
    if (selectedAirlines.length > 0) {
      filtered = filtered.filter(flight => 
        selectedAirlines.includes(flight.airline)
      );
    }

    return filtered;
  };

  const filteredFlights = getFilteredFlights();

  const searchFlights = async ({ origin, destination, date }) => {
    try {
      setLoading(true);
      
      // Step 1: Get access token
      const tokenRes = await axios.post(
        'https://test.api.amadeus.com/v1/security/oauth2/token',
        `grant_type=client_credentials&client_id=${import.meta.env.VITE_AMADEUS_API_KEY}&client_secret=${import.meta.env.VITE_AMADEUS_API_SECRET}`,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      const token = tokenRes.data.access_token;

      // Step 2: Search flights
      const flightRes = await axios.get(
        'https://test.api.amadeus.com/v2/shopping/flight-offers',
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate: date,
            adults: 1,
            max: 50
          }
        }
      );

      //  Simplify flight data
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
      
      // Reset filters when new search
      setSelectedStops([]);
      setMaxPrice(2000);
      setSelectedAirlines([]);

    } catch (error) {
      console.error('Error:', error);
      alert('Search failed. Check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-Grotest bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">✈️ Flight Search</h1>
      
      <SearchForm onSearch={searchFlights} />
      
      {/* Layout: Filters on left, Results on right */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        
        {/* Filters Sidebar */}
        <div className="md:col-span-1">
          <Filters
            selectedStops={selectedStops}
            setSelectedStops={setSelectedStops}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            selectedAirlines={selectedAirlines}
            setSelectedAirlines={setSelectedAirlines}
            availableAirlines={getUniqueAirlines()}
          />
        </div>

        {/* Results + Graph */}
        <div className="md:col-span-3">
          <FlightList flights={filteredFlights} loading={loading} />
          <PriceGraph flights={filteredFlights} />
        </div>
      </div>
    </div>
  );
}

export default App;