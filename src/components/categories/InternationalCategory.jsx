// components/categories/InternationalCategory.jsx
import { Link } from "react-router-dom";
import {
  Eye,
  Calendar,
  ArrowLeft,
  Globe,
  ChevronRight,
  Newspaper,
  TrendingUp,
} from "lucide-react";

const InternationalCategory = ({
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
          <Globe className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            មិនទាន់មានអត្ថបទ
          </h2>
          <p className="text-gray-500">
            សូមរង់ចាំអត្ថបទថ្មីៗពីប្រភេទ {category?.name_kh || "អន្តរជាតិ"}
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

  const featuredPost = posts[0];
  const secondFeatured = posts[1];
  const thirdFeatured = posts[2];
  const otherPosts = posts.slice(3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1920&h=500&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-cyan-900/70"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 rounded-full px-3 py-1 mb-4">
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm">ព័ត៌មានអន្តរជាតិ</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {category?.name_kh || "អន្តរជាតិ"}
            </h1>
            <p className="text-gray-200 max-w-xl">
              ព័ត៌មានអន្តរជាតិ វប្បធម៌ និងទំនាក់ទំនងពិភពលោក
            </p>
            <div className="inline-flex items-center gap-2 mt-4 bg-black/30 rounded-full px-3 py-1">
              <Newspaper className="w-4 h-4" />
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
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" /> ត្រឡប់ទៅទំព័រដើម
        </Link>
      </div>

      {/* Magazine Layout */}
      <div className="container mx-auto px-4 pb-12">
        {/* Featured Post - Large */}
        {featuredPost && (
          <div className="mb-8">
            <Link to={`/post/${featuredPost.id}`} className="group">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
                <div className="h-80 overflow-hidden">
                  <img
                    src={
                      getImageUrl(featuredPost) ||
                      "https://via.placeholder.com/600x400?text=Featured"
                    }
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    alt={featuredPost.title_kh}
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                      ព័ត៌មានក្តៅ
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />{" "}
                      {formatDate(featuredPost.createdAt)}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition">
                    {featuredPost.title_kh}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {featuredPost.excerpt ||
                      featuredPost.content
                        ?.replace(/<[^>]*>/g, "")
                        .substring(0, 200) + "..."}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-blue-600 font-medium">អានបន្ថែម →</div>
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <Eye className="w-3 h-3" /> {featuredPost.views || 0}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Second Row - 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {secondFeatured && (
            <Link to={`/post/${secondFeatured.id}`} className="group">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 h-full">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={
                      getImageUrl(secondFeatured) ||
                      "https://via.placeholder.com/600x400?text=News"
                    }
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    alt={secondFeatured.title_kh}
                  />
                  <div className="absolute top-3 right-3 bg-black/60 rounded-full px-2 py-1 text-xs text-white flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {secondFeatured.views || 0}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(secondFeatured.createdAt)}</span>
                  </div>
                  <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                    {secondFeatured.title_kh}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {secondFeatured.excerpt ||
                      secondFeatured.content
                        ?.replace(/<[^>]*>/g, "")
                        .substring(0, 120) + "..."}
                  </p>
                  <div className="mt-3 text-blue-600 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    អានបន្ថែម <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {thirdFeatured && (
            <Link to={`/post/${thirdFeatured.id}`} className="group">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 h-full">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={
                      getImageUrl(thirdFeatured) ||
                      "https://via.placeholder.com/600x400?text=News"
                    }
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    alt={thirdFeatured.title_kh}
                  />
                  <div className="absolute top-3 right-3 bg-black/60 rounded-full px-2 py-1 text-xs text-white flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {thirdFeatured.views || 0}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(thirdFeatured.createdAt)}</span>
                  </div>
                  <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                    {thirdFeatured.title_kh}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {thirdFeatured.excerpt ||
                      thirdFeatured.content
                        ?.replace(/<[^>]*>/g, "")
                        .substring(0, 120) + "..."}
                  </p>
                  <div className="mt-3 text-blue-600 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    អានបន្ថែម <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>

        {/* Other Posts - Grid */}
        {otherPosts.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gray-600" />
                អត្ថបទផ្សេងទៀត
              </h2>
              <span className="text-sm text-gray-500">
                ទំព័រ {currentPage} នៃ {totalPages}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {otherPosts.map((post) => {
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
                                "https://via.placeholder.com/400x300?text=News+Image";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                            <Globe className="w-8 h-8 text-white/50" />
                          </div>
                        )}
                        <div className="absolute top-2 right-2 bg-black/60 rounded-full px-1.5 py-0.5 text-xs text-white flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {post.views || 0}
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-bold text-sm text-gray-800 mb-1 line-clamp-2 group-hover:text-blue-600 transition">
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
          </>
        )}

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

export default InternationalCategory;
