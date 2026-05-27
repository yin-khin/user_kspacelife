import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  Calendar,
  Tag,
  ChevronRight,
  TrendingUp,
  Clock,
  Sparkles,
  Image as ImageIcon,
  Rocket,
  Globe,
  Heart,
  GraduationCap,
  Sparkles as SparklesIcon,
  Database,
  Zap,
} from "lucide-react";
import { publicAPI } from "../api/userApi";
import LoadingSpinner from "../components/LoadingSpinner";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState("latest");

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
      return <SparklesIcon className="w-4 h-4" />;
    if (code === "EDUCATION" || name.includes("មេរៀន"))
      return <GraduationCap className="w-4 h-4" />;
    return <Tag className="w-4 h-4" />;
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [postsRes, categoriesRes] = await Promise.all([
        publicAPI.getPosts(currentPage, 6),
        publicAPI.getCategories(),
      ]);

      const postsData = postsRes.data.posts || [];
      const categoriesData = categoriesRes.data.categories || [];

      setPosts(postsData);
      setTotalPages(postsRes.data.totalPages || 1);
      setCategories(categoriesData);

      const sortedByDate = [...postsData].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      setRecentPosts(sortedByDate.slice(0, 5));

      const sortedByViews = [...postsData].sort(
        (a, b) => (b.views || 0) - (a.views || 0),
      );
      setPopularPosts(sortedByViews.slice(0, 5));
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("មិនអាចទាញទិន្នន័យបានទេ។ សូមពិនិត្យការតភ្ជាប់បណ្តាញ។");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("km-KH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getFirstImageUrl = (post) => {
    if (!post) return null;
    if (post.images && Array.isArray(post.images) && post.images.length > 0) {
      const firstImage = post.images[0];
      if (typeof firstImage === "string") {
        return `https://api-ksapcelife.onrender.com${firstImage}`;
      }
      if (firstImage.url) {
        return `https://api-ksapcelife.onrender.com${firstImage.url}`;
      }
    }
    if (post.featured_image) {
      return `https://api-ksapcelife.onrender.com${post.featured_image}`;
    }
    if (post.image) {
      return `https://api-ksapcelife.onrender.com${post.image}`;
    }
    return null;
  };

  const ImagePlaceholder = ({ message = "គ្មានរូបភាព" }) => {
    return (
      <div className="relative w-full h-full overflow-hidden bg-gray-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-gray-400" />
        </div>
        {message && (
          <p className="absolute bottom-2 left-0 right-0 text-center text-gray-400 text-xs">
            {message}
          </p>
        )}
      </div>
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => fetchData()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            ព្យាយាមម្តងទៀត
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Image - Like Category Pages */}
      <div
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&h=500&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/70"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 rounded-full px-3 py-1 mb-4">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm">K SPACE LIFE</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
              ស្វែងរកចំណេះដឹង
            </h1>
            <p className="text-gray-200 max-w-xl mx-auto">
              ស្វែងរកអត្ថបទ ព័ត៌មាន និងចំណេះដឹងថ្មីៗពីគ្រប់វិស័យ
            </p>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              ចាប់ផ្ដើមអាន <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Mobile Tab Navigation */}
        <div className="flex gap-2 mb-6 sm:hidden bg-white rounded-xl p-1 shadow-sm">
          <button
            onClick={() => setActiveTab("latest")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "latest"
                ? "bg-blue-600 text-white"
                : "text-gray-600"
            }`}
          >
            ថ្មីៗ
          </button>
          <button
            onClick={() => setActiveTab("popular")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "popular"
                ? "bg-blue-600 text-white"
                : "text-gray-600"
            }`}
          >
            ពេញនិយម
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "categories"
                ? "bg-blue-600 text-white"
                : "text-gray-600"
            }`}
          >
            ប្រភេទ
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Posts Grid */}
          <div className="lg:col-span-2">
            <div className="hidden sm:flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">អត្ថបទថ្មីៗ</h2>
              <Link
                to="/search"
                className="text-blue-600 text-sm hover:text-blue-700 font-medium"
              >
                មើលទាំងអស់ →
              </Link>
            </div>

            <div className="sm:hidden mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                {activeTab === "latest" && "អត្ថបទថ្មីៗ"}
                {activeTab === "popular" && "កំពុងពេញនិយម"}
                {activeTab === "categories" && "ប្រភេទអត្ថបទ"}
              </h2>
            </div>

            {/* Latest Posts */}
            {(activeTab === "latest" || window.innerWidth >= 640) && (
              <div
                className={
                  activeTab === "categories" && window.innerWidth < 640
                    ? "hidden"
                    : ""
                }
              >
                {posts.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                    <p className="text-gray-400">មិនទាន់មានអត្ថបទនៅឡើយទេ</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {posts.map((post) => {
                      const imageUrl = getFirstImageUrl(post);
                      return (
                        <Link
                          to={`/post/${post.id}`}
                          key={post.id}
                          className="group"
                        >
                          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
                            <div className="relative h-48 overflow-hidden bg-gray-100">
                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                  alt={post.title_kh}
                                  onError={(e) => {
                                    e.target.style.display = "none";
                                  }}
                                />
                              ) : (
                                <ImagePlaceholder message="គ្មានរូបភាព" />
                              )}
                              <div className="absolute top-3 right-3 bg-black/60 rounded-full px-2 py-1 text-xs text-white flex items-center gap-1">
                                <Eye className="w-3 h-3" /> {post.views || 0}
                              </div>
                            </div>
                            <div className="p-4">
                              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                <span className="text-blue-600">
                                  {post.category?.name_kh || "គ្មានប្រភេទ"}
                                </span>
                                <span>•</span>
                                <Calendar className="w-3 h-3" />
                                <span>{formatDate(post.createdAt)}</span>
                              </div>
                              <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                                {post.title_kh}
                              </h3>
                              <p className="text-gray-500 text-sm line-clamp-2">
                                {post.excerpt ||
                                  (post.content
                                    ? post.content
                                        .replace(/<[^>]*>/g, "")
                                        .substring(0, 100) + "..."
                                    : "គ្មានមាតិកា")}
                              </p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm disabled:opacity-50 hover:bg-gray-50 transition"
                    >
                      ← ថយក្រោយ
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
                            className={`w-10 h-10 rounded-lg text-sm transition ${
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
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm disabled:opacity-50 hover:bg-gray-50 transition"
                    >
                      បន្ទាប់ →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Popular Posts Tab for Mobile */}
            {activeTab === "popular" && (
              <div>
                <div className="space-y-3">
                  {popularPosts.map((post, index) => (
                    <Link
                      to={`/post/${post.id}`}
                      key={post.id}
                      className="block"
                    >
                      <div className="bg-white rounded-xl p-3 flex gap-3 border border-gray-200 hover:shadow-sm transition">
                        <div className="w-8 h-8 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600">
                            {post.title_kh}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                            <Eye className="w-3 h-3" />
                            <span>{post.views || 0} views</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                  {popularPosts.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <p>មិនទាន់មានអត្ថបទនៅឡើយទេ</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Categories Tab for Mobile */}
            {activeTab === "categories" && (
              <div>
                <div className="grid grid-cols-1 gap-3">
                  {categories.map((cat) => (
                    <Link
                      key={cat.code}
                      to={`/category/${cat.code}`}
                      className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl hover:shadow-sm transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                          {getCategoryIcon(cat.code, cat.name_kh)}
                        </div>
                        <span className="font-medium text-gray-800">
                          {cat.name_kh}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Desktop Only */}
          <div className="hidden lg:block space-y-6">
            {/* Categories Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Rocket className="w-4 h-4 text-blue-600" />
                ស្វែងយល់តាមប្រភេទ
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.code}
                    to={`/category/${cat.code}`}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">
                        {getCategoryIcon(cat.code, cat.name_kh)}
                      </span>
                      <span className="text-gray-700 group-hover:text-blue-600 transition">
                        {cat.name_kh}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular Posts */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange-500" />
                កំពុងពេញនិយម
              </h3>
              <div className="space-y-3">
                {popularPosts.map((post, index) => (
                  <Link
                    to={`/post/${post.id}`}
                    key={post.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition group"
                  >
                    <div className="w-6 h-6 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 transition">
                        {post.title_kh}
                      </h4>
                      <div className="text-xs text-gray-400 mt-1">
                        {post.views || 0} views
                      </div>
                    </div>
                  </Link>
                ))}
                {popularPosts.length === 0 && (
                  <p className="text-gray-400 text-sm text-center py-4">
                    មិនទាន់មានទិន្នន័យ
                  </p>
                )}
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                អត្ថបទថ្មីៗ
              </h3>
              <div className="space-y-3">
                {recentPosts.map((post) => {
                  const imageUrl = getFirstImageUrl(post);
                  return (
                    <Link
                      to={`/post/${post.id}`}
                      key={post.id}
                      className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition group"
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          className="w-12 h-12 object-cover rounded-lg"
                          alt={post.title_kh}
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 transition">
                          {post.title_kh}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatDate(post.createdAt)}
                        </p>
                      </div>
                    </Link>
                  );
                })}
                {recentPosts.length === 0 && (
                  <p className="text-gray-400 text-sm text-center py-4">
                    មិនទាន់មានទិន្នន័យ
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
