// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import {
//   Eye,
//   Calendar,
//   Tag,
//   FolderTree,
//   ArrowLeft,
//   Rocket,
//   ChevronRight,
//   Clock,
//   TrendingUp,
// } from "lucide-react";
// import { publicAPI } from "../api/userApi";
// import LoadingSpinner from "../components/LoadingSpinner";

// export default function CategoryPageNASA() {
//   const { code } = useParams();
//   const [posts, setPosts] = useState([]);
//   const [category, setCategory] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [featuredPost, setFeaturedPost] = useState(null);

//   useEffect(() => {
//     if (code) {
//       console.log("🔍 Category code from URL:", code);
//       fetchCategoryPosts();
//     }
//   }, [code, currentPage]);

//   const fetchCategoryPosts = async () => {
//     setLoading(true);
//     try {
//       console.log(`📤 Fetching posts for category: ${code}`);
//       const res = await publicAPI.getPosts(currentPage, 12, code);
//       console.log("📥 Response:", res.data);

//       const postsData = res.data.posts || [];
//       setPosts(postsData);
//       setTotalPages(res.data.totalPages || 1);

//       // Set featured post (first post on first page)
//       if (currentPage === 1 && postsData.length > 0) {
//         setFeaturedPost(postsData[0]);
//       } else {
//         setFeaturedPost(null);
//       }

//       // Get category info
//       if (postsData.length > 0) {
//         setCategory(postsData[0].category);
//       } else {
//         const categoriesRes = await publicAPI.getCategories();
//         const foundCategory = categoriesRes.data.categories.find(
//           (c) => c.code === code,
//         );
//         setCategory(foundCategory || { code: code, name_kh: code });
//       }
//     } catch (error) {
//       console.error("Error fetching category posts:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("km-KH", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   // NASA Style Category Configuration
//   const getCategoryConfig = (categoryCode) => {
//     const configs = {
//       SPACE: {
//         icon: <Rocket className="w-8 h-8 sm:w-10 sm:h-10" />,
//         bgGradient: "from-purple-900 via-blue-900 to-black",
//         accentColor: "purple",
//         heroImage:
//           "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=400&fit=crop",
//         description: "ស្វែងយល់ពីអាថ៌កំបាំងនៃសកលលោក ភពផ្សេងៗ និងការរុករកអវកាស",
//       },
//       SCIENCE: {
//         icon: "🔬",
//         bgGradient: "from-cyan-900 via-blue-900 to-indigo-900",
//         accentColor: "cyan",
//         heroImage:
//           "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1920&h=400&fit=crop",
//         description: "វិទ្យាសាស្ត្រទំនើប ការពិសោធន៍ និងការរកឃើញថ្មីៗ",
//       },
//       TECHNOLOGY: {
//         icon: "💻",
//         bgGradient: "from-blue-900 via-indigo-900 to-purple-900",
//         accentColor: "blue",
//         heroImage:
//           "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=400&fit=crop",
//         description: "បច្ចេកវិទ្យាទំនើប AI, Robotics និង Innovation",
//       },
//       TECH: {
//         icon: "💻",
//         bgGradient: "from-blue-900 via-indigo-900 to-purple-900",
//         accentColor: "blue",
//         heroImage:
//           "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=400&fit=crop",
//         description: "បច្ចេកវិទ្យាទំនើប AI, Robotics និង Innovation",
//       },
//       INTERNATIONAL: {
//         icon: "🌍",
//         bgGradient: "from-green-900 via-teal-900 to-cyan-900",
//         accentColor: "green",
//         heroImage:
//           "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1920&h=400&fit=crop",
//         description: "ព័ត៌មានអន្តរជាតិ វប្បធម៌ និងទំនាក់ទំនងពិភពលោក",
//       },
//       HEALTH: {
//         icon: "❤️",
//         bgGradient: "from-red-900 via-rose-900 to-pink-900",
//         accentColor: "red",
//         heroImage:
//           "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1920&h=400&fit=crop",
//         description: "សុខភាព អាហារូបត្ថម្ភ និងការថែទាំរាងកាយ",
//       },
//       ENTERTAINMENT: {
//         icon: "🎬",
//         bgGradient: "from-orange-900 via-amber-900 to-yellow-900",
//         accentColor: "orange",
//         heroImage:
//           "https://images.unsplash.com/photo-1603199506016-b9a594b59c56?w=1920&h=400&fit=crop",
//         description: "កម្សាន្ត ភាពយន្ត តន្ត្រី និងវប្បធម៌ប៉ុប",
//       },
//       EDUCATION: {
//         icon: "📚",
//         bgGradient: "from-indigo-900 via-purple-900 to-pink-900",
//         accentColor: "indigo",
//         heroImage:
//           "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&h=400&fit=crop",
//         description: "មេរៀន ចំណេះដឹង និងការអប់រំគ្រប់កម្រិត",
//       },
//     };

