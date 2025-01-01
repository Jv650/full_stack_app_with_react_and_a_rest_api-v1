import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { api } from "../utils/apiHelper";

const UserSignUp = () => {
  //hooks need to be at top of component
  const { actions } = useContext(UserContext); //{actions}
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
      const response = await api("/users", "POST", user, null); //first arg is URL path, second arg is method, and lastly the data (user) tat will be included in the body
      if (response.status === 201) {
        // console.log(
        //   `${user.firstName} is successfully signed up and authenticated!`
        // );
        //await actions.signIn(user);
        //navigate("/authenticated");
        const userSignedIn = await actions.signIn(user); //actions
        if (userSignedIn) {
          navigate("/"); // navigate("/authenticated");
        }
      } else if (response.status === 400) {
        //will return errors in browser
        const data = await response.json();
        setErrors(data.errors);
        console.log(errors);
      } else {
        throw new Error("Network response failed " + response.status);
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
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>

        <div>
          {errors.length ? (
            <div>
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
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              ref={firstName}
            />
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" name="lastName" type="text" ref={lastName} />
            <label htmlFor="emailAddress">Email Address</label>
            <input
              id="emailAddress"
              name="emailAddress"
              type="email"
              ref={emailAddress}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              ref={password}
            />

            <button className="button" type="submit">
              Sign up
            </button>
            <button className="button button-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        </div>
        <p>
          Already have a user account? Click here to{" "}
          <Link to="/signin">sign in</Link>!
        </p>
      </div>
    </main>
  );
};
export default UserSignUp;
