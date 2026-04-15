import "./Navbar.css";
import LogoutButton from "./LogoutButton";
import { useLocation, Link } from "react-router-dom";

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="navbar">
      <div className="navbar-section navbar-left">
        <Link to="/posts">
          <img
            src="/small-logo.png"
            alt="Acebook Small Logo"
            className="logo-left"
          />
        </Link>
      </div>

      <div className="navbar-section navbar-center">
        {isLoggedIn && (
          <ul className="nav-links">
            <li>
              <Link to="/posts">Feed</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/posts">Notifications</Link>
            </li>
          </ul>
        )}
      </div>

      <div className="navbar-section navbar-right">
        {isLoggedIn && (
          <div className="logging-out">
            <LogoutButton />
          </div>
        )}

        {!isLoggedIn && (
          <div className="navbar-loggedout">
            {currentPath !== "/signup" && (
              <Link to="/signup" className="signup-btn">
                Sign Up
              </Link>
            )}

            {currentPath !== "/login" && (
              <Link to="/login" className="login-btn">
                Log in
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;