// components/ads/SidebarAds.jsx
import { useState, useEffect } from "react";
import { 
  Sparkles, TrendingUp, ShoppingBag, Coffee, Camera, 
  Smartphone, Gift, Heart 
} from "lucide-react";
import AdItem from "./AdItem";

// Ads Data
const bannerAds = [
  { bg: "from-blue-500 to-purple-600", icon: <Sparkles className="w-8 h-8" />, title: "ផ្សាយពាណិជ្ជកម្មនៅទីនេះ", desc: "ទំហំ 300x250", btnText: "ទាក់ទងឥឡូវ" },
  { bg: "from-green-500 to-teal-600", icon: <TrendingUp className="w-8 h-8" />, title: "វិនិយោគជាមួយយើង", desc: "ប្រាក់ចំណេញខ្ពស់", btnText: "មើលបន្ថែម" },
  { bg: "from-red-500 to-orange-600", icon: <Gift className="w-8 h-8" />, title: "កម្មវិធីបុណ្យទាន", desc: "ទទួលបានអំណោយ", btnText: "ទទួលបាន" },
  { bg: "from-pink-500 to-rose-600", icon: <Heart className="w-8 h-8" />, title: "ការផ្តល់ជូនពិសេស", desc: "សម្រាប់សមាជិកថ្មី", btnText: "ស្វែងយល់" },
];

const productAds = [
  { bg: "from-orange-500 to-red-500", icon: <ShoppingBag className="w-10 h-10" />, title: "ការផ្តល់ជូនពិសេស", discount: "50%", desc: "សម្រាប់ការទិញដំបូង", btnText: "ទិញឥឡូវ" },
  { bg: "from-blue-500 to-cyan-500", icon: <Smartphone className="w-10 h-10" />, title: "ទូរស័ព្ទថ្មី", discount: "30%", desc: "តម្លៃពិសេស", btnText: "ទិញឥឡូវ" },
  { bg: "from-green-500 to-emerald-500", icon: <Coffee className="w-10 h-10" />, title: "កាហ្វេឆ្ងាញ់", discount: "20%", desc: "បញ្ចុះតម្លៃ", btnText: "ទិញឥឡូវ" },
  { bg: "from-purple-500 to-pink-500", icon: <Camera className="w-10 h-10" />, title: "កាមេរ៉ា", discount: "40%", desc: "ថតរូបស្អាត", btnText: "ទិញឥឡូវ" },
];

const smallGridAds = [
  { id: 1, bg: "from-orange-500 to-red-500", icon: <ShoppingBag className="w-6 h-6" />, title: "កាបូប", desc: "បញ្ចុះតម្លៃ" },
  { id: 2, bg: "from-amber-500 to-yellow-500", icon: <Coffee className="w-6 h-6" />, title: "កាហ្វេ", desc: "ឆ្ងាញ់" },
  { id: 3, bg: "from-pink-500 to-purple-500", icon: <Gift className="w-6 h-6" />, title: "អំណោយ", desc: "ពិសេស" },
  { id: 4, bg: "from-blue-500 to-cyan-500", icon: <Camera className="w-6 h-6" />, title: "កាមេរ៉ា", desc: "ថតរូប" },
  { id: 5, bg: "from-green-500 to-emerald-500", icon: <Smartphone className="w-6 h-6" />, title: "ទូរស័ព្ទ", desc: "ថ្មី" },
  { id: 6, bg: "from-red-500 to-rose-500", icon: <Heart className="w-6 h-6" />, title: "សុខភាព", desc: "ថែទាំ" },
  { id: 7, bg: "from-indigo-500 to-purple-500", icon: <Sparkles className="w-6 h-6" />, title: "សម្រស់", desc: "ថែរក្សា" },
  { id: 8, bg: "from-teal-500 to-cyan-500", icon: <TrendingUp className="w-6 h-6" />, title: "វិនិយោគ", desc: "ចំណេញ" },
];

const googleStyleAds = [
  { icon: <Gift className="w-8 h-8" />, text: "ផ្សាយពាណិជ្ជកម្ម Google Ads", subtext: "ទីតាំងនេះសម្រាប់ជួល" },
  { icon: <ShoppingBag className="w-8 h-8" />, text: "Shopee កម្ពុជា", subtext: "បញ្ចុះតម្លៃធំ" },
  { icon: <Coffee className="w-8 h-8" />, text: "Brown Coffee", subtext: "កាហ្វេឆ្ងាញ់" },
  { icon: <Smartphone className="w-8 h-8" />, text: "Chip Mong", subtext: "ទូរស័ព្ទថ្មី" },
];

const sidebarAd = {
  icon: <TrendingUp className="w-12 h-12 text-green-400" />,
  title: "កន្លែងសម្រាប់ផ្សាយពាណិជ្ជកម្ម",
  desc: "ទំហំ 300x600",
  btnText: "ទំនាក់ទំនង"
};

const SidebarAds = ({ autoRotate = true, interval = 10000 }) => {
  const [randomSmallAds, setRandomSmallAds] = useState([]);

  useEffect(() => {
    // Randomize small grid ads
    const shuffled = [...smallGridAds].sort(() => 0.5 - Math.random());
    setRandomSmallAds(shuffled.slice(0, 4));

    if (autoRotate) {
      const timer = setInterval(() => {
        const newShuffled = [...smallGridAds].sort(() => 0.5 - Math.random());
        setRandomSmallAds(newShuffled.slice(0, 4));
      }, interval);
      return () => clearInterval(timer);
    }
  }, [autoRotate, interval]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="text-xs text-gray-400 uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-full">
          ការផ្សាយពាណិជ្ជកម្ម
        </span>
      </div>

      {/* Banner Ad - Auto Rotate */}
      <AdItem type="banner" data={bannerAds} autoRotate={autoRotate} interval={interval} />

      {/* Product Ad - Auto Rotate */}
      <AdItem type="product" data={productAds} autoRotate={autoRotate} interval={interval} />

      {/* Small Grid Ads - Auto Rotate Random */}
      <div className="grid grid-cols-2 gap-3">
        {randomSmallAds.map((ad, index) => (
          <AdItem key={ad.id} type="small" data={ad} autoRotate={false} />
        ))}
      </div>

      {/* Google Style Ad - Auto Rotate */}
      <AdItem type="google" data={googleStyleAds} autoRotate={autoRotate} interval={interval} />

      {/* Sidebar Banner - Static */}
      <AdItem type="sidebar" data={sidebarAd} autoRotate={false} />
    </div>
  );
};

export default SidebarAds;