import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../../services/authentication";
import "./SignupPage.css";

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordError, setPasswordErrorState] = useState(false);
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email.includes("@")){
      setError(["Please enter a valid email address."])
      setPasswordErrorState(false);
      return;
    }

    //Regex (regular expression) for characters in JS
    //(?=.*[\d]) -> somewhere in the string there must be at least 1 number ([\d])
    //(?=.*[!@#$%^&*]) -> somewhere in the string there must be one of these special characters ([!@#$%^&*])
    //[\w!@#$%^&*]{6,16} -> allows letters, digits, underscores and symbols AND sets a length of 8 - 30. [\w] specifies all letters, numbers and underscores
    //?= 'lookaheads' or rules that must be in the string
    //more info "https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters#comment16155037_12090265"
    if (password.search(/^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,30}$/) === -1 ){
      setError([
        "Be at least 8 characters long",
        "Include a number",
        "Include a special character"
      ])
      setPasswordErrorState(true);
      return;
    }

    setError([]);

    try {
      await signup(email, password);
      setPasswordErrorState(false);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(["Signup failed. Please try again."]);
      setPasswordErrorState(false);
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
      <img src="/logo.png" alt="Acebook Logo" style={{ width: '200px', height: 'auto' }}/>
      <h2>Sign Up</h2>
      <p><i>Please enter your details below</i></p>
      <div className="signing-in">
        <form onSubmit={handleSubmit} className="signup-form">
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

        <br />
        <p></p>
        <input role="submit-button" id="submit" type="submit" value="Create Account" />
      </form>
    </div>
    </>
  );
}
