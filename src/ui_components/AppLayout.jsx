import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useContext } from "react";
import { ThemeContext } from "../lib/ThemeContext";

const AppLayout = ({ isAuthenticated, username, setIsAuthenticated, setUsername }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={darkMode ? "dark" : ""}>
      <main className="w-full min-h-screen flex flex-col bg-[#E6E6FA] dark:bg-[#1F2937]">
        <NavBar
          isAuthenticated={isAuthenticated}
          username={username}
          setIsAuthenticated={setIsAuthenticated}
          setUsername={setUsername}
        />
        <ToastContainer />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default AppLayout;
