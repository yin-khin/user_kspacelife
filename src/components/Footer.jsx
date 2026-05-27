/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
  Music,
  Rocket,
} from "lucide-react";
import { publicAPI } from "../api/userApi";
import Logo from "../kspacelife.png";

export default function Footer() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await publicAPI.getCategories();
      console.log("Footer - Categories fetched:", res.data);
      setCategories(res.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories for footer:", error);
    } finally {
      setLoading(false);
    }
  };

  // Social Media Links
  const socialLinks = [
    {
      name: "Facebook",
      icon: <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />,
      href: "https://www.facebook.com/profile.php?id=100064191066999",
      bgHover: "hover:bg-blue-600",
      color: "text-blue-400",
    },
    {
      name: "YouTube",
      icon: <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />,
      href: "https://www.youtube.com/@KSpacelifeX",
      bgHover: "hover:bg-red-600",
      color: "text-red-400",
    },
    {
      name: "TikTok",
      icon: <Music className="w-4 h-4 sm:w-5 sm:h-5" />,
      href: "https://www.tiktok.com/@kspacelife",
      bgHover: "hover:bg-black",
      color: "text-gray-300",
    },
    {
      name: "Telegram",
      icon: <Send className="w-4 h-4 sm:w-5 sm:h-5" />,
      href: "https://t.me/QVI2zELXTUFjYzQ1",
      bgHover: "hover:bg-sky-500",
      color: "text-sky-400",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white mt-8 sm:mt-16">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Grid Layout */}
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* About Section */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-zinc-50 rounded-full flex items-center justify-center">
                <img
                  src={Logo}
                  alt="K SPACE LIFE"
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold">K SPACE LIFE</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              វេទិកាចែករំលែកចំណេះដឹង និងព័ត៌មានទាន់សម័យ
            </p>
          </div>

          {/* Quick Links + Categories */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold mb-3">តំណភ្ជាប់</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition"
                >
                  ទំព័រដើម
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition"
                >
                  អំពីយើង
                </Link>
              </li>
            </ul>

            {/* Categories Section */}
            <h3 className="text-base sm:text-lg font-bold mt-4 mb-3">ប្រភេទ</h3>
            {loading ? (
              <p className="text-gray-500 text-sm">កំពុងផ្ទុក...</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {categories.slice(0, 6).map((cat) => (
                  <li key={cat.code}>
                    <Link
                      to={`/category/${cat.code}`}
                      className="text-gray-400 hover:text-white transition"
                    >
                      {cat.name_kh}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Contact Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold mb-3">ទំនាក់ទំនង</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>088 791 4573</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="break-all">kspacelite1999@gmail.com</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>ភ្នំពេញ, កម្ពុជា</span>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold mb-3">តាមដានយើង</h3>
            <p className="text-gray-400 text-xs mb-3">តាមដានយើងតាមរយៈ</p>

            {/* Social Icons */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center ${social.bgHover} transition active:scale-95 group`}
                  aria-label={social.name}
                >
                  <span className={social.color}>{social.icon}</span>
                </a>
              ))}
            </div>

            {/* Text Links */}
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-xs text-gray-500">
                <a
                  href="https://t.me/QVI2zELXTUFjYzQ1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-sky-400 transition"
                >
                  <Send className="w-3 h-3" /> Telegram
                </a>
                <a
                  href="https://www.tiktok.com/@kspacelife"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-gray-300 transition"
                >
                  <Music className="w-3 h-3" /> TikTok
                </a>
                <a
                  href="https://www.youtube.com/@KSpacelifeX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-red-400 transition"
                >
                  <Youtube className="w-3 h-3" /> YouTube
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100064191066999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-blue-400 transition"
                >
                  <Facebook className="w-3 h-3" /> Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-xs sm:text-sm">
          <p>
            &copy; {new Date().getFullYear()} K SPACE LIFE. All rights reserved.
          </p>
          <p className="mt-1 text-gray-600 text-xs">
            Designed with <Rocket className="w-3 h-3 inline text-white" /> for
            knowledge sharing
          </p>
        </div>
      </div>
    </footer>
  );
}
