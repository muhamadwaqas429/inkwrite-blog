import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LogoutBtn } from "../index";

const Header = () => {
  const authstatus = useSelector((state) => state.auth.status);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authstatus },
    { name: "Signup", slug: "/signup", active: !authstatus },
    { name: "All Posts", slug: "/all-posts", active: authstatus },
    { name: "Add Post", slug: "/add-post", active: authstatus },
  ];

  return (
    <header className="bg-slate-900/90 backdrop-blur-sm border-b border-slate-700 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="text-2xl font-semibold text-white">
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-bold">
            Inkwrite
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-3">
          {navItems.map(
            (item) =>
              item.active && (
                <Link
                  key={item.name}
                  to={item.slug}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              )
          )}
          {authstatus && <LogoutBtn />}
        </nav>
      </div>
    </header>
  );
};

export default Header;
