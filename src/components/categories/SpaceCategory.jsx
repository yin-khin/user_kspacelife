// components/categories/SpaceCategory.jsx
import { Link } from "react-router-dom";
import {
  Eye,
  Calendar,
  ArrowLeft,
  Rocket,
  ChevronRight,
  Star,
  Sparkles,
} from "lucide-react";

const SpaceCategory = ({
  posts,
  category,
  currentPage,
  totalPages,
  setCurrentPage,
  formatDate,
  getImageUrl,
}) => {
  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="container mx-auto px-4 py-20 text-center">
          <Rocket className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-400 mb-2">
            មិនទាន់មានអត្ថបទ
          </h2>
          <p className="text-gray-500">
            សូមរង់ចាំអត្ថបទថ្មីៗពីប្រភេទ {category?.name_kh || "អវកាស"}
          </p>
          <Link
            to="/"
            className="inline-block mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            ត្រឡប់ទៅទំព័រដើម
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=500&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 rounded-full px-3 py-1 mb-4">
              <Rocket className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm">
                ដំណើរកម្សាន្តទៅកាន់លំហអវកាស
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {category?.name_kh || "អវកាស"}
            </h1>
            <p className="text-gray-300 max-w-xl">
              ស្វែងយល់ពីអាថ៌កំបាំងនៃសកលលោក ភពផ្សេងៗ និងការរុករកអវកាស
            </p>
            <div className="inline-flex items-center gap-2 mt-4 bg-gray-800/50 rounded-full px-3 py-1">
             
              <span className="text-gray-300 text-sm">
                {posts.length} អត្ថបទ
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition"
        >
          <ArrowLeft className="w-4 h-4" /> ត្រឡប់ទៅទំព័រដើម
        </Link>
      </div>

      {/* Futuristic Grid with Glow Effect */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            ស្វែងយល់ទៅកាន់ទីអវកាស
          </h2>
          <span className="text-sm text-gray-500">
            ទំព័រ {currentPage} នៃ {totalPages}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => {
            const imageUrl = getImageUrl(post);
            return (
              <Link to={`/post/${post.id}`} key={post.id} className="group">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-52 overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        alt={post.title_kh}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/400x300?text=Space+Image";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                        <Rocket className="w-12 h-12 text-white/50 animate-pulse" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-black/70 rounded-full px-2 py-1 text-xs text-white flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {post.views || 0}
                    </div>
                    {index === 0 && (
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          អត្ថបទពិសេស
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <Calendar className="w-3 h-3" />
                      <span className="text-gray-400">
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                    <h3 className="font-bold text-xl text-white mb-2 line-clamp-2 group-hover:text-purple-400 transition">
                      {post.title_kh}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                      {post.excerpt ||
                        post.content
                          ?.replace(/<[^>]*>/g, "")
                          .substring(0, 100) + "..."}
                    </p>
                    <div className="text-purple-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      អានបន្ថែម <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-700 disabled:opacity-50 transition"
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
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700"
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
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-700 disabled:opacity-50 transition"
            >
              បន្ទាប់ →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpaceCategory;
