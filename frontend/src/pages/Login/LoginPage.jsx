import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/authentication";
import "./LoginPage.css";
import Navbar from "../../components/Navbar";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState([]);


  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const token = await login(email, password);
      localStorage.setItem("token", token);
      navigate("/posts");
    } catch (err) {
      console.error(err);
      setError(["Email or password not recognised."]);
      navigate("/login");
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <>
      <div className="login">
        <Navbar />
        <img
          src="/logo.png"
          alt="Acebook Logo"
          style={{ width: "200px", height: "auto" }}
        />
        <h2>Log in</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="error-space">
            { error.length > 0 && (
              <p className="error-text">{error[0]}</p>
            )}
          </div>
          <input
            role="submit-button"
            id="submit"
            type="submit"
            value="Log in"
          />
        </form>
      </div>
    </>
  );
}
