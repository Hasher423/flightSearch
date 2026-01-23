export default function Filters({
  selectedStops,
  setSelectedStops,
  maxPrice,
  setMaxPrice,
  selectedAirlines,
  setSelectedAirlines,
  availableAirlines
}) {

  // Handle stop checkbox toggle
  const handleStopChange = (stopValue) => {
    if (selectedStops.includes(stopValue)) {
      // Remove if already selected
      const newStops = selectedStops.filter(s => s !== stopValue);
      setSelectedStops(newStops);
    } else {
      // Add if not selected
      setSelectedStops([...selectedStops, stopValue]);
    }
  };

  // Handle airline checkbox toggle
  const handleAirlineChange = (airline) => {
    if (selectedAirlines.includes(airline)) {
      // Remove if already selected
      const newAirlines = selectedAirlines.filter(a => a !== airline);
      setSelectedAirlines(newAirlines);
    } else {
      // Add if not selected
      setSelectedAirlines([...selectedAirlines, airline]);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedStops([]);
    setMaxPrice(2000);
    setSelectedAirlines([]);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg sticky top-4">
      <h3 className="text-xl font-bold mb-4">🔍 Filters</h3>
      
      {/* Stops Filter */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3 text-gray-300">Number of Stops</h4>
        
        <label className="flex items-center gap-2 mb-2 cursor-pointer hover:text-green-400">
          <input
            type="checkbox"
            checked={selectedStops.includes(0)}
            onChange={() => handleStopChange(0)}
            className="w-4 h-4 cursor-pointer"
          />
          <span>Non-stop</span>
        </label>

        <label className="flex items-center gap-2 mb-2 cursor-pointer hover:text-green-400">
          <input
            type="checkbox"
            checked={selectedStops.includes(1)}
            onChange={() => handleStopChange(1)}
            className="w-4 h-4 cursor-pointer"
          />
          <span>1 Stop</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer hover:text-green-400">
          <input
            type="checkbox"
            checked={selectedStops.includes(2)}
            onChange={() => handleStopChange(2)}
            className="w-4 h-4 cursor-pointer"
          />
          <span>2+ Stops</span>
        </label>
      </div>

      {/* Price Range Slider */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3 text-gray-300">Maximum Price</h4>
        <input
          type="range"
          min="0"
          max="2000"
          step="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-green-500"
        />
        <p className="text-sm text-gray-400 mt-2">
          Up to <span className="text-green-400 font-bold">${maxPrice}</span>
        </p>
      </div>

      {/* Airlines Filter */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3 text-gray-300">Airlines</h4>
        
        {availableAirlines.length === 0 ? (
          <p className="text-sm text-gray-500">Search flights first</p>
        ) : (
          availableAirlines.map(airline => (
            <label 
              key={airline} 
              className="flex items-center gap-2 mb-2 cursor-pointer hover:text-green-400"
            >
              <input
                type="checkbox"
                checked={selectedAirlines.includes(airline)}
                onChange={() => handleAirlineChange(airline)}
                className="w-4 h-4 cursor-pointer"
              />
              <span>{airline}</span>
            </label>
          ))
        )}
      </div>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="w-full bg-gray-700 hover:bg-gray-600 p-3 rounded font-semibold transition"
      >
        Reset All Filters
      </button>
    </div>
  );
}