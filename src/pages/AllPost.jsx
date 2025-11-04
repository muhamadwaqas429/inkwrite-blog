import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import PostCard from "../components/PostCard";

const AllPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getAllPost().then((result) => {
      if (result) {
        setPosts(result.documents);
      }
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Posts</h1>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard key={post.$id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPost;
