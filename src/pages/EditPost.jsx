import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, PostForm } from "../components";
import service from "../appwrite/config";

const EditPost = () => {
  const [post, setPost] = useState(null);

  const { slug } = useParams();
  const navigate = useNavigate();

  // Load specific post using slug
  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((result) => {
        if (result) {
          setPost(result);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
