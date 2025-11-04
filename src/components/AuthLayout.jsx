import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // Run only when authStatus changes
    if (authentication && !authStatus) {
      // If page requires auth but user isn’t logged in
      navigate("/login");
    } else if (!authentication && authStatus) {
      // If page is public but user is logged in
      navigate("/");
    }

    setLoading(false);
  }, [authStatus, navigate, authentication]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-700 text-xl">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};

export default Protected;
