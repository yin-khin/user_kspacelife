// components/categories/EducationCategory.jsx
import { Link } from "react-router-dom";
import {
  Eye,
  Calendar,
  ArrowLeft,
  GraduationCap,
  ChevronRight,
  BookOpen,
  Clock,
} from "lucide-react";

const EducationCategory = ({
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
          <GraduationCap className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            មិនទាន់មានអត្ថបទ
          </h2>
          <p className="text-gray-500">
            សូមរង់ចាំអត្ថបទថ្មីៗពីប្រភេទ {category?.name_kh || "ការអប់រំ"}
          </p>
          <Link
            to="/"
            className="inline-block mt-6 px-5 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
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
            "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&h=500&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 to-amber-900/70"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 rounded-full px-3 py-1 mb-4">
              <GraduationCap className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400 text-sm">
                ចំណេះដឹង និងការអប់រំ
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {category?.name_kh || "ការអប់រំ"}
            </h1>
            <p className="text-gray-200 max-w-xl">
              មេរៀន ចំណេះដឹង និងការអប់រំគ្រប់កម្រិត
            </p>
            <div className="inline-flex items-center gap-2 mt-4 bg-black/30 rounded-full px-3 py-1">
              <BookOpen className="w-4 h-4" />
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
          className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition"
        >
          <ArrowLeft className="w-4 h-4" /> ត្រឡប់ទៅទំព័រដើម
        </Link>
      </div>

      {/* Timeline Layout */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-500" />
            ប្រវត្តិនៃការសិក្សា
          </h2>
          <span className="text-sm text-gray-500">
            ទំព័រ {currentPage} នៃ {totalPages}
          </span>
        </div>

        <div className="relative">
          {/* Timeline Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-orange-200 transform -translate-x-1/2 hidden md:block"></div>

          <div className="space-y-8">
            {posts.map((post, index) => {
              const imageUrl = getImageUrl(post);
              const isEven = index % 2 === 0;

              return (
                <Link
                  to={`/post/${post.id}`}
                  key={post.id}
                  className="group block"
                >
                  <div
                    className={`relative flex flex-col md:flex-row gap-6 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-4 md:left-1/2 top-0 w-4 h-4 bg-orange-500 rounded-full border-4 border-white transform -translate-x-1/2 z-10 hidden md:block"></div>

                    {/* Date Badge */}
                    <div className="md:w-1/2 md:pr-8 md:text-right">
                      <div className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm mb-3">
                        {formatDate(post.createdAt)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:w-1/2 md:pl-8">
                      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                        <div className="relative h-48 overflow-hidden bg-gray-100">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                              alt={post.title_kh}
                              onError={(e) => {
                                e.target.src =
                                  "https://via.placeholder.com/400x300?text=Education+Image";
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                              <GraduationCap className="w-12 h-12 text-white/50" />
                            </div>
                          )}
                          <div className="absolute top-3 right-3 bg-black/60 rounded-full px-2 py-1 text-xs text-white flex items-center gap-1">
                            <Eye className="w-3 h-3" /> {post.views || 0}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition">
                            {post.title_kh}
                          </h3>
                          <p className="text-gray-500 text-sm line-clamp-2">
                            {post.excerpt ||
                              post.content
                                ?.replace(/<[^>]*>/g, "")
                                .substring(0, 100) + "..."}
                          </p>
                          <div className="mt-3 text-orange-600 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                            អានបន្ថែម <ChevronRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
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
                        ? "bg-orange-600 text-white"
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

export default EducationCategory;
