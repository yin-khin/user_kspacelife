// components/categories/EntertainmentCategory.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  Calendar,
  ArrowLeft,
  Film,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Star,
} from "lucide-react";

const EntertainmentCategory = ({
  posts,
  category,
  currentPage,
  totalPages,
  setCurrentPage,
  formatDate,
  getImageUrl,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Get featured posts for carousel (first 3 posts)
  const featuredPosts = posts.slice(0, 3);
  const remainingPosts = posts.slice(3);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length,
    );
  };

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-20 text-center">
          <Film className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            មិនទាន់មានអត្ថបទ
          </h2>
          <p className="text-gray-500">
            សូមរង់ចាំអត្ថបទថ្មីៗពីប្រភេទ {category?.name_kh || "កម្សាន្ត"}
          </p>
          <Link
            to="/"
            className="inline-block mt-6 px-5 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
          >
            ត្រឡប់ទៅទំព័រដើម
          </Link>
        </div>
      </div>
    );
  }

  const currentFeatured = featuredPosts[currentSlide];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1603199506016-b9a594b59c56?w=1920&h=500&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/80 to-rose-900/70"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-pink-500/20 rounded-full px-3 py-1 mb-4">
              <Film className="w-4 h-4 text-pink-400" />
              <span className="text-pink-400 text-sm">
                កម្សាន្ត និងការកំសាន្ត
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {category?.name_kh || "កម្សាន្ត"}
            </h1>
            <p className="text-gray-200 max-w-xl">
              ភាពយន្ត តន្ត្រី ហ្គេម និងវប្បធម៌ប៉ុប
            </p>
            <div className="inline-flex items-center gap-2 mt-4 bg-black/30 rounded-full px-3 py-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-white/80 text-sm">
                {posts.length} អត្ថបទ
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-600 transition"
        >
          <ArrowLeft className="w-4 h-4" /> ត្រឡប់ទៅទំព័រដើម
        </Link>
      </div>

      {/* Featured Carousel */}
      {featuredPosts.length > 0 && (
        <div className="container mx-auto px-4 mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            កំពុងពេញនិយម
          </h2>

          <div className="relative bg-white rounded-2xl overflow-hidden shadow-md">
            <div className="relative h-[400px] overflow-hidden">
              <img
                src={
                  getImageUrl(currentFeatured) ||
                  "https://via.placeholder.com/1200x400?text=Featured"
                }
                className="w-full h-full object-cover"
                alt={currentFeatured.title_kh}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 text-sm mb-2">
                  <span className="bg-pink-500 px-2 py-1 rounded-full text-xs">
                    ពិសេស
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {currentFeatured.views || 0}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  {currentFeatured.title_kh}
                </h3>
                <p className="text-gray-200 line-clamp-2 max-w-2xl">
                  {currentFeatured.excerpt ||
                    currentFeatured.content
                      ?.replace(/<[^>]*>/g, "")
                      .substring(0, 150) + "..."}
                </p>
                <Link
                  to={`/post/${currentFeatured.id}`}
                  className="inline-block mt-3 text-pink-300 hover:text-pink-200 transition"
                >
                  អានបន្ថែម →
                </Link>
              </div>
            </div>

            {/* Carousel Controls */}
            {featuredPosts.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {featuredPosts.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2 h-2 rounded-full transition ${
                        currentSlide === idx ? "bg-pink-500 w-4" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Remaining Posts Grid */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">អត្ថបទផ្សេងទៀត</h2>
          <span className="text-sm text-gray-500">
            ទំព័រ {currentPage} នៃ {totalPages}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {remainingPosts.map((post) => {
            const imageUrl = getImageUrl(post);
            return (
              <Link to={`/post/${post.id}`} key={post.id} className="group">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-40 overflow-hidden bg-gray-100">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        alt={post.title_kh}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/400x300?text=Entertainment+Image";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                        <Film className="w-8 h-8 text-white/50" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-black/60 rounded-full px-1.5 py-0.5 text-xs text-white flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {post.views || 0}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-sm text-gray-800 mb-1 line-clamp-2 group-hover:text-pink-600 transition">
                      {post.title_kh}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition"
            >
              ← មុន
            </button>
            <div className="flex gap-1">
              {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                let pageNum = i + 1;
                if (totalPages > 5 && currentPage > 3) {
                  pageNum = currentPage - 2 + i;
                  if (pageNum > totalPages) return null;
                }
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-lg transition ${
                      currentPage === pageNum
                        ? "bg-pink-600 text-white"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition"
            >
              បន្ទាប់ →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntertainmentCategory;
