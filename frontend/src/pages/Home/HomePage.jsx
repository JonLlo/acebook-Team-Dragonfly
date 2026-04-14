import { Link } from "react-router-dom";

import "./HomePage.css";

export function HomePage() {
  return (
    <>
    <div className="home">

      <img src="/logo.png" alt="Acebook Logo" style={{ width: '200px', height: 'auto' }}/>
      <br />
      <div className="home-links">
        <Link to="/signup" className="button-signUp">Sign Up</Link>
        <p></p>
        <Link to="/login" className="button-login">Log In</Link>
    </div>
    </div>
    </>
  );
}
