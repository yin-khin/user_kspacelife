// components/categories/HealthCategory.jsx
import { Link } from "react-router-dom";
import {
  Eye,
  Calendar,
  ArrowLeft,
  Heart,
  ChevronRight,
  Activity,
  Apple,
  Coffee,
  Droplets,
  Sun,
} from "lucide-react";

const HealthCategory = ({
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
          <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            មិនទាន់មានអត្ថបទ
          </h2>
          <p className="text-gray-500">
            សូមរង់ចាំអត្ថបទថ្មីៗពីប្រភេទ {category?.name_kh || "សុខភាព"}
          </p>
          <Link
            to="/"
            className="inline-block mt-6 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            ត្រឡប់ទៅទំព័រដើម
          </Link>
        </div>
      </div>
    );
  }

  // Health tips data
  const healthTips = [
    {
      icon: <Apple className="w-5 h-5" />,
      text: "ញ៉ាំអាហារមានជីវជាតិ",
      color: "text-green-600",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      text: "ហាត់ប្រាណទៀងទាត់",
      color: "text-red-500",
    },
    {
      icon: <Coffee className="w-5 h-5" />,
      text: "សម្រាកគ្រប់គ្រាន់",
      color: "text-amber-600",
    },
    {
      icon: <Droplets className="w-5 h-5" />,
      text: "ផឹកទឹកឲ្យបានច្រើន",
      color: "text-blue-500",
    },
    {
      icon: <Sun className="w-5 h-5" />,
      text: "ហាលថ្ងៃពេលព្រឹក",
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1920&h=500&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-emerald-900/70"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-green-500/20 rounded-full px-3 py-1 mb-4">
              <Heart className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">
                សុខភាពល្អ ជីវិតរីករាយ
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {category?.name_kh || "សុខភាព"}
            </h1>
            <p className="text-gray-200 max-w-xl">
              គន្លឹះថែរក្សាសុខភាព អាហារូបត្ថម្ភ ការធ្វើលំហាត់ប្រាណ
            </p>
            <div className="inline-flex items-center gap-2 mt-4 bg-black/30 rounded-full px-3 py-1">
              <Activity className="w-4 h-4" />
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
          className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition"
        >
          <ArrowLeft className="w-4 h-4" /> ត្រឡប់ទៅទំព័រដើម
        </Link>
      </div>

      {/* 2 Columns Layout with Sidebar */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Posts Grid */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">អត្ថបទសុខភាព</h2>
              <span className="text-sm text-gray-500">
                ទំព័រ {currentPage} នៃ {totalPages}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                "https://via.placeholder.com/400x300?text=Health+Image";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                            <Heart className="w-12 h-12 text-white/50" />
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
                        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-green-600 transition">
                          {post.title_kh}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-2">
                          {post.excerpt ||
                            post.content
                              ?.replace(/<[^>]*>/g, "")
                              .substring(0, 100) + "..."}
                        </p>
                        <div className="mt-3 text-green-600 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          អានបន្ថែម <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
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
                            ? "bg-green-600 text-white"
                            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition"
                >
                  បន្ទាប់ →
                </button>
              </div>
            )}
          </div>

          {/* Sidebar - Health Tips */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Health Tips Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-500" />
                  គន្លឹះសុខភាព
                </h3>
                <div className="space-y-3">
                  {healthTips.map((tip, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className={tip.color}>{tip.icon}</div>
                      <span className="text-sm text-gray-700">{tip.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote Card */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-5 text-white">
                <p className="text-sm italic">
                  "សុខភាពល្អ គឺជាទ្រព្យសម្បត្តិដ៏មានតម្លៃបំផុត"
                </p>
                <p className="text-xs mt-2 opacity-80">- សុភាសិតខ្មែរ -</p>
              </div>

              {/* Stats Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
                <div className="text-3xl font-bold text-green-600">
                  {posts.length}
                </div>
                <p className="text-xs text-gray-500">អត្ថបទសរុប</p>
                <div className="mt-3 pt-3 border-t">
                  <div className="text-lg font-semibold text-gray-700">
                    {totalPages}
                  </div>
                  <p className="text-xs text-gray-500">ទំព័រ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthCategory;
