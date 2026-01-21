import SkeletonCard from "./SkeletonCard";

const formatDuration = (duration) => {
    if (!duration) return '';

    const hours = duration.match(/(\d+)H/)?.[1];
    const minutes = duration.match(/(\d+)M/)?.[1];

    if (hours && minutes) return `${hours}h ${minutes}m`;
    if (hours) return `${hours}h`;
    if (minutes) return `${minutes}m`;

    return duration;
};

function FlightList({ flights, loading }) {
    if (loading) {
        return (
            <div className="mt-6 space-y-4">
                {[...Array(5)].map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        );
    }
    if (!flights.length) {
        return (
            <div className="mt-10 text-center text-gray-400">
                <p className="text-lg">No flights found ✈️</p>
                <p className="text-sm mt-2">
                    Try adjusting your search or filters.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-6 space-y-4">
            {flights.map(flight => (
                <div
                    key={flight.id}
                    className="p-4 rounded-lg bg-gray-800 flex justify-between"
                >
                    <div>
                        <p className="text-lg font-semibold">{flight.airline}</p>
                        <p className="text-sm text-gray-400">
                            Stops: {flight.stops}
                        </p>
                        <p className="text-sm text-gray-400">
                            Duration: {formatDuration(flight.duration)}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-2xl font-bold">${flight.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FlightList;
