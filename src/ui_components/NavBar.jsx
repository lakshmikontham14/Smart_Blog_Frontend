import ResponsiveNavBar from "./ResponsiveNavBar";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Sun, Moon, Menu } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../lib/ThemeContext";

const NavBar = ({
  isAuthenticated,
  username,
  setIsAuthenticated,
  setUsername,
}) => {
  const [showNavBar, setShowNavBar] = useState(false);
  const { darkMode, handleDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);
    setUsername(null);
    navigate("/");
  }

  return (
    <>
      <nav className="w-full px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center gap-6 sticky top-0 z-10 bg-[#007BFF] dark:bg-[#1976D2] shadow-md">
        <Link to="/" className="text-3xl font-extrabold text-white dark:text-white">
          DevScribe
        </Link>
        <ul className="flex items-center justify-end gap-8 text-white lg:flex-1 max-md:hidden dark:text-white text-lg">
          {isAuthenticated ? (
            <>
              <li><NavLink
                  to={`/profile/${username}`}
                  className={({ isActive }) => (isActive ? "text-[#E0E0E0] dark:text-[#F0F0F0] font-medium" : "hover:text-[#E0E0E0] dark:hover:text-[#F0F0F0]")}
                >
                  Hi, {username}
                </NavLink></li>
              <li onClick={logout} className="cursor-pointer hover:text-[#E0E0E0] dark:hover:text-[#F0F0F0]">
                Logout
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/signin"
                  className={({ isActive }) => (isActive ? "text-[#E0E0E0] dark:text-[#F0F0F0] font-medium" : "hover:text-[#E0E0E0] dark:hover:text-[#F0F0F0]")}
                >
                  Login
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) => (isActive ? "text-[#E0E0E0] dark:text-[#F0F0F0] font-medium" : "hover:text-[#E0E0E0] dark:hover:text-[#F0F0F0]")}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}

          <li className="font-semibold">
            <NavLink
              to="/create"
              className={({ isActive }) => (isActive ? "text-[#E0E0E0] dark:text-[#F0F0F0] font-medium" : "hover:text-[#E0E0E0] dark:hover:text-[#F0F0F0]")}
            >
              Create Post
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={handleDarkMode}
            className="text-white dark:text-white text-xl focus:outline-none hover:text-[#E0E0E0] dark:hover:text-[#F0F0F0]"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </button>
          <Menu
            className="text-2xl cursor-pointer hidden max-md:block text-white dark:text-white hover:text-[#E0E0E0] dark:hover:text-[#F0F0F0]"
            onClick={() => setShowNavBar((curr) => !curr)}
          />
        </div>
      </nav>

      {showNavBar && (
        <ResponsiveNavBar
          isAuthenticated={isAuthenticated}
          username={username}
          logout={logout}
          darkMode={darkMode}
          handleDarkMode={handleDarkMode}
        />
      )}
    </>
  );
};

export default NavBar;
