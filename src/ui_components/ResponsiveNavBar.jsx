import { NavLink } from 'react-router-dom'
import { Sun, Moon } from "lucide-react";

const ResponsiveNavBar = ({isAuthenticated, username, logout, darkMode, handleDarkMode}) => {
  return (
    <nav className="bg-card dark:bg-background shadow-lg fixed inset-x-0 top-16 z-20 md:hidden py-4">
    <ul className="flex flex-col items-center justify-center gap-4 text-foreground dark:text-muted-foreground">

   
    {isAuthenticated ? (
            <>
              <li className="text-lg font-semibold">Hi, {username}</li>
              <li onClick={logout} className="cursor-pointer text-lg font-medium hover:text-primary transition-colors">Logout</li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/signin"
                  className={({ isActive }) => (isActive ? "text-primary font-semibold text-lg transition-colors" : "text-lg font-medium hover:text-primary transition-colors")}
                >
                  Login
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) => (isActive ? "text-primary font-semibold text-lg transition-colors" : "text-lg font-medium hover:text-primary transition-colors")}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}

          <li className="font-semibold">
            <NavLink
              to="/create"
              className={({ isActive }) => (isActive ? "text-primary font-semibold text-lg transition-colors" : "text-lg font-medium hover:text-primary transition-colors")}
            >
              Create Post
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleDarkMode}
              className="text-foreground dark:text-primary-foreground text-xl focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
          </li>

     


    </ul>
  </nav>
  )
}

export default ResponsiveNavBar
