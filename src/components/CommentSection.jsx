import { useState, useEffect } from "react";
import { MessageCircle, User, Mail, Send, Clock } from "lucide-react";
import { publicAPI } from "../api/userApi";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ user_name: "", user_email: "", content: "" });

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const res = await publicAPI.getComments(postId);
      setComments(res.data.comments || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.user_name || !form.content) {
      alert("សូមបំពេញឈ្មោះ និងមតិ");
      return;
    }

    setSubmitting(true);
    try {
      await publicAPI.addComment({ ...form, post_id: postId });
      setForm({ user_name: "", user_email: "", content: "" });
      fetchComments();
    } catch (error) {
      alert("មានបញ្ហាក្នុងការបញ្ចេញមតិ");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-blue-500" />
        មតិយោបល់ ({comments.length})
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ឈ្មោះ <span className="text-red-500">*</span></label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={form.user_name}
                onChange={(e) => setForm({ ...form, user_name: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="បញ្ចូលឈ្មោះ"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">អ៊ីមែល</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={form.user_email}
                onChange={(e) => setForm({ ...form, user_email: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="your@email.com"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">មតិ <span className="text-red-500">*</span></label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows="3"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="សរសេរមតិរបស់អ្នក..."
            required
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition disabled:opacity-50"
        >
          {submitting ? "កំពុងផ្ញើ..." : "បញ្ចេញមតិ"}
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Comments List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-20 bg-gray-100 rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>មិនទាន់មានមតិយោបល់ទេ</p>
          <p className="text-sm">សូមចុះមតិដំបូង!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b pb-4 last:border-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-800">{comment.user_name}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  {new Date(comment.createdAt).toLocaleDateString("km-KH")}
                </div>
              </div>
              <p className="text-gray-600 ml-10">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}