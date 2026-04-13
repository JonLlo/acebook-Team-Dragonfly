import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../../services/authentication";
import "./SignupPage.css";
import Navbar from "../../components/Navbar";

export function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userBiography, setUserBiography] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordError, setPasswordErrorState] = useState(false);
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    if (firstName.trim() === "") {
      setError(["Please enter a valid first name."]);
      setPasswordErrorState(false);
      return;
    }

    if (surname.trim() === "") {
      setError(["Please enter a valid surname."]);
      setPasswordErrorState(false);
      return;
    }

    if (!email.includes("@")) {
      setError(["Please enter a valid email address."]);
      setPasswordErrorState(false);
      return;
    }

    //Regex (regular expression) for characters in JS
    //(?=.*[\d]) -> somewhere in the string there must be at least 1 number ([\d])
    //(?=.*[!@#$%^&*]) -> somewhere in the string there must be one of these special characters ([!@#$%^&*])
    //[\w!@#$%^&*]{8,30} -> allows letters, digits, underscores and symbols AND sets a length of 8 - 30. [\w] specifies all letters, numbers and underscores
    //?= 'lookaheads' or rules that must be in the string
    //more info "https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters#comment16155037_12090265"
    if (
      password.search(/^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,30}$/) === -1
    ) {
      setError([
        "Be at least 8 characters long",
        "Include a number",
        "Include a special character",
      ]);
      setPasswordErrorState(true);
      return;
    }

    setError([]);

    try {
      await signup({
        firstName,
        surname,
        userImage,
        userBiography,
        email,
        password,
      });
      setPasswordErrorState(false);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(["Signup failed. Please try again."]);
      setPasswordErrorState(false);
    }
  }

  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }

  function handleSurnameChange(event) {
    setSurname(event.target.value);
  }

  function handleUserImageChange(event) {
    setUserImage(event.target.value);
  }

  function handleUserBiographyChange(event) {
    setUserBiography(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <>
    <div className="signup-page">
      <Navbar />
      <img
        src="/logo.png"
        alt="Acebook Logo"
        style={{ width: "200px", height: "auto" }}
      />
      <h2>Sign Up</h2>
      <p>
        <i>Please enter your details below</i>
      </p>
    </div>
      <div className="signing-in">
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="firstName">First name:</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="surname">Surname:</label>
            <input
              id="surname"
              type="text"
              value={surname}
              onChange={handleSurnameChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="userImage">Profile picture:</label>
            <input
              id="userImage"
              type="text"
              value={userImage}
              onChange={handleUserImageChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="userBiography">Tell us about yourself:</label>
            <input
              id="userBiography"
              type="text"
              value={userBiography}
              onChange={handleUserBiographyChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input
              placeholder="Password"
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="error-space">
            {!showPasswordError && error.length > 0 && (
              <p className="error-text">{error[0]}</p>
            )}

            {showPasswordError && (
              <div className="password-requirements">
                <p>Your password must:</p>
                <ul>
                  {error.map((message, i) => (
                    <li key={i}>{message}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <input
            role="submit-button"
            id="submit"
            type="submit"
            value="Create Account"
          />
        </form>
      </div>
    </>
  );
}
