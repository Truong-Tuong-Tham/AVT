import React, { useEffect, useState } from "react";
import { jobService } from "../../../../../../services/jobService";
import { Button, Input, Avatar, message } from "antd";
import { useSelector } from "react-redux";

const Comment = ({ idtype }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { infoUser,AvatarUser} = useSelector((state) => state.userReducer);

  const fetchListComment = async () => {
    try {
      const res = await jobService.getListComment(idtype);
      setComments(res.data.content);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
 

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const getRandomRating = () => {
    return Math.floor(Math.random() * 5) + 1; // Generates a random number between 1 and 5
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() !== "") {
      try {
        const newCommentData = {
          id: 0, // This will be set by the backend
          maCongViec: idtype,
          maNguoiBinhLuan: infoUser.user.id,
          ngayBinhLuan: new Date().toISOString(), // Format the date correctly
          noiDung: newComment,
          saoBinhLuan: getRandomRating(),
        };

        await jobService.postComment(newCommentData);

        // Add the new comment to the local state to display it immediately
        setComments([...comments, {
          ...newCommentData,
          id: Date.now(), // Temporary ID until the backend returns the real one
          tenNguoiBinhLuan: infoUser.user.name, // Use the user's name
          avatar: AvatarUser.avatar || "https://i.pravatar.cc/300", // Use the user's avatar or a placeholder
        }]);

        setNewComment("");
        message.success("Comment submitted successfully!");
        
      } catch (error) {
        console.error("Error submitting comment:", error);
        message.error("Failed to submit comment.");
      }
    } else {
      message.warning("Please enter a comment before submitting.");
    }
  };

  useEffect(() => {
    fetchListComment();
   
  }, [idtype]);

  return (
    <div className="p-3 bg-gray-50 rounded-md shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Comments</h3>
        {comments.length > 0 ? (
          comments.map((item) => (
            <div key={item.id} className="mb-3 p-2 border-b border-gray-200">
              <div className="flex items-start mb-1">
                <Avatar
                  src={item.avatar}
                  alt={item.tenNguoiBinhLuan}
                  className="mr-3"
                />
                <div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-gray-700">
                      {item.tenNguoiBinhLuan}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(item.ngayBinhLuan).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{item.noiDung}</p>
                  <div className="text-sm text-yellow-500">
                    {"⭐".repeat(item.saoBinhLuan)}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No comments available</p>
        )}
      </div>

      {/* Comment Input Section */}
      <div className="mt-4">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">
          Add a Comment
        </h4>
        <Input.TextArea
          value={newComment}
          onChange={handleCommentChange}
          rows={4}
          placeholder="Write your comment here..."
          className="mb-3"
        />
        <Button
          type="primary"
          onClick={handleCommentSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Submit Comment
        </Button>
      </div>
    </div>
  );
};

export default Comment;
