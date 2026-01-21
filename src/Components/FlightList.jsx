import FlightCard from './FlightCard';

export default function FlightList({ flights }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {flights.length} Flights Found
      </h2>
      {flights.length === 0 ? (
        <p className="text-gray-400">No flights found. Try searching.</p>
      ) : (
        flights.map((flight, index) => (
          <FlightCard key={index} flight={flight} />
        ))
      )}
    </div>
  );
}