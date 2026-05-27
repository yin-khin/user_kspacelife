// export default PostDetailPage;
import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Eye,
  Calendar,
  ChevronLeft,
  Heart,
  Share2,
  Printer,
  ArrowLeft,
  Home,
  Rocket,
  Star,
  Clock,
  BookOpen,
  MessageCircle,
  Tag,
  UserCircle,
  ArrowBigDownDash,
} from "lucide-react";
import { publicAPI } from "../api/userApi";
// import CommentSection from "../components/CommentSection";
import LoadingSpinner from "../components/LoadingSpinner";

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState([]);

  // ✅ Create ref for title section
  const titleRef = useRef(null);

  useEffect(() => {
    fetchPost();
    trackView();
  }, [id]);

  // ✅ Scroll to title when post is loaded
  useEffect(() => {
    if (!loading && post && titleRef.current) {
      setTimeout(() => {
        const navbarHeight = 70; // Height of sticky navbar
        const element = titleRef.current;
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;

        window.scrollTo({
          top: absoluteElementTop - navbarHeight,
          behavior: "smooth",
        });
      }, 200);
    }
  }, [loading, post]);

  const fetchPost = async () => {
    try {
      const res = await publicAPI.getPostById(id);
      // console.log("📦 Raw post content:", res.data.post?.content);
      setPost(res.data.post);
      if (res.data.post?.category_code) {
        const relatedRes = await publicAPI.getPosts(
          1,
          3,
          res.data.post.category_code,
        );
        const filtered =
          relatedRes.data.posts?.filter((p) => p.id !== parseInt(id)) || [];
        setRelatedPosts(filtered.slice(0, 3));
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  const trackView = async () => {
    try {
      await publicAPI.trackView(id);
    } catch {}
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title_kh,
          text: post?.excerpt,
          url: window.location.href,
        });
      } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("បានចម្លង Link រួចរាល់!");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("km-KH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (categoryCode) => {
    const colors = {
      SPACE: "bg-purple-100 text-purple-700",
      SCIENCE: "bg-cyan-100 text-cyan-700",
      TECHNOLOGY: "bg-blue-100 text-blue-700",
      TECH: "bg-blue-100 text-blue-700",
      INTERNATIONAL: "bg-green-100 text-green-700",
      HEALTH: "bg-red-100 text-red-700",
      ENTERTAINMENT: "bg-orange-100 text-orange-700",
      EDUCATION: "bg-indigo-100 text-indigo-700",
    };
    return colors[categoryCode?.toUpperCase()] || "bg-gray-100 text-gray-700";
  };

  const getReadingTime = (content) => {
    if (!content) return "1 នាទី";
    const text = content.replace(/<[^>]*>/g, "");
    const words = text.split(/\s+/).length;
    return `${Math.ceil(words / 200)} នាទី`;
  };

  const prepareContent = (raw) => {
    if (!raw || !raw.trim()) return "<p>មិនមានមាតិកា</p>";
    if (/<(p|br|div|h[1-6]|ul|ol|li|blockquote)/i.test(raw)) return raw;

    const escaped = raw
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const blocks = escaped.split(/\n{2,}/);
    if (blocks.length > 1) {
      return blocks
        .map((b) => (b.trim() ? `<p>${b.replace(/\n/g, "<br>")}</p>` : ""))
        .filter(Boolean)
        .join("");
    }
    if (escaped.includes("\n")) {
      return `<p>${escaped.replace(/\n/g, "<br>")}</p>`;
    }
    return `<p>${escaped}</p>`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-bold text-gray-600 mb-2">
            រកមិនឃើញអត្ថបទ
          </h2>
          <p className="text-gray-400 mb-4">
            អត្ថបទដែលអ្នកកំពុងស្វែងរកមិនមានទេ
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            <Home className="w-4 h-4" /> ត្រឡប់ទៅទំព័រដើម
          </Link>
        </div>
      </div>
    );
  }

  const categoryColorClass = getCategoryColor(post.category_code);
  const formattedContent = prepareContent(post.content);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* CSS for content display */}
      <style>{`
        .post-content {
          font-size: 17px;
          line-height: 1.8;
          color: #374151;
        }
        .post-content p {
          margin-bottom: 1.25rem;
          word-break: break-word;
          overflow-wrap: break-word;
        }
        .post-content p:last-child {
          margin-bottom: 0;
        }
        .post-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 1.5rem 0 1rem;
          color: #1f2937;
        }
        .post-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 1.25rem 0 0.75rem;
          color: #1f2937;
        }
        .post-content ul, .post-content ol {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        .post-content li {
          margin-bottom: 0.5rem;
        }
        .post-content blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1rem;
          margin: 1rem 0;
          color: #4b5563;
          font-style: italic;
        }
        .post-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          margin: 1rem 0;
        }
        .whitespace-pre-wrap {
          white-space: pre-wrap !important;
          word-break: break-word !important;
          overflow-wrap: break-word !important;
        }
      `}</style>

      {/* Simple Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">ត្រឡប់ក្រោយ</span>
            </Link>
            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100 transition"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => window.print()}
                className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100 transition"
              >
                <Printer className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Category Badge */}
          <div className="mb-4">
            <Link
              to={`/category/${post.category_code}`}
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${categoryColorClass}`}
            >
              <Tag className="w-3 h-3" />
              {post.category?.name_kh}
            </Link>
          </div>

          {/* ✅ Title with ref for scrolling */}
          <h1
            ref={titleRef}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight"
          >
            {post.title_kh}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 border-b pb-6 mb-6">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{getReadingTime(post.content)} អាន</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              <span>{post.views} ទស្សនា</span>
            </div>
          </div>
          {/* Post Content */}
          <div className="border rounded-sm text-bold text-amber-700 p-3 mb-3">
            {formattedContent.includes("<p>") ? (
              <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: formattedContent }}
              />
            ) : (
              <div
                className="post-content text-2xl text-yellow-800 whitespace-pre-wrap"
                style={{
                  fontSize: "19px",
                  color: "#b45309",
                  fontWeight: "700",
                  lineHeight: "1.9",
                  fontFamily: "Battambang, sans-serif",
                }}
              >
                <h3>{post.content}</h3>
              </div>
            )}
          </div>
          {/* Featured Image */}
          {post.images?.[0] && (
            <div className="mb-8 rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={`https://api-ksapcelife.onrender.com${post.images[0]}`}
                className="w-full h-auto object-cover"
                alt={post.title_kh}
                loading="lazy"
              />
              {post.image_descriptions?.[0] && (
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    lineHeight: "1.9",
                  }}
                  className="bg-gray-50 py-3 px-4 text-black text-sm border-t"
                >
                  {post.image_descriptions[0]}
                </div>
              )}
            </div>
          )}

          {/* Extra Images - Vertical layout (stacked) */}
          {post.images && post.images.length > 1 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <ArrowBigDownDash className="w-10 h-10 text-yellow-700" />
                បន្ត
              </h3>
              <div className="space-y-4">
                {post.images.slice(1).map((img, index) => (
                  <div
                    key={index}
                    className="rounded-xl overflow-hidden bg-gray-100 shadow-sm"
                  >
                    <img
                      src={`https://api-ksapcelife.onrender.com${img}`}
                      className="w-full h-auto object-cover"
                      alt={`Image ${index + 2}`}
                      loading="lazy"
                    />
                    {post.image_descriptions?.[index + 1] && (
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: "500",
                          lineHeight: "1.9",
                        }}
                        className="bg-gray-50 py-3 px-4 text-black text-sm border-t whitespace-pre-wrap"
                      >
                        {post.image_descriptions[index + 1]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Writer By YIN KHIN */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                <UserCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  ប្រែសម្រួលដោយ៖{" "}
                  <span className="text-blue-600 font-semibold">YIN KHIN</span>
                </p>
                <p className="text-xs text-gray-400">Owner / Blogger</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(post.createdAt)}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">បានចុះផ្សាយ</p>
            </div>
          </div>

          {/* Like Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 px-8 py-3 rounded-full transition-all transform hover:scale-105 ${
                liked
                  ? "bg-red-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500"
              }`}
            >
              <Heart className={`w-5 h-5 ${liked ? "fill-white" : ""}`} />
              <span className="font-medium">
                {liked ? "បានចូលចិត្ត" : "ចូលចិត្ត"}
              </span>
            </button>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                អត្ថបទដែលទាក់ទង
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.id}
                    to={`/post/${rp.id}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="relative h-32 overflow-hidden bg-gray-100">
                      {rp.images?.[0] ? (
                        <img
                          src={`https://api-ksapcelife.onrender.com${rp.images[0]}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          alt={rp.title_kh}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Rocket className="w-8 h-8 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-blue-600 transition">
                        {rp.title_kh}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                        <Eye className="w-3 h-3" />
                        <span>{rp.views || 0}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              មតិយោបល់
            </h3>
            {/* <CommentSection postId={post.id} /> */}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 sm:hidden">
        <div className="flex justify-around py-2">
          <Link
            to="/"
            className="flex flex-col items-center py-2 px-4 text-gray-600 active:text-blue-600 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">ទំព័រដើម</span>
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="flex flex-col items-center py-2 px-4 text-gray-600 active:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-xs mt-1">ត្រឡប់</span>
          </button>
          <button
            onClick={handleShare}
            className="flex flex-col items-center py-2 px-4 text-gray-600 active:text-blue-600 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            <span className="text-xs mt-1">ចែករំលែក</span>
          </button>
          <button
            onClick={() => setLiked(!liked)}
            className={`flex flex-col items-center py-2 px-4 transition-colors ${
              liked ? "text-red-500" : "text-gray-600"
            }`}
          >
            <Heart className={`w-5 h-5 ${liked ? "fill-red-500" : ""}`} />
            <span className="text-xs mt-1">ចូលចិត្ត</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
