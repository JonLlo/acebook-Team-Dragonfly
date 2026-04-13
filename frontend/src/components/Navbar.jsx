import "./Navbar.css";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/small-logo.png" alt="Acebook Small Logo" className="logo-left"/>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <a href="/FeedPage">Feed</a>
          </li>
          <li>
            <a href="/ProfilePage">Profile</a>
          </li>
          <li>
            <a href="/FeedPage">Notifications</a>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <a href="/" className="logging-out">
          <LogoutButton />
        </a>
        <a href="/account" className="user-icon">
          <i className="fas fa-user"></i>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
