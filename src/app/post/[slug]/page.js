"use client";
import TimeStamp from "../../components/TimeStamp";
import PostAuthor from "../../components/PostAuthor";
import ReactionButtons from "../../components/ReactionButtons";
import { deletePost, updatePost } from "../../redux/features/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page({ params }) {
  const dispatch = useDispatch();
  const posts=useSelector((state)=>state.posts.posts);

  console.log(posts);
  const post = useSelector((state) => state.posts.posts).find(
    (post) => post.id === params.slug
  );

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post ? post.title : ''); // Set initial title based on post
  const [content, setContent] = useState(post ? post.content : ''); // Set initial content based on post

  useEffect(() => {
    if (post) {
      setTitle(post.title);   // Update title if post changes
      setContent(post.content); // Update content if post changes
    }
  }, [post]); // Run effect when post changes

  const handleDeletePost = (id) => {
    dispatch(deletePost(id));
  };

  const handleEditPost = () => {
    setIsEditing(true);
  };

  const handleSavePost = () => {
    dispatch(updatePost({ id: post.id, title, content }));
    setIsEditing(false);
  };

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <Link href="/">back to posts</Link>
      <h1 className="text-3xl font-bold mb-4">Post Details</h1>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={!isEditing}
          className={`mt-1 block w-full px-3 py-2 border ${
            isEditing ? "border-indigo-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={!isEditing}
          className={`mt-1 block w-full px-3 py-2 border ${
            isEditing ? "border-indigo-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          rows="6"
        ></textarea>
      </div>
      <PostAuthor userId={post.userId} />
      <TimeStamp timestamp={post.date} />
      <ReactionButtons post={post} />

      <div className="mt-6 flex space-x-4">
        {!isEditing ? (
          <button
            onClick={handleEditPost}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleSavePost}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Save
          </button>
        )}

        <button
          onClick={() => handleDeletePost(post.id)}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
