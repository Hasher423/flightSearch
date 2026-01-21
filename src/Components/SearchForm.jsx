import { useState } from 'react';

export default function SearchForm({ onSearch }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    await onSearch({ origin, destination, date });
    setLoading(false);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Origin (JFK)"
          value={origin}
          onChange={(e) => setOrigin(e.target.value.toUpperCase())}
          className="bg-gray-700 p-3 rounded text-white"
        />
        <input
          type="text"
          placeholder="Destination (LAX)"
          value={destination}
          onChange={(e) => setDestination(e.target.value.toUpperCase())}
          className="bg-gray-700 p-3 rounded text-white"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-gray-700 p-3 rounded text-white"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 p-3 rounded font-bold disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search Flights'}
        </button>
      </div>
    </div>
  );
}