const PromoSection = () => {
  return (
    <div className="bg-gradient-to-r from-gray-100 to-white rounded-2xl p-8 mb-8 flex items-center">
      <div className="flex-1">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">iPhone 12</h2>
        <p className="text-xl text-gray-600 mb-1">Во-первых,</p>
        <p className="text-xl text-gray-600 mb-4">это быстро.</p>
        <p className="text-gray-500 text-lg">Уже в продаже.</p>
      </div>
      <div className="flex-1 flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop"
          alt="iPhone 12 lineup"
          className="max-w-md h-64 object-contain"
        />
      </div>
    </div>
  );
};

export default PromoSection;
