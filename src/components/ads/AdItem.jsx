// components/ads/AdItem.jsx
import { useState, useEffect } from "react";

const AdItem = ({ 
  type = "banner",  // banner, product, small, google, sidebar
  data, 
  autoRotate = true,
  interval = 10000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (autoRotate && data && data.length > 1) {
      const timer = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % data.length);
          setIsAnimating(false);
        }, 300);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [autoRotate, data, interval]);

  if (!data || data.length === 0) return null;

  const currentData = Array.isArray(data) ? data[currentIndex] : data;

  // Banner Ad
  if (type === "banner") {
    return (
      <div className={`bg-gradient-to-r ${currentData.bg} rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <div className="p-6 text-center text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
            {currentData.icon}
          </div>
          <h3 className="text-lg font-bold mb-2">{currentData.title}</h3>
          <p className="text-sm opacity-90 mb-4">{currentData.desc}</p>
          <button className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition">
            {currentData.btnText}
          </button>
        </div>
      </div>
    );
  }

  // Product Ad
  if (type === "product") {
    return (
      <div className={`bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <div className={`bg-gradient-to-r ${currentData.bg} p-4 text-center text-white`}>
          {currentData.icon}
          <p className="text-sm font-semibold mt-1">{currentData.title}</p>
        </div>
        <div className="p-4 text-center">
          <h4 className="font-bold text-gray-800 mb-1">បញ្ចុះតម្លៃ {currentData.discount}</h4>
          <p className="text-xs text-gray-500 mb-3">{currentData.desc}</p>
          <button className="w-full bg-orange-500 text-white py-2 rounded-xl text-sm font-semibold hover:bg-orange-600 transition">
            {currentData.btnText}
          </button>
        </div>
      </div>
    );
  }

  // Small Grid Ad
  if (type === "small") {
    return (
      <div className={`bg-gradient-to-r ${currentData.bg} rounded-xl p-3 text-center text-white cursor-pointer hover:scale-105 transition-transform duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <div className="inline-flex items-center justify-center w-10 h-10 bg-white/20 rounded-xl mb-2">
          {currentData.icon}
        </div>
        <h4 className="text-xs font-bold">{currentData.title}</h4>
        <p className="text-[10px] opacity-80">{currentData.desc}</p>
      </div>
    );
  }

  // Google Style Ad
  if (type === "google") {
    return (
      <div className={`border border-dashed border-gray-300 rounded-2xl p-4 text-center transition-all duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <div className="text-gray-400 mb-2">{currentData.icon}</div>
        <p className="text-xs text-gray-500">{currentData.text}</p>
        <p className="text-[10px] text-gray-400 mt-1">{currentData.subtext}</p>
      </div>
    );
  }

  // Sidebar Banner Ad
  if (type === "sidebar") {
    return (
      <div className="bg-gray-800 rounded-2xl overflow-hidden">
        <div className="p-6 text-center text-white">
          {currentData.icon}
          <h3 className="font-bold mb-2 mt-3">{currentData.title}</h3>
          <p className="text-xs text-gray-400 mb-4">{currentData.desc}</p>
          <button className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition w-full">
            {currentData.btnText}
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default AdItem;