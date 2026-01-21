export default function FlightCard({ flight }) {
  const price = flight.price.total;
  const currency = flight.price.currency;
  const stops = flight.itineraries[0].segments.length - 1;
  const departure = flight.itineraries[0].segments[0].departure.at;
  const arrival = flight.itineraries[0].segments[stops].arrival.at;

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-4 hover:bg-gray-750 transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xl font-bold">{price} {currency}</p>
          <p className="text-gray-400">
            {new Date(departure).toLocaleTimeString()} → {new Date(arrival).toLocaleTimeString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">
            {stops === 0 ? 'Non-stop' : `${stops} stop(s)`}
          </p>
        </div>
      </div>
    </div>
  );
}