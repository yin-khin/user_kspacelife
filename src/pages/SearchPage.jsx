import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Eye, Calendar, Search as SearchIcon, FileQuestion } from "lucide-react";
import { publicAPI } from "../api/userApi";
import LoadingSpinner from "../components/LoadingSpinner";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (query) {
      performSearch();
    }
  }, [query, currentPage]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const res = await publicAPI.searchPosts(query, currentPage);
      setPosts(res.data.posts || []);
      setTotalPages(res.data.totalPages || 1);
      setTotalResults(res.data.totalResults || 0);
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <SearchIcon className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-800">លទ្ធផលស្វែងរក</h1>
        </div>
        <p className="text-gray-500">
          រកឃើញ {totalResults} លទ្ធផលសម្រាប់ការស្វែងរក "{query}"
        </p>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : posts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl">
          <FileQuestion className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">មិនឃើញមានអត្ថបទដែលអ្នកស្វែងរកទេ</p>
          <Link to="/" className="text-blue-600 mt-4 inline-block">ត្រឡប់ទៅទំព័រដើម</Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {posts.map((post) => (
              <Link to={`/post/${post.id}`} key={post.id} className="block group">
                <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition">
                  <div className="flex gap-4">
                    {post.images?.[0] && (
                      <img
                        src={`http://localhost:3000${post.images[0]}`}
                        className="w-32 h-24 object-cover rounded-lg"
                        alt={post.title_kh}
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <span className="text-blue-600">{post.category?.name_kh}</span>
                        <span>•</span>
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(post.createdAt).toLocaleDateString("km-KH")}</span>
                        <Eye className="w-3 h-3 ml-2" />
                        <span>{post.views}</span>
                      </div>
                      <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition">
                        {post.title_kh}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {post.excerpt || post.content?.substring(0, 100) + "..."}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 transition"
              >
                ← មុន
              </button>
              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg transition ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 transition"
              >
                បន្ទាប់ →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}