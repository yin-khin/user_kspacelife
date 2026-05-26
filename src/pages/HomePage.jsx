// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Eye,
//   Calendar,
//   Tag,
//   ChevronRight,
//   TrendingUp,
//   Clock,
//   Sparkles,
//   Image as ImageIcon,
// } from "lucide-react";
// import { publicAPI } from "../api/userApi";
// import LoadingSpinner from "../components/LoadingSpinner";

// export default function HomePage() {
//   const [posts, setPosts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [recentPosts, setRecentPosts] = useState([]);
//   const [popularPosts, setPopularPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [activeTab, setActiveTab] = useState("latest");

//   useEffect(() => {
//     fetchData();
//   }, [currentPage]);

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const [postsRes, categoriesRes] = await Promise.all([
//         publicAPI.getPosts(currentPage, 6),
//         publicAPI.getCategories(),
//       ]);

//       console.log("Posts response:", postsRes.data);
//       console.log("Categories response:", categoriesRes.data);

//       const postsData = postsRes.data.posts || [];
//       const categoriesData = categoriesRes.data.categories || [];

//       setPosts(postsData);
//       setTotalPages(postsRes.data.totalPages || 1);
//       setCategories(categoriesData);

//       const sortedByDate = [...postsData].sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
//       );
//       setRecentPosts(sortedByDate.slice(0, 5));

//       const sortedByViews = [...postsData].sort(
//         (a, b) => (b.views || 0) - (a.views || 0),
//       );
//       setPopularPosts(sortedByViews.slice(0, 5));
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError("មិនអាចទាញទិន្នន័យបានទេ។ សូមពិនិត្យការតភ្ជាប់បណ្តាញ។");
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

//   const getCategoryColor = (categoryCode) => {
//     const colors = {
//       TECH: "from-red-500 to-cyan-500",
//       SPACE: "from-purple-500 to-pink-500",
//       HEALTH: "from-green-500 to-emerald-500",
//       EDUCATION: "from-indigo-500 to-purple-500",
//       ENTERTAINMENT: "from-orange-500 to-red-500",
//     };
//     return colors[categoryCode] || "from-gray-500 to-gray-600";
//   };

//   const getFirstImageUrl = (post) => {
//     if (!post) return null;

//     if (post.images && Array.isArray(post.images) && post.images.length > 0) {
//       const firstImage = post.images[0];
//       if (typeof firstImage === "string") {
//         return `http://127.0.0.1:3000${firstImage}`;
//       }
//       if (firstImage.url) {
//         return `http://127.0.0.1:3000${firstImage.url}`;
//       }
//     }

//     if (post.featured_image) {
//       return `http://127.0.0.1:3000${post.featured_image}`;
//     }

//     if (post.image) {
//       return `http://127.0.0.1:3000${post.image}`;
//     }

//     return null;
//   };

//   // Image Placeholder Component with Blue Background and Black Blur
//   const ImagePlaceholder = ({ message = "គ្មានរូបភាព", showIcon = true }) => {
//     return (
//       <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
//         {/* Black blur effects */}
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="w-32 h-32 sm:w-40 sm:h-40 bg-black/50 rounded-full blur-2xl animate-pulse"></div>
//         </div>
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="w-48 h-48 sm:w-56 sm:h-56 bg-black/30 rounded-full blur-xl"></div>
//         </div>

//         {/* Pattern overlay */}
//         <div
//           className="absolute inset-0 opacity-20"
//           style={{
//             backgroundImage: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
//           }}
//         ></div>

//         {/* Content */}
//         <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
//           {showIcon && (
//             <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mb-2">
//               <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
//             </div>
//           )}
//           <p className="text-white/80 text-xs sm:text-sm font-medium">
//             {message}
//           </p>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-16 text-center">
//         <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
//           <p className="text-red-600 mb-4">{error}</p>
//           <button
//             onClick={() => fetchData()}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             ព្យាយាមម្តងទៀត
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="pb-16">
//       {/* Hero Section */}
//       <div className="bg-black text-white">
//         <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
//           <div className="max-w-3xl mx-auto text-center">
//             <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 sm:px-4 sm:py-2 mb-4 backdrop-blur">
//               {/* <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" /> */}
//               <span className="text-xs sm:text-sm">
//                 សូមស្វាគមន៍មកកាន់ K SPACE LIFE
//               </span>
//             </div>
//             <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
//               ចែករំលែកចំណេះដឹង
//             </h1>
//             <p className="text-sm sm:text-base md:text-lg opacity-90 mb-6 px-2">
//               ស្វែងរកអត្ថបទ ព័ត៌មាន និងចំណេះដឹងថ្មីៗពីគ្រប់វិស័យ
//             </p>
//             <Link
//               to="/search"
//               className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition active:scale-95"
//             >
//               ចាប់ផ្ដើមអាន <ChevronRight className="w-4 h-4" />
//             </Link>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-6 sm:py-8">
//         {/* Mobile Tab Navigation */}
//         <div className="flex gap-2 mb-6 sm:hidden bg-white rounded-xl p-1 shadow-sm">
//           <button
//             onClick={() => setActiveTab("latest")}
//             className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
//               activeTab === "latest"
//                 ? "bg-blue-600 text-white"
//                 : "text-gray-600"
//             }`}
//           >
//             ថ្មីៗ
//           </button>
//           <button
//             onClick={() => setActiveTab("popular")}
//             className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
//               activeTab === "popular"
//                 ? "bg-blue-600 text-white"
//                 : "text-gray-600"
//             }`}
//           >
//             ពេញនិយម
//           </button>
//           <button
//             onClick={() => setActiveTab("categories")}
//             className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
//               activeTab === "categories"
//                 ? "bg-blue-600 text-white"
//                 : "text-gray-600"
//             }`}
//           >
//             ប្រភេទ
//           </button>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
//           {/* Main Content - Posts Grid */}
//           <div className="lg:col-span-2">
//             {/* Desktop Title */}
//             <div className="hidden sm:flex justify-between items-center mb-6">
//               <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
//                 អត្ថបទថ្មីៗ
//               </h2>
//               <Link
//                 to="/search"
//                 className="text-blue-600 text-sm hover:text-blue-700"
//               >
//                 មើលទាំងអស់ →
//               </Link>
//             </div>

//             {/* Mobile Title */}
//             <div className="sm:hidden mb-4">
//               <h2 className="text-lg font-bold text-gray-800">
//                 {activeTab === "latest" && "អត្ថបទថ្មីៗ"}
//                 {activeTab === "popular" && "កំពុងពេញនិយម"}
//                 {activeTab === "categories" && "ប្រភេទអត្ថបទ"}
//               </h2>
//             </div>

//             {/* Latest Posts - Desktop & Mobile Tab */}
//             {(activeTab === "latest" || window.innerWidth >= 640) && (
//               <div
//                 className={
//                   activeTab === "categories" && window.innerWidth < 640
//                     ? "hidden"
//                     : ""
//                 }
//               >
//                 {posts.length === 0 ? (
//                   <div className="text-center py-12 bg-white rounded-2xl">
//                     <p className="text-gray-400">មិនទាន់មានអត្ថបទនៅឡើយទេ</p>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//                     {posts.map((post) => {
//                       const imageUrl = getFirstImageUrl(post);
//                       return (
//                         <Link
//                           to={`/post/${post.id}`}
//                           key={post.id}
//                           className="group"
//                         >
//                           <div className="bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98]">
//                             <div className="relative h-40 sm:h-48 overflow-hidden">
//                               {imageUrl ? (
//                                 <>
//                                   <img
//                                     src={imageUrl}
//                                     className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
//                                     alt={post.title_kh}
//                                     onError={(e) => {
//                                       console.error(
//                                         `Failed to load image: ${imageUrl}`,
//                                       );
//                                       e.target.style.display = "none";
//                                       const parent = e.target.parentElement;
//                                       if (parent) {
//                                         const fallback =
//                                           document.createElement("div");
//                                         fallback.className = "w-full h-full";
//                                         parent.appendChild(fallback);
//                                         e.target.remove();
//                                       }
//                                     }}
//                                   />
//                                   <div className="absolute top-2 right-2 bg-black/50 backdrop-blur rounded-full px-1.5 py-0.5 text-[10px] text-white flex items-center gap-1">
//                                     <Eye className="w-2 h-2" />
//                                     {post.views || 0}
//                                   </div>
//                                 </>
//                               ) : (
//                                 <>
//                                   <ImagePlaceholder message="គ្មានរូបភាព" />
//                                   <div className="absolute top-2 right-2 bg-black/50 backdrop-blur rounded-full px-1.5 py-0.5 text-[10px] text-white flex items-center gap-1">
//                                     <Eye className="w-2 h-2" />
//                                     {post.views || 0}
//                                   </div>
//                                 </>
//                               )}
//                             </div>
//                             <div className="p-3 sm:p-4">
//                               <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-500 mb-1 sm:mb-2">
//                                 <span
//                                   className={`inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r ${getCategoryColor(post.category_code)}`}
//                                 ></span>
//                                 <span>
//                                   {post.category?.name_kh || "គ្មានប្រភេទ"}
//                                 </span>
//                                 <span>•</span>
//                                 <Calendar className="w-2.5 h-2.5" />
//                                 <span>{formatDate(post.createdAt)}</span>
//                               </div>
//                               <h3 className="font-bold text-sm sm:text-lg mb-1 line-clamp-2 group-hover:text-blue-600 transition">
//                                 {post.title_kh}
//                               </h3>
//                               <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
//                                 {post.excerpt ||
//                                   (post.content
//                                     ? post.content
//                                         .replace(/<[^>]*>/g, "")
//                                         .substring(0, 80) + "..."
//                                     : "គ្មានមាតិកា")}
//                               </p>
//                             </div>
//                           </div>
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 )}

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <div className="flex justify-center gap-1 sm:gap-2 mt-6 sm:mt-8">
//                     <button
//                       onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//                       disabled={currentPage === 1}
//                       className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white border rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
//                     >
//                       ←
//                     </button>
//                     <div className="flex gap-1">
//                       {[...Array(Math.min(totalPages, 5))].map((_, i) => {
//                         let pageNum = i + 1;
//                         if (totalPages > 5 && currentPage > 3) {
//                           pageNum = currentPage - 2 + i;
//                           if (pageNum > totalPages) return null;
//                         }
//                         return (
//                           <button
//                             key={i}
//                             onClick={() => setCurrentPage(pageNum)}
//                             className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-sm transition ${
//                               currentPage === pageNum
//                                 ? "bg-blue-600 text-white"
//                                 : "bg-white hover:bg-gray-100"
//                             }`}
//                           >
//                             {pageNum}
//                           </button>
//                         );
//                       })}
//                     </div>
//                     <button
//                       onClick={() =>
//                         setCurrentPage((p) => Math.min(totalPages, p + 1))
//                       }
//                       disabled={currentPage === totalPages}
//                       className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white border rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
//                     >
//                       →
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Popular Posts Tab for Mobile */}
//             {activeTab === "popular" && (
//               <div>
//                 <div className="space-y-3">
//                   {popularPosts.map((post, index) => (
//                     <Link
//                       to={`/post/${post.id}`}
//                       key={post.id}
//                       className="block"
//                     >
//                       <div className="bg-white rounded-xl p-3 flex gap-3 active:bg-gray-50 transition shadow-sm">
//                         <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
//                           {index + 1}
//                         </div>
//                         <div className="flex-1">
//                           <h4 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600">
//                             {post.title_kh}
//                           </h4>
//                           <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
//                             <Eye className="w-3 h-3" />
//                             <span>{post.views || 0} views</span>
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   ))}
//                   {popularPosts.length === 0 && (
//                     <div className="text-center py-8 text-gray-400">
//                       <p>មិនទាន់មានអត្ថបទនៅឡើយទេ</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Categories Tab for Mobile */}
//             {activeTab === "categories" && (
//               <div>
//                 <div className="grid grid-cols-2 gap-3">
//                   {categories.map((cat) => (
//                     <Link
//                       key={cat.code}
//                       to={`/category/${cat.code}`}
//                       className="bg-white rounded-xl p-3 text-center active:bg-gray-50 transition shadow-sm"
//                     >
//                       <div className="text-2xl mb-1">{cat.icon || "📁"}</div>
//                       <div className="font-medium text-sm line-clamp-1">
//                         {cat.name_kh}
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Sidebar - Desktop Only */}
//           <div className="hidden lg:block space-y-6">
//             {/* Popular Posts */}
//             <div className="bg-white rounded-2xl shadow-md p-5">
//               <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
//                 <TrendingUp className="w-5 h-5 text-orange-500" />
//                 កំពុងពេញនិយម
//               </h3>
//               <div className="space-y-3">
//                 {popularPosts.map((post, index) => (
//                   <Link
//                     to={`/post/${post.id}`}
//                     key={post.id}
//                     className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition group"
//                   >
//                     <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
//                       {index + 1}
//                     </div>
//                     <div className="flex-1">
//                       <h4 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600">
//                         {post.title_kh}
//                       </h4>
//                       <div className="text-xs text-gray-400 mt-1">
//                         {post.views || 0} views
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//                 {popularPosts.length === 0 && (
//                   <p className="text-gray-400 text-sm text-center py-4">
//                     មិនទាន់មានទិន្នន័យ
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Categories */}
//             <div className="bg-white rounded-2xl shadow-md p-5">
//               <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
//                 <Tag className="w-5 h-5 text-green-500" />
//                 ប្រភេទអត្ថបទ
//               </h3>
//               <div className="space-y-2">
//                 {categories.map((cat) => (
//                   <Link
//                     key={cat.code}
//                     to={`/category/${cat.code}`}
//                     className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition group"
//                   >
//                     <span className="flex items-center gap-2">
//                       <span className="text-xl">{cat.icon || "📁"}</span>
//                       <span className="group-hover:text-blue-600">
//                         {cat.name_kh}
//                       </span>
//                     </span>
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             {/* Recent Posts */}
//             <div className="bg-white rounded-2xl shadow-md p-5">
//               <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
//                 <Clock className="w-5 h-5 text-blue-500" />
//                 អត្ថបទថ្មីៗ
//               </h3>
//               <div className="space-y-3">
//                 {recentPosts.map((post) => {
//                   const imageUrl = getFirstImageUrl(post);
//                   return (
//                     <Link
//                       to={`/post/${post.id}`}
//                       key={post.id}
//                       className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition group"
//                     >
//                       {imageUrl ? (
//                         <img
//                           src={imageUrl}
//                           className="w-14 h-14 object-cover rounded-lg"
//                           alt={post.title_kh}
//                           onError={(e) => {
//                             e.target.style.display = "none";
//                           }}
//                         />
//                       ) : (
//                         <div className="w-14 h-14 rounded-lg overflow-hidden">
//                           <ImagePlaceholder showIcon={false} message="" />
//                         </div>
//                       )}
//                       <div className="flex-1">
//                         <h4 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600">
//                           {post.title_kh}
//                         </h4>
//                         <p className="text-xs text-gray-400 mt-1">
//                           {formatDate(post.createdAt)}
//                         </p>
//                       </div>
//                     </Link>
//                   );
//                 })}
//                 {recentPosts.length === 0 && (
//                   <p className="text-gray-400 text-sm text-center py-4">
//                     មិនទាន់មានទិន្នន័យ
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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

  // NASA Style Category Images Mapping
  const getCategoryImage = (categoryCode, categoryName) => {
    const name = categoryName?.toLowerCase() || "";
    const code = categoryCode?.toUpperCase() || "";

    // NASA-style space images based on category
    const categoryImages = {
      SPACE:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
      SCIENCE:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop",
      TECHNOLOGY:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
      TECH: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
      INTERNATIONAL:
        "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=600&h=400&fit=crop",
      HEALTH:
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&h=400&fit=crop",
      ENTERTAINMENT:
        "https://images.unsplash.com/photo-1603199506016-b9a594b59c56?w=600&h=400&fit=crop",
      EDUCATION:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
    };

    if (categoryImages[code]) return categoryImages[code];

    // Default NASA-style image
    return "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&h=400&fit=crop";
  };

  const getCategoryIcon = (categoryCode, categoryName) => {
    const name = categoryName?.toLowerCase() || "";
    const code = categoryCode?.toUpperCase() || "";

    if (code === "SPACE" || name.includes("អវកាស"))
      return <Rocket className="w-5 h-5" />;
    if (code === "SCIENCE" || name.includes("វិទ្យាសាស្ត្រ"))
      return <Zap className="w-5 h-5" />;
    if (
      code === "TECHNOLOGY" ||
      code === "TECH" ||
      name.includes("បច្ចេកវិទ្យា")
    )
      return <Globe className="w-5 h-5" />;
    if (code === "INTERNATIONAL" || name.includes("អន្តរជាតិ"))
      return <Database className="w-5 h-5" />;
    if (code === "HEALTH" || name.includes("សុខភាព"))
      return <Heart className="w-5 h-5" />;
    if (code === "ENTERTAINMENT" || name.includes("កម្សាន្ត"))
      return <SparklesIcon className="w-5 h-5" />;
    if (code === "EDUCATION" || name.includes("មេរៀន"))
      return <GraduationCap className="w-5 h-5" />;
    return <Tag className="w-5 h-5" />;
  };

  const getCategoryColor = (categoryCode) => {
    const colors = {
      SPACE: "from-purple-600 to-blue-600",
      SCIENCE: "from-cyan-500 to-blue-600",
      TECHNOLOGY: "from-blue-500 to-indigo-600",
      TECH: "from-blue-500 to-indigo-600",
      INTERNATIONAL: "from-green-500 to-teal-600",
      HEALTH: "from-emerald-500 to-green-600",
      ENTERTAINMENT: "from-pink-500 to-rose-600",
      EDUCATION: "from-orange-500 to-red-600",
    };
    return colors[categoryCode] || "from-gray-500 to-gray-700";
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

      console.log("Posts response:", postsRes.data);
      console.log("Categories response:", categoriesRes.data);

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
        return `http://127.0.0.1:3000${firstImage}`;
      }
      if (firstImage.url) {
        return `http://127.0.0.1:3000${firstImage.url}`;
      }
    }

    if (post.featured_image) {
      return `http://127.0.0.1:3000${post.featured_image}`;
    }

    if (post.image) {
      return `http://127.0.0.1:3000${post.image}`;
    }

    return null;
  };

  // Image Placeholder Component
  const ImagePlaceholder = ({ message = "គ្មានរូបភាព", showIcon = true }) => {
    return (
      <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-black/50 rounded-full blur-2xl animate-pulse"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 sm:w-56 sm:h-56 bg-black/30 rounded-full blur-xl"></div>
        </div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
          }}
        ></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          {showIcon && (
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mb-2">
              <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          )}
          <p className="text-white/80 text-xs sm:text-sm font-medium">
            {message}
          </p>
        </div>
      </div>
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
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
    <div className="pb-16">
      {/* Hero Section - NASA Style */}
      <div
        className="relative bg-black text-white overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&h=600&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        <div className="container mx-auto px-4 py-16 sm:py-20 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">K SPACE LIFE • ស្វែងយល់ពីសកលលោក</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              ស្វែងរកចំណេះដឹង
              <br />
              <span className="text-blue-400">តាមដានអវកាស</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl opacity-90 mb-8 max-w-2xl">
              ស្វែងរកអត្ថបទ ព័ត៌មាន និងចំណេះដឹងថ្មីៗពីគ្រប់វិស័យ
            </p>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition transform hover:scale-105"
            >
              ចាប់ផ្ដើមស្វែងរក <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content - Posts Grid */}
          <div className="lg:col-span-2">
            {/* Desktop Title */}
            <div className="hidden sm:flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                អត្ថបទថ្មីៗ
              </h2>
              <Link
                to="/search"
                className="text-blue-600 text-sm hover:text-blue-700 font-medium"
              >
                មើលទាំងអស់ →
              </Link>
            </div>

            {/* Mobile Title */}
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
                  <div className="text-center py-12 bg-white rounded-2xl">
                    <p className="text-gray-400">មិនទាន់មានអត្ថបទនៅឡើយទេ</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    {posts.map((post) => {
                      const imageUrl = getFirstImageUrl(post);
                      return (
                        <Link
                          to={`/post/${post.id}`}
                          key={post.id}
                          className="group"
                        >
                          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="relative h-48 overflow-hidden">
                              {imageUrl ? (
                                <>
                                  <img
                                    src={imageUrl}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    alt={post.title_kh}
                                    onError={(e) => {
                                      e.target.style.display = "none";
                                      const parent = e.target.parentElement;
                                      if (parent) {
                                        const fallback =
                                          document.createElement("div");
                                        fallback.className = "w-full h-full";
                                        parent.appendChild(fallback);
                                        e.target.remove();
                                      }
                                    }}
                                  />
                                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur rounded-full px-2 py-1 text-xs text-white flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    {post.views || 0}
                                  </div>
                                </>
                              ) : (
                                <>
                                  <ImagePlaceholder message="គ្មានរូបភាព" />
                                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur rounded-full px-2 py-1 text-xs text-white flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    {post.views || 0}
                                  </div>
                                </>
                              )}
                            </div>
                            <div className="p-4">
                              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                <span
                                  className={`inline-block w-2 h-2 rounded-full bg-gradient-to-r ${getCategoryColor(post.category_code)}`}
                                ></span>
                                <span>
                                  {post.category?.name_kh || "គ្មានប្រភេទ"}
                                </span>
                                <span>•</span>
                                <Calendar className="w-3 h-3" />
                                <span>{formatDate(post.createdAt)}</span>
                              </div>
                              <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                                {post.title_kh}
                              </h3>
                              <p className="text-gray-600 text-sm line-clamp-2">
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
                      className="px-4 py-2 bg-white border rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
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
                      className="px-4 py-2 bg-white border rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
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
                      <div className="bg-white rounded-xl p-3 flex gap-3 active:bg-gray-50 transition shadow-sm">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
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

            {/* Categories Tab for Mobile - NASA Style */}
            {activeTab === "categories" && (
              <div>
                <div className="grid grid-cols-1 gap-4">
                  {categories.map((cat) => (
                    <Link
                      key={cat.code}
                      to={`/category/${cat.code}`}
                      className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative h-32 overflow-hidden">
                        <img
                          src={getCategoryImage(cat.code, cat.name_kh)}
                          alt={cat.name_kh}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(cat.code)} opacity-70`}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-between p-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                              {getCategoryIcon(cat.code, cat.name_kh)}
                            </div>
                            <div>
                              <h3 className="text-white font-bold text-lg">
                                {cat.name_kh}
                              </h3>
                              <p className="text-white/80 text-xs">
                                {cat.description || "ស្វែងយល់បន្ថែម"}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Desktop Only */}
          <div className="hidden lg:block space-y-6">
            {/* NASA Style Categories Section */}
            <div className="bg-white rounded-2xl shadow-md p-5">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-blue-600" />
                ស្វែងយល់តាមប្រភេទ
              </h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <Link
                    key={cat.code}
                    to={`/category/${cat.code}`}
                    className="group flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getCategoryColor(cat.code)} flex items-center justify-center text-white`}
                    >
                      {getCategoryIcon(cat.code, cat.name_kh)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium group-hover:text-blue-600 transition">
                        {cat.name_kh}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {cat.postCount || 0} អត្ថបទ
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular Posts */}
            <div className="bg-white rounded-2xl shadow-md p-5">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                កំពុងពេញនិយម
              </h3>
              <div className="space-y-3">
                {popularPosts.map((post, index) => (
                  <Link
                    to={`/post/${post.id}`}
                    key={post.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600">
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
            <div className="bg-white rounded-2xl shadow-md p-5">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
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
                          className="w-14 h-14 object-cover rounded-lg"
                          alt={post.title_kh}
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-lg overflow-hidden">
                          <ImagePlaceholder showIcon={false} message="" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600">
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