//     return (
//       configs[categoryCode?.toUpperCase()] || {
//         icon: "📁",
//         bgGradient: "from-gray-900 to-gray-800",
//         accentColor: "gray",
//         heroImage:
//           "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&h=400&fit=crop",
//         description: "ស្វែងរកអត្ថបទក្នុងប្រភេទនេះ",
//       }
//     );
//   };

//   const categoryConfig = getCategoryConfig(code);
//   const accentColorClass =
//     {
//       purple: "from-purple-500 to-pink-500",
//       cyan: "from-cyan-500 to-blue-500",
//       blue: "from-blue-500 to-indigo-500",
//       green: "from-green-500 to-teal-500",
//       red: "from-red-500 to-rose-500",
//       orange: "from-orange-500 to-amber-500",
//       indigo: "from-indigo-500 to-purple-500",
//       gray: "from-gray-500 to-gray-600",
//     }[categoryConfig.accentColor] || "from-blue-500 to-purple-500";

//   const getFirstImageUrl = (post) => {
//     if (!post) return null;
//     if (post.images && Array.isArray(post.images) && post.images.length > 0) {
//       const firstImage = post.images[0];
//       if (typeof firstImage === "string")
//         return `http://127.0.0.1:3000${firstImage}`;
//       if (firstImage.url) return `http://127.0.0.1:3000${firstImage.url}`;
//     }
//     if (post.featured_image)
//       return `http://127.0.0.1:3000${post.featured_image}`;
//     if (post.image) return `http://127.0.0.1:3000${post.image}`;
//     return null;
//   };

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* NASA Style Hero Section */}
//       <div
//         className="relative bg-black text-white overflow-hidden"
//         style={{
//           backgroundImage: `url(${categoryConfig.heroImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div
//           className={`absolute inset-0 bg-gradient-to-r ${categoryConfig.bgGradient} opacity-85`}
//         ></div>
//         <div className="absolute inset-0 bg-black opacity-40"></div>

//         <div className="container mx-auto px-4 py-16 sm:py-20 md:py-24 relative z-10">
//           <div className="max-w-4xl">
//             {/* Back Button */}
//             <Link
//               to="/"
//               className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full"
//             >
//               <ArrowLeft className="w-4 h-4" /> ត្រឡប់ទៅទំព័រដើម
//             </Link>

//             <div className="flex items-center gap-3 mb-4">
//               <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
//                 <span className="text-3xl sm:text-4xl">
//                   {categoryConfig.icon}
//                 </span>
//               </div>
//               <div className="flex-1">
//                 <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 mb-3">
//                   <Rocket className="w-3 h-3" />
//                   <span className="text-xs">ប្រភេទអត្ថបទ</span>
//                 </div>
//                 <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
//                   {category?.name_kh || code}
//                 </h1>
//               </div>
//             </div>
//             <p className="text-white/90 text-base sm:text-lg max-w-2xl">
//               {categoryConfig.description}
//             </p>

