import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function PriceGraph({ flights }) {
  if (flights.length === 0) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg mt-8">
        <h2 className="text-2xl font-bold mb-4">📊 Price Trends</h2>
        <p className="text-gray-400">No data to display</p>
      </div>
    );
  }

  // Group by airline
  const airlineData = {};
  
  flights.forEach(flight => {
    if (!airlineData[flight.airline]) {
      airlineData[flight.airline] = {
        prices: [],
        count: 0
      };
    }
    airlineData[flight.airline].prices.push(flight.price);
    airlineData[flight.airline].count += 1;
  });

  // Calculate averages
  const graphData = Object.keys(airlineData).map(airline => {
    const prices = airlineData[airline].prices;
    const total = prices.reduce((sum, price) => sum + price, 0);
    const average = total / prices.length;
    
    return {
      airline: airline,
      avgPrice: Math.round(average),
      flights: airlineData[airline].count
    };
  });

  return (
    <div className="bg-gray-800 p-6 rounded-lg mt-8 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">📊 Price Trends</h2>
        <p className="text-sm text-gray-400">
          Average price by airline
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={graphData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="airline" 
            stroke="#9ca3af"
            style={{ fontSize: '14px' }}
          />
          <YAxis 
            stroke="#9ca3af"
            style={{ fontSize: '14px' }}
            label={{ 
              value: 'Average Price ($)', 
              angle: -90, 
              position: 'insideLeft',
              style: { fill: '#9ca3af' }
            }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1f2937', 
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#fff'
            }}
            formatter={(value) => [`$${value}`, 'Avg Price']}
          />
          <Bar 
            dataKey="avgPrice" 
            fill="#10b981" 
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
      
      <p className="text-sm text-gray-400 mt-4">
        Displaying {flights.length} flights across {graphData.length} airlines
      </p>
    </div>
  );
}