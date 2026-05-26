import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";
import Logo from "../kspacelife.png";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-8 sm:mt-16">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Mobile Grid - Stacked */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* About */}
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

          {/* Quick Links */}
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
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition"
                >
                  ទំនាក់ទំនង
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold mb-3">ទំនាក់ទំនង</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <Phone className="w-4 h-4" />
                <span>088 791 4573</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <Mail className="w-4 h-4" />
                <span>kspacelite1999@gmail.com</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <MapPin className="w-4 h-4" />
                <span>ភ្នំពេញ, កម្ពុជា</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold mb-3">តាមដានយើង</h3>
            <div className="flex justify-center sm:justify-start gap-3">
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition active:scale-95"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-sky-500 transition active:scale-95"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition active:scale-95"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition active:scale-95"
              >
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 text-center text-gray-400 text-xs sm:text-sm">
          <p>&copy; 2026 K SPACE LIFE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