//             {/* Stats */}
//             <div className="flex gap-6 mt-6">
//               <div className="flex items-center gap-2 text-white/80">
//                 <FolderTree className="w-4 h-4" />
//                 <span className="text-sm">{posts.length} អត្ថបទ</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom wave effect */}
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 1440 120"
//             className="w-full h-12"
//           >
//             <path
//               fill="#f9fafb"
//               fillOpacity="1"
//               d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
//             ></path>
//           </svg>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-12">
//         {/* Featured Post - NASA Style */}
//         {featuredPost && currentPage === 1 && (
//           <div className="mb-12">
//             <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
//               <div className="grid grid-cols-1 lg:grid-cols-2">
//                 <div className="relative h-64 lg:h-full min-h-[300px] overflow-hidden">
//                   {getFirstImageUrl(featuredPost) ? (
//                     <img
//                       src={getFirstImageUrl(featuredPost)}
//                       className="w-full h-full object-cover hover:scale-105 transition duration-500"
//                       alt={featuredPost.title_kh}
//                     />
//                   ) : (
//                     <div
//                       className={`w-full h-full bg-gradient-to-br ${accentColorClass} flex items-center justify-center`}
//                     >
//                       <span className="text-6xl">{categoryConfig.icon}</span>
//                     </div>
//                   )}
//                   <div className="absolute top-4 left-4">
//                     <span
//                       className={`bg-gradient-to-r ${accentColorClass} text-white text-xs px-3 py-1 rounded-full`}
//                     >
//                       អត្ថបទពិសេស
//                     </span>
//                   </div>
//                 </div>
//                 <div className="p-6 sm:p-8 flex flex-col justify-center">
//                   <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
//                     <span
//                       className={`text-${categoryConfig.accentColor}-600 font-medium`}
//                     >
//                       {featuredPost.category?.name_kh || code}
//                     </span>
//                     <span>•</span>
//                     <Calendar className="w-3 h-3" />
//                     <span>{formatDate(featuredPost.createdAt)}</span>
//                     <span>•</span>
//                     <Eye className="w-3 h-3" />
//                     <span>{featuredPost.views || 0} views</span>
//                   </div>
//                   <h2 className="text-2xl sm:text-3xl font-bold mb-3 hover:text-blue-600 transition">
//                     <Link to={`/post/${featuredPost.id}`}>
//                       {featuredPost.title_kh}
//                     </Link>
//                   </h2>
//                   <p className="text-gray-600 mb-4 line-clamp-3">
//                     {featuredPost.excerpt ||
//                       (featuredPost.content
//                         ? featuredPost.content
//                             .replace(/<[^>]*>/g, "")
//                             .substring(0, 150) + "..."
//                         : "គ្មានមាតិកា")}
//                   </p>
//                   <Link
//                     to={`/post/${featuredPost.id}`}
//                     className={`inline-flex items-center gap-2 text-${categoryConfig.accentColor}-600 font-medium hover:gap-3 transition-all`}
//                   >
//                     អានបន្ថែម <ChevronRight className="w-4 h-4" />
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Posts Grid - NASA Cards Style */}
//         {posts.length === 0 ? (
//           <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
//             <FolderTree className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//             <p className="text-gray-500 text-lg">
//               មិនទាន់មានអត្ថបទក្នុងប្រភេទនេះទេ
//             </p>
//             <Link
//               to="/"
//               className="inline-block mt-4 text-blue-600 hover:text-blue-700 transition"
//             >
//               ត្រឡប់ទៅទំព័រដើម
//             </Link>
//           </div>
//         ) : (
//           <>
//             {/* Section Title */}
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
//                 <span
//                   className={`w-1 h-6 bg-gradient-to-b ${accentColorClass} rounded-full`}
//                 ></span>
//                 អត្ថបទទាំងអស់
//               </h2>
//               <span className="text-sm text-gray-500">
//                 ទំព័រ {currentPage} នៃ {totalPages}
//               </span>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {(currentPage === 1 ? posts.slice(1) : posts).map(
//                 (post, index) => {
//                   const imageUrl = getFirstImageUrl(post);
//                   return (
//                     <Link
//                       to={`/post/${post.id}`}
//                       key={post.id}
//                       className="group"
//                     >
//                       <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
//                         <div className="relative h-48 overflow-hidden">
//                           {imageUrl ? (
//                             <img
//                               src={imageUrl}
//                               className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
//                               alt={post.title_kh}
//                               onError={(e) => {
//                                 e.target.src =
//                                   "https://via.placeholder.com/400x300?text=No+Image";
//                               }}
//                             />
//                           ) : (
//                             <div
//                               className={`w-full h-full bg-gradient-to-br ${accentColorClass} flex items-center justify-center`}
//                             >
//                               <span className="text-4xl">
//                                 {categoryConfig.icon}
//                               </span>
//                             </div>
//                           )}
//                           <div className="absolute top-3 right-3 bg-black/60 backdrop-blur rounded-full px-2 py-1 text-xs text-white flex items-center gap-1">
//                             <Eye className="w-3 h-3" />
//                             {post.views || 0}
//                           </div>
//                           {index === 0 && currentPage === 1 && (
//                             <div className="absolute bottom-3 left-3">
//                               <span
//                                 className={`bg-gradient-to-r ${accentColorClass} text-white text-xs px-2 py-1 rounded-full`}
//                               >
//                                 ថ្មី
//                               </span>
//                             </div>
//                           )}
//                         </div>
//                         <div className="p-4 flex-1 flex flex-col">
//                           <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
//                             <span
//                               className={`text-${categoryConfig.accentColor}-600 font-medium`}
//                             >
//                               {post.category?.name_kh || code}
//                             </span>
//                             <span>•</span>
//                             <Calendar className="w-3 h-3" />
//                             <span>{formatDate(post.createdAt)}</span>
//                           </div>
//                           <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition">
//                             {post.title_kh}
//                           </h3>
//                           <p className="text-gray-600 text-sm line-clamp-2 mb-3 flex-1">
//                             {post.excerpt ||
//                               (post.content
//                                 ? post.content
//                                     .replace(/<[^>]*>/g, "")
//                                     .substring(0, 100) + "..."
//                                 : "គ្មានមាតិកា")}
//                           </p>
//                           <div
//                             className={`inline-flex items-center gap-1 text-${categoryConfig.accentColor}-600 text-sm font-medium group-hover:gap-2 transition-all`}
//                           >
//                             អានបន្ថែម <ChevronRight className="w-3 h-3" />
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   );
//                 },
//               )}
//             </div>

