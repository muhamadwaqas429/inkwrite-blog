import React from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/config";

const PostCard = ({ post }) => {
  const preview = post?.featuredimage
    ? service.getFilePreview(post.featuredimage)
    : null;

  return (
    <Link
      to={`/post/${post.$id}`}
      className="group block bg-slate-900/95 border border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-600/40 transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative w-full h-52 flex items-center justify-center bg-slate-800">
        {preview ? (
          <img
            src={preview}
            alt={post.title}
            className="max-h-52 w-auto object-contain rounded-t-xl transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">
            No Image
          </div>
        )}
      </div>

      {/* Text Section */}
      <div className="p-4 space-y-2">
        <h2 className="text-base font-semibold text-white group-hover:text-indigo-400 transition-colors duration-300 line-clamp-1">
          {post.title}
        </h2>

        <p
          className="text-sm text-gray-400 line-clamp-2 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Read More Button */}
        <div className="pt-3">
          <span className="text-indigo-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
            Read more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
