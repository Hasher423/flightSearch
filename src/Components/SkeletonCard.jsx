function SkeletonCard() {
  return (
    <div className="p-4 rounded-lg bg-gray-800 animate-pulse flex justify-between">
      <div className="space-y-3">
        <div className="h-4 w-24 bg-gray-700 rounded"></div>
        <div className="h-3 w-32 bg-gray-700 rounded"></div>
        <div className="h-3 w-28 bg-gray-700 rounded"></div>
      </div>
      <div className="h-6 w-16 bg-gray-700 rounded"></div>
    </div>
  );
}

export default SkeletonCard;
