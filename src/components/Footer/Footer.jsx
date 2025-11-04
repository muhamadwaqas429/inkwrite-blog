import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3">
            Inkwrite
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Empowering creators through elegant design and thoughtful
            development. Your words, beautifully expressed.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Company</h3>
          <ul className="space-y-2">
            {["About Us", "Features", "Careers", "Press Kit"].map((item, i) => (
              <li key={i}>
                <Link
                  to="/"
                  className="hover:text-indigo-400 transition-colors text-sm"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2">
            {["Help Center", "Contact Us", "FAQs", "Report Issue"].map(
              (item, i) => (
                <li key={i}>
                  <Link
                    to="/"
                    className="hover:text-indigo-400 transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Connect</h3>
          <div className="flex space-x-4">
            <a
              href="https://github.com/muhamadwaqas429"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white text-xl transition-all duration-200"
              title="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-waqas-haqnawaz/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-blue-400 text-xl transition-all duration-200"
              title="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800 mt-8 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Inkwrite. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
