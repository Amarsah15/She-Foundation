import { Link } from "react-router-dom";
import { LogOut, Trophy, User } from "lucide-react";
import ThemeToggle from "./ThemeToggle.jsx";
import Logout from "./Logout.jsx";
import { useAuthStore } from "../stores/useAuthStore.js";

const Nav = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="navbar bg-base-300 sticky top-0 z-50 shadow-md px-4 rounded-lg">
      {/* Logo */}
      <div className="navbar-start">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight text-primary hover:scale-110 transition-all duration-300"
        >
          She<span className="text-secondary">Foundation</span>
        </Link>
      </div>

      {/* Nav Links (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">
          <li>
            <Link
              to="/leaderboard"
              className="text-lg font-medium hover:scale-110 transition-all duration-200 rounded-full"
            >
              <Trophy className="w-5 h-5 text-warning" />
              Leaderboard
            </Link>
          </li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="navbar-end space-x-2">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar hover:scale-105 transition-transform"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-accent-content">
              <img src={authUser.profilePicture} alt="profile" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
          >
            <li>
              <Link
                to="/profile"
                className="mb-2 text-base font-semibold hover:bg-primary hover:text-white transition"
              >
                <User className="w-4 h-4" />
                My Profile
              </Link>
            </li>
            <li>
              <Logout className="flex items-center gap-2 font-medium hover:bg-error hover:text-white transition-colors">
                <LogOut className="w-4 h-4" />
                Logout
              </Logout>
            </li>
          </ul>
        </div>

        {/* Mobile Nav Dropdown */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-200 rounded-box w-52 space-y-2"
          >
            <li>
              <Link
                to="/leaderboard"
                className="text-base font-semibold hover:bg-primary hover:text-white transition"
              >
                Leaderboard
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="text-base font-semibold hover:bg-primary hover:text-white transition"
              >
                My Profile
              </Link>
            </li>
            <li>
              <Logout className="text-base font-semibold hover:bg-error hover:text-white transition">
                Logout
              </Logout>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
