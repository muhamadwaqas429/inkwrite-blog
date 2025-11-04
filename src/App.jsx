import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "../store/authSlice.js";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData)); // ✅ FIX
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return null;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-400">
      <Header />

      <main className="flex-1">
        <Outlet /> {/* ✅ Route pages will load here */}
      </main>

      <Footer />
    </div>
  );
}

export default App;
