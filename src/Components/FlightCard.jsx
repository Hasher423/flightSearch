import FlightCard from './FlightCard';

export default function FlightList({ flights, loading }) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 mt-4">Searching flights...</p>
      </div>
    );
  }

  if (flights.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-2xl mb-2">✈️ No flights found</p>
        <p className="text-gray-400">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {flights.length} Flights Found
        </h2>
        <p className="text-gray-400 text-sm">
          Sorted by price
        </p>
      </div>
      
      {flights
        .sort((a, b) => a.price - b.price) // Sort by price
        .map(flight => (
          <FlightCard key={flight.id} flight={flight} />
        ))
      }
    </div>
  );
}