const PromoSection = () => {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 mb-8 flex items-center border border-gray-200">
      <div className="flex-1 pr-8">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">iPhone 12</h2>
        <p className="text-2xl text-gray-500 mb-2">Во-первых,</p>
        <p className="text-2xl text-gray-500 mb-6">это быстро.</p>
        <p className="text-gray-400 text-lg">Уже в продаже.</p>
      </div>
      <div className="flex-1 flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=400&fit=crop"
          alt="iPhone 12 lineup"
          className="max-w-md h-80 object-contain"
        />
      </div>
    </div>
  );
};

export default PromoSection;