//             {/* Pagination - NASA Style */}
//             {totalPages > 1 && (
//               <div className="flex justify-center gap-2 mt-10">
//                 <button
//                   onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//                   disabled={currentPage === 1}
//                   className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
//                 >
//                   ← មុន
//                 </button>
//                 <div className="flex gap-1">
//                   {[...Array(Math.min(totalPages, 5))].map((_, i) => {
//                     let pageNum = i + 1;
//                     if (totalPages > 5 && currentPage > 3) {
//                       pageNum = currentPage - 2 + i;
//                       if (pageNum > totalPages) return null;
//                     }
//                     return (
//                       <button
//                         key={i}
//                         onClick={() => setCurrentPage(pageNum)}
//                         className={`w-10 h-10 rounded-lg transition ${
//                           currentPage === pageNum
//                             ? `bg-gradient-to-r ${accentColorClass} text-white`
//                             : "bg-white hover:bg-gray-100"
//                         }`}
//                       >
//                         {pageNum}
//                       </button>
//                     );
//                   })}
//                 </div>
//                 <button
//                   onClick={() =>
//                     setCurrentPage((p) => Math.min(totalPages, p + 1))
//                   }
//                   disabled={currentPage === totalPages}
//                   className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
//                 >
//                   បន្ទាប់ →
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Eye,
  Calendar,
  Tag,
  FolderTree,
  ArrowLeft,
  Rocket,
  ChevronRight,
  Clock,
  TrendingUp,
  FlaskConical,
  Cpu,
  Globe,
  Heart,
  Film,
  GraduationCap,
  FolderOpen,
  Sparkles,
  Star,
  Database,
  Zap,
  BookOpen,
  Compass,
} from "lucide-react";
import { publicAPI } from "../api/userApi";
import LoadingSpinner from "../components/LoadingSpinner";

