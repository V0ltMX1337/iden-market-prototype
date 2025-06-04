const PromoSection = () => {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 mb-8 flex items-center border border-gray-100">
      <div className="flex-1 pr-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">iPhone 12</h2>
        <p className="text-xl text-gray-500 mb-1">Во-первых,</p>
        <p className="text-xl text-gray-500 mb-6">это быстро.</p>
        <p className="text-gray-400 text-base">Уже в продаже.</p>
      </div>
      <div className="flex-1 flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=350&fit=crop"
          alt="iPhone 12 lineup"
          className="max-w-lg h-72 object-contain"
        />
      </div>
    </div>
  );
};

export default PromoSection;
