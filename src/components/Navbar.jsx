/* eslint-disable react-hooks/immutability */

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  Home,
  Info,
  Phone,
  BookOpen,
  Rocket,
  Globe,
  Heart,
  Sparkles,
  GraduationCap,
  Database,
  Zap,
  ChevronRight,
} from "lucide-react";
import { publicAPI } from "../api/userApi";
import Logo from "../kspacelife.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await publicAPI.getCategories();
      console.log("Categories fetched:", res.data);
      setCategories(res.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery("");
      setIsOpen(false);
      setShowSearch(false);
    }
  };

  const getCategoryIcon = (categoryCode, categoryName) => {
    const name = categoryName?.toLowerCase() || "";
    const code = categoryCode?.toUpperCase() || "";

    if (code === "SPACE" || name.includes("អវកាស"))
      return <Rocket className="w-4 h-4" />;
    if (code === "SCIENCE" || name.includes("វិទ្យាសាស្ត្រ"))
      return <Zap className="w-4 h-4" />;
    if (
      code === "TECHNOLOGY" ||
      code === "TECH" ||
      name.includes("បច្ចេកវិទ្យា")
    )
      return <Globe className="w-4 h-4" />;
    if (code === "INTERNATIONAL" || name.includes("អន្តរជាតិ"))
      return <Database className="w-4 h-4" />;
    if (code === "HEALTH" || name.includes("សុខភាព"))
      return <Heart className="w-4 h-4" />;
    if (code === "ENTERTAINMENT" || name.includes("កម្សាន្ត"))
      return <Sparkles className="w-4 h-4" />;
    if (code === "EDUCATION" || name.includes("មេរៀន"))
      return <GraduationCap className="w-4 h-4" />;
    return <BookOpen className="w-4 h-4" />;
  };

  return (
    <nav className="bg-black text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Row 1: Logo, Name, Search, Mobile Buttons - Centered */}
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo and Name - Left side */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-zinc-50 rounded-full flex items-center justify-center">
              <img
                src={Logo}
                alt="K SPACE LIFE"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
              />
            </div>
            <span className="font-bold text-base sm:text-xl text-white">
              K SPACE LIFE
            </span>
          </Link>

          {/* Desktop Search - Centered */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:block flex-1 max-w-md mx-4"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="ស្វែងរក..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </form>

          {/* Mobile Buttons - Right side */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-lg hover:bg-white/10"
            >
              <Search className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-white/10"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Desktop placeholder for balance - keeps search centered */}
          <div className="hidden lg:block w-[140px]"></div>
        </div>

        {/* Mobile Search Bar */}
        {showSearch && (
          <div className="lg:hidden py-3 border-t border-gray-800">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="ស្វែងរកអត្ថបទ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-800"
                autoFocus
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </form>
          </div>
        )}

        {/* Row 2: Navigation Links and Categories - Centered */}
        <div className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 py-2 border-t border-gray-800 mt-1">
          <Link
            to="/"
            className="flex items-center gap-1 px-3 py-2 text-white hover:text-red-500 hover:bg-white/10 rounded-lg transition whitespace-nowrap"
          >
            <Home className="w-4 h-4" />
            <span>ទំព័រដើម</span>
          </Link>

          {/* Show Categories from API */}
          {loading ? (
            <div className="px-3 py-2 text-gray-400">កំពុងផ្ទុក...</div>
          ) : (
            categories.map((cat) => (
              <Link
                key={cat.code}
                to={`/category/${cat.code}`}
                className="flex items-center gap-1 px-3 py-2 text-white hover:text-red-500 hover:bg-white/10 rounded-lg transition whitespace-nowrap"
              >
                {getCategoryIcon(cat.code, cat.name_kh)}
                <span>{cat.name_kh}</span>
              </Link>
            ))
          )}

          <Link
            to="/about"
            className="flex items-center gap-1 px-3 py-2 text-white hover:text-red-500 hover:bg-white/10 rounded-lg transition whitespace-nowrap"
          >
            <Info className="w-4 h-4" />
            <span>អំពីយើង</span>
          </Link>

          {/* <Link
            to="/contact"
            className="flex items-center gap-1 px-3 py-2 text-white hover:text-red-500 hover:bg-white/10 rounded-lg transition whitespace-nowrap"
          >
            <Phone className="w-4 h-4" />
            <span>ទំនាក់ទំនង</span>
          </Link> */}
        </div>

        {/* Mobile Menu - Bottom Sheet */}
        {isOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                <h3 className="font-bold text-lg">ម៉ឺនុយ</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 space-y-2">
                <Link
                  to="/"
                  className="flex items-center gap-3 py-3 px-3 text-gray-700 hover:bg-blue-50 rounded-xl"
                  onClick={() => setIsOpen(false)}
                >
                  <Home className="w-5 h-5" />{" "}
                  <span className="flex-1">ទំព័រដើម</span>{" "}
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>

                <div className="mt-2">
                  <div className="flex items-center gap-3 py-3 px-3 text-gray-700 font-medium bg-gray-50 rounded-xl">
                    <Database className="w-5 h-5" /> <span>ប្រភេទអត្ថបទ</span>
                  </div>
                  <div className="ml-4 mt-1 space-y-1">
                    {loading ? (
                      <div className="py-2 px-3 text-gray-400">
                        កំពុងផ្ទុក...
                      </div>
                    ) : (
                      categories.map((cat) => (
                        <Link
                          key={cat.code}
                          to={`/category/${cat.code}`}
                          className="flex items-center gap-3 py-2 px-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="text-xl">{cat.icon || "📁"}</span>
                          <span className="flex-1">{cat.name_kh}</span>
                        </Link>
                      ))
                    )}
                  </div>
                </div>

                <Link
                  to="/about"
                  className="flex items-center gap-3 py-3 px-3 text-gray-700 hover:bg-blue-50 rounded-xl"
                  onClick={() => setIsOpen(false)}
                >
                  <Info className="w-5 h-5" />{" "}
                  <span className="flex-1">អំពីយើង</span>{" "}
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>

                <Link
                  to="/contact"
                  className="flex items-center gap-3 py-3 px-3 text-gray-700 hover:bg-blue-50 rounded-xl"
                  onClick={() => setIsOpen(false)}
                >
                  <Phone className="w-5 h-5" />{" "}
                  <span className="flex-1">ទំនាក់ទំនង</span>{" "}
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
