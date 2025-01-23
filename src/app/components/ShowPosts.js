import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { deletePost } from "../redux/features/postsSlice";
import PostAuthor from "./PostAuthor";
import TimeStamp from "./TimeStamp";
import ReactionButtons from "./ReactionButtons";

const ShowPosts = () => {
  const dispatch = useDispatch();
  const viewpost=useRouter();
  const posts = useSelector((state) => state.posts.posts);
  const status=useSelector((state)=>state.posts.status);
  const error=useSelector((state)=>state.posts.error);
  const orderedPosts=posts.slice().sort((a,b)=>b.date.localeCompare(a.date));
  // useEffect(() => {
  //   console.log("fetching posts");
  //   dispatch(fetchPosts());
  // }, [dispatch]);

  const viewPost = (id) => {
    viewpost.push(`/post/${id}`);
  }

  return (status === "loading") ? (<p>Loading...</p>) : (status === "failed") ? (<p>{error}</p>) :(
    <div>
      {orderedPosts.map((post, index) => (
        <div key={index} className="border-b border-gray-200 py-4">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-600">{post.content}</p>
          <PostAuthor userId={post.userId} />
          <TimeStamp timestamp={post.date} />
          <ReactionButtons post={post} />
          <button onClick={()=>viewPost(post.id)} className="hover:underline block font-semibold">View Post</button>
          <button
            onClick={() =>dispatch(deletePost(post.id)) }
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ShowPosts;