export default function CategoryPageNASA() {
  const { code } = useParams();
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [featuredPost, setFeaturedPost] = useState(null);

  useEffect(() => {
    if (code) {
      console.log("🔍 Category code from URL:", code);
      fetchCategoryPosts();
    }
  }, [code, currentPage]);

  const fetchCategoryPosts = async () => {
    setLoading(true);
    try {
      console.log(`📤 Fetching posts for category: ${code}`);
      const res = await publicAPI.getPosts(currentPage, 12, code);
      console.log("📥 Response:", res.data);

      const postsData = res.data.posts || [];
      setPosts(postsData);
      setTotalPages(res.data.totalPages || 1);

      if (currentPage === 1 && postsData.length > 0) {
        setFeaturedPost(postsData[0]);
      } else {
        setFeaturedPost(null);
      }

      if (postsData.length > 0) {
        setCategory(postsData[0].category);
      } else {
        const categoriesRes = await publicAPI.getCategories();
        const foundCategory = categoriesRes.data.categories.find(
          (c) => c.code === code,
        );
        setCategory(foundCategory || { code: code, name_kh: code });
      }
    } catch (error) {
      console.error("Error fetching category posts:", error);
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

  // NASA Style Category Configuration with Lucide Icons
  const getCategoryConfig = (categoryCode) => {
    const configs = {
      SPACE: {
        icon: <Rocket className="w-8 h-8 sm:w-10 sm:h-10" />,
        bgGradient: "from-purple-900 via-blue-900 to-black",
        accentColor: "purple",
        heroImage:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=400&fit=crop",
        description: "ស្វែងយល់ពីអាថ៌កំបាំងនៃសកលលោក ភពផ្សេងៗ និងការរុករកអវកាស",
      },
      SCIENCE: {
        icon: <FlaskConical className="w-8 h-8 sm:w-10 sm:h-10" />,
        bgGradient: "from-cyan-900 via-blue-900 to-indigo-900",
        accentColor: "cyan",
        heroImage:
          "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1920&h=400&fit=crop",
        description: "វិទ្យាសាស្ត្រទំនើប ការពិសោធន៍ និងការរកឃើញថ្មីៗ",
      },
      TECHNOLOGY: {
        icon: <Cpu className="w-8 h-8 sm:w-10 sm:h-10" />,
        bgGradient: "from-blue-900 via-indigo-900 to-purple-900",
        accentColor: "blue",
        heroImage:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=400&fit=crop",
        description: "បច្ចេកវិទ្យាទំនើប AI, Robotics និង Innovation",
      },
      TECH: {
        icon: <Database className="w-8 h-8 sm:w-10 sm:h-10" />,
        bgGradient: "from-blue-900 via-indigo-900 to-purple-900",
        accentColor: "blue",
        heroImage:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=400&fit=crop",
        description: "បច្ចេកវិទ្យាទំនើប AI, Robotics និង Innovation",
      },
      INTERNATIONAL: {
        icon: <Globe className="w-8 h-8 sm:w-10 sm:h-10" />,
        bgGradient: "from-green-900 via-teal-900 to-cyan-900",
        accentColor: "green",
        heroImage:
          "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1920&h=400&fit=crop",
        description: "ព័ត៌មានអន្តរជាតិ វប្បធម៌ និងទំនាក់ទំនងពិភពលោក",
      },
      HEALTH: {
        icon: <Heart className="w-8 h-8 sm:w-10 sm:h-10" />,
        bgGradient: "from-red-900 via-rose-900 to-pink-900",
        accentColor: "red",
        heroImage:
          "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1920&h=400&fit=crop",
        description: "សុខភាព អាហារូបត្ថម្ភ និងការថែទាំរាងកាយ",
      },
      ENTERTAINMENT: {
        icon: <Film className="w-8 h-8 sm:w-10 sm:h-10" />,
        bgGradient: "from-orange-900 via-amber-900 to-yellow-900",
        accentColor: "orange",
        heroImage:
          "https://images.unsplash.com/photo-1603199506016-b9a594b59c56?w=1920&h=400&fit=crop",
        description: "កម្សាន្ត ភាពយន្ត តន្ត្រី និងវប្បធម៌ប៉ុប",
      },
      EDUCATION: {
        icon: <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10" />,
        bgGradient: "from-indigo-900 via-purple-900 to-pink-900",
        accentColor: "indigo",
        heroImage:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&h=400&fit=crop",
        description: "មេរៀន ចំណេះដឹង និងការអប់រំគ្រប់កម្រិត",
      },
    };

    return (
      configs[categoryCode?.toUpperCase()] || {
        icon: <FolderOpen className="w-8 h-8 sm:w-10 sm:h-10" />,
        bgGradient: "from-gray-900 to-gray-800",
        accentColor: "gray",
        heroImage:
          "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&h=400&fit=crop",
        description: "ស្វែងរកអត្ថបទក្នុងប្រភេទនេះ",
      }
    );
  };

  const categoryConfig = getCategoryConfig(code);
  const accentColorClass =
    {
      purple: "from-purple-500/30 to-pink-500/40",
      cyan: "from-cyan-500/30 to-blue-500/40",
      blue: "from-blue-500/30 to-indigo-500/40",
      green: "from-green-500/30 to-teal-500/40",
      red: "from-red-500/30 to-rose-500/40",
      orange: "from-orange-500/30 to-amber-500/40",
      indigo: "from-indigo-500/30 to-purple-500/40",
      gray: "from-gray-500/30 to-gray-600/30",
    }[categoryConfig.accentColor] || "from-blue-500 to-purple-500";

  const getFirstImageUrl = (post) => {
    if (!post) return null;
    if (post.images && Array.isArray(post.images) && post.images.length > 0) {
      const firstImage = post.images[0];
      if (typeof firstImage === "string")
        return `http://127.0.0.1:3000${firstImage}`;
      if (firstImage.url) return `http://127.0.0.1:3000${firstImage.url}`;
    }
    if (post.featured_image)
      return `http://127.0.0.1:3000${post.featured_image}`;
    if (post.image) return `http://127.0.0.1:3000${post.image}`;
    return null;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NASA Style Hero Section */}
      <div
        className="relative bg-black text-white overflow-hidden"
        style={{
          backgroundImage: `url(${categoryConfig.heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-r ${categoryConfig.bgGradient} opacity-85`}
        ></div>
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="container mx-auto px-4 py-16 sm:py-20 md:py-24 relative z-10">
          <div className="max-w-4xl">
            {/* Back Button */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full"
            >
              <ArrowLeft className="w-4 h-4" /> ត្រឡប់ទៅទំព័រដើម
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                {categoryConfig.icon}
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 mb-3">
                  <Rocket className="w-3 h-3" />
                  <span className="text-xs">ប្រភេទអត្ថបទ</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                  {category?.name_kh || code}
                </h1>
              </div>
            </div>
            <p className="text-white/90 text-base sm:text-lg max-w-2xl">
              {categoryConfig.description}
            </p>

            {/* Stats */}
            <div className="flex gap-6 mt-6">
              <div className="flex items-center gap-2 text-white/80">
                <FolderTree className="w-4 h-4" />
                <span className="text-sm">{posts.length} អត្ថបទ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="w-full h-12"
          >
            <path
              fill="#f9fafb"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Post - NASA Style */}
        {featuredPost && currentPage === 1 && (
          <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-full min-h-[300px] overflow-hidden">
                  {getFirstImageUrl(featuredPost) ? (
                    <img
                      src={getFirstImageUrl(featuredPost)}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                      alt={featuredPost.title_kh}
                    />
                  ) : (
                    <div
                      className={`w-full h-full bg-gradient-to-br ${accentColorClass} flex items-center justify-center`}
                    >
                      {categoryConfig.icon}
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`bg-gradient-to-r ${accentColorClass} text-white text-xs px-3 py-1 rounded-full inline-flex items-center gap-1`}
                    >
                      <Star className="w-3 h-3" />
                      អត្ថបទពិសេស
                    </span>
                  </div>
                </div>
                <div className="p-6 sm:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 flex-wrap">
                    <span
                      className={`text-${categoryConfig.accentColor}-600 font-medium`}
                    >
                      {featuredPost.category?.name_kh || code}
                    </span>
                    <span>•</span>
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(featuredPost.createdAt)}</span>
                    <span>•</span>
                    <Eye className="w-3 h-3" />
                    <span>{featuredPost.views || 0} views</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3 hover:text-blue-600 transition">
                    <Link to={`/post/${featuredPost.id}`}>
                      {featuredPost.title_kh}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {featuredPost.excerpt ||
                      (featuredPost.content
                        ? featuredPost.content
                            .replace(/<[^>]*>/g, "")
                            .substring(0, 150) + "..."
                        : "គ្មានមាតិកា")}
                  </p>
                  <Link
                    to={`/post/${featuredPost.id}`}
                    className={`inline-flex items-center gap-2 text-${categoryConfig.accentColor}-600 font-medium hover:gap-3 transition-all`}
                  >
                    អានបន្ថែម <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts Grid - NASA Cards Style */}
        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <FolderTree className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              មិនទាន់មានអត្ថបទក្នុងប្រភេទនេះទេ
            </p>
            <Link
              to="/"
              className="inline-block mt-4 text-blue-600 hover:text-blue-700 transition"
            >
              ត្រឡប់ទៅទំព័រដើម
            </Link>
          </div>
        ) : (
          <>
            {/* Section Title */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span
                  className={`w-1 h-6 bg-gradient-to-b ${accentColorClass} rounded-full`}
                ></span>
                អត្ថបទទាំងអស់
              </h2>
              <span className="text-sm text-gray-500">
                ទំព័រ {currentPage} នៃ {totalPages}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(currentPage === 1 ? posts.slice(1) : posts).map(
                (post, index) => {
                  const imageUrl = getFirstImageUrl(post);
                  return (
                    <Link
                      to={`/post/${post.id}`}
                      key={post.id}
                      className="group"
                    >
                      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                        <div className="relative h-48 overflow-hidden">
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
                            <div
                              className={`w-full h-full bg-gradient-to-br ${accentColorClass} flex items-center justify-center`}
                            >
                              {categoryConfig.icon}
                            </div>
                          )}
                          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur rounded-full px-2 py-1 text-xs text-white flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {post.views || 0}
                          </div>
                          {index === 0 && currentPage === 1 && (
                            <div className="absolute bottom-3 left-3">
                              <span
                                className={`bg-gradient-to-r ${accentColorClass} text-white text-xs px-2 py-1 rounded-full inline-flex items-center gap-1`}
                              >
                                <Sparkles className="w-3 h-3" />
                                ថ្មី
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2 flex-wrap">
                            <span
                              className={`text-${categoryConfig.accentColor}-600 font-medium`}
                            >
                              {post.category?.name_kh || code}
                            </span>
                            <span>•</span>
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(post.createdAt)}</span>
                          </div>
                          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                            {post.title_kh}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-3 flex-1">
                            {post.excerpt ||
                              (post.content
                                ? post.content
                                    .replace(/<[^>]*>/g, "")
                                    .substring(0, 100) + "..."
                                : "គ្មានមាតិកា")}
                          </p>
                          <div
                            className={`inline-flex items-center gap-1 text-${categoryConfig.accentColor}-600 text-sm font-medium group-hover:gap-2 transition-all`}
                          >
                            អានបន្ថែម <ChevronRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                },
              )}
            </div>

            {/* Pagination - NASA Style */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
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
                            ? `bg-gradient-to-r ${accentColorClass} text-white`
                            : "bg-white hover:bg-gray-100"
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
                  className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  បន្ទាប់ →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
