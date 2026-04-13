import "./Navbar.css";
import LogoutButton from "./LogoutButton";

const Navbar = () => {

  const isLoggedIn = !!localStorage.getItem("token");
  const loginUrl = window.location.pathname;


  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/small-logo.png" alt="Acebook Small Logo" className="logo-left"/>
      </div>
      <div className="navbar-center">
        {isLoggedIn && (
          <ul className="nav-links">
            <li>
              <a href="/posts">Feed</a>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <a href="/posts">Notifications</a>
            </li>
          </ul>
        )} </div>
        <div className="navbar-right">
          {isLoggedIn && (
            <a href="/" className="logging-out">
              <LogoutButton />
            </a>
          )}
        </div>
        <div className="navbar-loggedout">
          {!isLoggedIn && ( // and on the login page, want to just show sign up button
            <a href="/signup" className="signup-btn">Sign Up</a>
          )}
          {!isLoggedIn && ( // and on the sign up page show the login button
            <a href="/login" className="login-btn">Log in</a>
          )}
        </div>
    </nav>
  );
};

export default Navbar;
