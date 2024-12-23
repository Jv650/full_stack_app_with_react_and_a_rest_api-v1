import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import UserContext from "../context/UserContext";
import { api } from "../utils/apiHelper";

const SignUp = () => {
  //hooks need to be at top of component
  const { actions } = useContext(UserContext);
  const navigate = useNavigate();

  // State
  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

  // event handlers
  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      emailAddress: emailAddress.current.value,
      password: password.current.value,
    };

    try {
      const response = await api("/users", "POST", user); //first arg is URL path, second arg is method, and lastly the data (user) tat will be included in the body
      if (response.status === 201) {
        console.log(
          `${user.firstName} is successfully signed up and authenticated!`
        );
        await //actions.
        actions.signIn(user);
        navigate("/authenticated");
      } else if (response.status === 400) {
        //will return errors in browser
        const data = await response.json();
        setErrors(data.errors);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="form--centered">
      <h2>Sign Up</h2>

      <div>
        {errors.length ? (
          <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul>
                {errors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
        <form onSubmit={handleSubmit}>
          <label id="firstName">First Name</label>
          <input name="firstName" type="text" ref={firstName} />
          <label id="lastName">Last Name</label>
          <input name="lastName" type="text" ref={lastName} />
          <label id="emailAddress">Email Address</label>
          <input name="emailAddress" type="text" ref={emailAddress} />
          <label id="password">Password</label>
          <input name="password" type="password" ref={password} />
          <div className="pad-bottom">
            <button className="button" type="submit">
              Sign up
            </button>
            <button className="button button-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <p>
        Already have a user account? <Link to="/signin">Click here</Link> to
        sign in!
      </p>
    </div>
  );
};
export default SignUp;
