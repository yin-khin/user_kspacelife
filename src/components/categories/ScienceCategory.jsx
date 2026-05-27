// components/categories/ScienceCategory.jsx
import { Link } from "react-router-dom";
import {
  Eye,
  Calendar,
  ArrowLeft,
  FlaskConical,
  ChevronRight,
  Beaker,
  Sparkles,
} from "lucide-react";

const ScienceCategory = ({
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
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-20 text-center">
          <FlaskConical className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            មិនទាន់មានអត្ថបទ
          </h2>
          <p className="text-gray-500">
            សូមរង់ចាំអត្ថបទថ្មីៗពីប្រភេទ {category?.name_kh || "វិទ្យាសាស្ត្រ"}
          </p>
          <Link
            to="/"
            className="inline-block mt-6 px-5 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
          >
            ត្រឡប់ទៅទំព័រដើម
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1920&h=500&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/80 to-teal-900/70"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-cyan-500/20 rounded-full px-3 py-1 mb-4">
              <FlaskConical className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm">
                ស្វែងយល់ពីវិទ្យាសាស្ត្រ
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {category?.name_kh || "វិទ្យាសាស្ត្រ"}
            </h1>
            <p className="text-gray-200 max-w-xl">
              វិទ្យាសាស្ត្រទំនើប ការពិសោធន៍ និងការរកឃើញថ្មីៗ
            </p>
            <div className="inline-flex items-center gap-2 mt-4 bg-black/30 rounded-full px-3 py-1">
              <Beaker className="w-4 h-4" />
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
          className="inline-flex items-center gap-2 text-gray-600 hover:text-cyan-600 transition"
        >
          <ArrowLeft className="w-4 h-4" /> ត្រឡប់ទៅទំព័រដើម
        </Link>
      </div>

      {/* Masonry Layout - Different card heights */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">អត្ថបទស្រាវជ្រាវ</h2>
          <span className="text-sm text-gray-500">
            ទំព័រ {currentPage} នៃ {totalPages}
          </span>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {posts.map((post, index) => {
            const imageUrl = getImageUrl(post);
            const heights = ["h-48", "h-56", "h-64", "h-52", "h-60", "h-48"];
            const heightClass = heights[index % heights.length];

            return (
              <Link
                to={`/post/${post.id}`}
                key={post.id}
                className="group break-inside-avoid"
              >
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 mb-6">
                  <div
                    className={`relative ${heightClass} overflow-hidden bg-gray-100`}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        alt={post.title_kh}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/400x300?text=Science+Image";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center">
                        <FlaskConical className="w-12 h-12 text-white/50" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-black/60 rounded-full px-2 py-1 text-xs text-white flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {post.views || 0}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-cyan-600 transition">
                      {post.title_kh}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {post.excerpt ||
                        post.content
                          ?.replace(/<[^>]*>/g, "")
                          .substring(0, 100) + "..."}
                    </p>
                    <div className="mt-3 text-cyan-600 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      អានបន្ថែម <ChevronRight className="w-3 h-3" />
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
                        ? "bg-cyan-600 text-white"
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

export default ScienceCategory;
