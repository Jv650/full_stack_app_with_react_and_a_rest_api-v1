import { useRef, useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom"; //import Link from react router

const UserSignIn = () => {
  const { actions } = useContext(UserContext); //}{actions}
  //console.log(actions);
  const navigate = useNavigate();
  // State
  const emailAddress = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

  // Event Handlers
  const handleSubmit = async (event) => {
    event.preventDefault();
    let from = "/authenticated";
    const credentials = {
      emailAddress: emailAddress.current.value,
      password: password.current.value,
    };
    try {
      const user = await actions.signIn(credentials);
      if (user) {
        navigate(from);
      } else {
        setErrors(["Sign-in was unsuccessful"]);
      }
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/home");
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        {/* <ErrorsDisplay errors={errors} />*/}
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
export default UserSignIn;
