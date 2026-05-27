// components/CommentSection.jsx
import { useState, useEffect } from "react";
import { publicAPI } from "../api/userApi";
import {
  Send,
  User,
  Mail,
  MessageCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    content: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const res = await publicAPI.getComments(postId);
      console.log("📥 Comments fetched:", res.data);
      setComments(res.data.comments || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.user_name.trim() || !formData.content.trim()) {
      setSubmitStatus({ type: "error", message: "សូមបំពេញឈ្មោះ និងមតិយោបល់" });
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    setSubmitting(true);
    try {
      await publicAPI.addComment({
        post_id: postId,
        user_name: formData.user_name,
        user_email: formData.user_email,
        content: formData.content,
      });
      setFormData({ user_name: "", user_email: "", content: "" });
      setSubmitStatus({
        type: "success",
        message: "មតិយោបល់របស់អ្នកត្រូវបានដាក់ស្នើ ហើយកំពុងរង់ចាំការអនុម័ត",
      });
      fetchComments();
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error("Error submitting comment:", error);
      setSubmitStatus({ type: "error", message: "មានបញ្ហា សូមព្យាយាមម្តងទៀត" });
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("km-KH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
        </div>
      </div>
    );
  }

  const approvedComments = comments.filter((c) => c.status === "approved");

  return (
    <div className="space-y-6">
      {/* Submit Status */}
      {submitStatus && (
        <div
          className={`p-3 rounded-lg text-sm ${
            submitStatus.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {submitStatus.type === "success" ? (
            <CheckCircle className="w-4 h-4 inline mr-2" />
          ) : (
            <Clock className="w-4 h-4 inline mr-2" />
          )}
          {submitStatus.message}
        </div>
      )}

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h4 className="font-semibold text-gray-800">ទុកមតិយោបល់</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="ឈ្មោះ *"
              value={formData.user_name}
              onChange={(e) =>
                setFormData({ ...formData, user_name: e.target.value })
              }
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              required
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              placeholder="អ៊ីមែល (ស្រេចចិត្ត)"
              value={formData.user_email}
              onChange={(e) =>
                setFormData({ ...formData, user_email: e.target.value })
              }
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            />
          </div>
        </div>
        <div className="relative">
          <MessageCircle className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <textarea
            placeholder="មតិយោបល់របស់អ្នក *"
            rows={4}
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-sm"
            required
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 text-sm font-medium"
        >
          <Send className="w-4 h-4" />
          {submitting ? "កំពុងផ្ញើ..." : "ផ្ញើមតិ"}
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <h4 className="font-semibold text-gray-800">
          មតិយោបល់ ({approvedComments.length})
        </h4>

        {approvedComments.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">
            មិនទាន់មានមតិយោបល់ទេ សូមក្លាយជាមនុស្សដំបូង!
          </p>
        ) : (
          approvedComments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                    {comment.user_name?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-800 text-sm">
                      {comment.user_name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
