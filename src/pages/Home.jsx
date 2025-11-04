// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await service.getAllPost();
      setPosts(res?.documents || []);
    })();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {posts.length === 0 && <p className="p-6 text-center">No posts found.</p>}
      {posts.map((post) => (
        <PostCard key={post.$id} post={post} />
      ))}
    </div>
  );
};

export default Home;
