import { useRef, useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom"; //import Link from react router

const SignIn = () => {
  const { actions } = useContext(UserContext);
  //console.log(actions);
  // State
  const emailAddress = useRef(null);
  const password = useRef(null);

  const navigate = useNavigate();

  // Event Handlers
  const handleSubmit = (event) => {
    event.preventDefault();
    //actions.
    actions.signIn(emailAddress.current.value, password.current.value);
    navigate("/home");
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/home");
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            id="emailAddress"
            required
            type="text"
            ref={emailAddress}
            placeholder="Email Address"
          />
          <input
            id="password"
            required
            type="password"
            ref={password}
            placeholder="Password"
          />
          <button className="button" type="submit">
            Sign In
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
        <p>
          Don't have a user account? Click here to
          <Link to="/signup"> sign up</Link>!
        </p>
      </div>
    </main>
  );
};
export default SignIn;
