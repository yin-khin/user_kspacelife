// components/categories/DefaultCategory.jsx
import { Link } from "react-router-dom";
import {
  Eye,
  Calendar,
  ArrowLeft,
  FolderOpen,
  ChevronRight,
} from "lucide-react";

const DefaultCategory = ({
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
          <FolderOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            មិនទាន់មានអត្ថបទ
          </h2>
          <p className="text-gray-500">
            សូមរង់ចាំអត្ថបទថ្មីៗពីប្រភេទ {category?.name_kh}
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <FolderOpen className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              {category?.name_kh}
            </h1>
            <p className="text-gray-200 max-w-2xl mx-auto">
              {category?.description || "ស្វែងរកអត្ថបទក្នុងប្រភេទនេះ"}
            </p>
            <div className="inline-flex items-center gap-2 mt-4 bg-white/20 rounded-full px-3 py-1">
              <FolderOpen className="w-4 h-4" />
              <span className="text-sm">{posts.length} អត្ថបទ</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" /> ត្រឡប់ទៅទំព័រដើម
        </Link>
      </div>

      {/* Simple Grid Layout */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">អត្ថបទទាំងអស់</h2>
          <span className="text-sm text-gray-500">
            ទំព័រ {currentPage} នៃ {totalPages}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const imageUrl = getImageUrl(post);
            return (
              <Link to={`/post/${post.id}`} key={post.id} className="group">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        alt={post.title_kh}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/400x300?text=No+Image";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <FolderOpen className="w-12 h-12 text-gray-400" />
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
                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                      {post.title_kh}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                      {post.excerpt ||
                        post.content
                          ?.replace(/<[^>]*>/g, "")
                          .substring(0, 100) + "..."}
                    </p>
                    <div className="text-blue-600 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
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
                        ? "bg-blue-600 text-white"
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

export default DefaultCategory;
