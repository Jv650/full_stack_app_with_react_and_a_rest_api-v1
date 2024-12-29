import { useRef, useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { api } from "../utils/apiHelper";
import { useNavigate, Link, useLocation } from "react-router-dom"; //import Link from react router

const UserSignIn = () => {
  const { actions } = useContext(UserContext); //}{actions}
  //console.log(actions);
  const navigate = useNavigate();
  const location = useLocation();
  // State
  const emailAddress = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

  // Event Handlers
  const handleSubmit = async (event) => {
    event.preventDefault();
    let from = "/"; //default redirection
    if (location.state) {
      from = location.state.from;
    }
    console.log("logging:", from);
    const credentials = {
      emailAddress: emailAddress.current.value,
      password: password.current.value,
    };

    try {
      //const user = await api("/users", "GET", null, credentials);
      console.log("from sign in", credentials);
      const user = await actions.signIn(credentials);
      if (user) {
        console.log(user);
        navigate(from);
      } else {
        setErrors(["Sign-in was unsuccessful"]);
      }
    } catch (error) {
      console.error(error);
      setErrors(["Error occurred during sign-in"]);
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        {errors.length > 0 && (
          <div className="errors">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
            {/* <ErrorsDisplay errors={errors} /> */}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            id="emailAddress"
            required
            type="email"
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

// const UserSignIn = () => {
//   const { actions } = useContext(UserContext); //}{actions}
//   //console.log(actions);
//   const navigate = useNavigate();
//   // State
//   const emailAddress = useRef(null);
//   const password = useRef(null);
//   const [errors, setErrors] = useState([]);

//   // Event Handlers
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     let from = "/authenticated";
//     const credentials = {
//       emailAddress: emailAddress.current.value,
//       password: password.current.value,
//     };
//     try {
//       const user = await actions.signIn(credentials);
//       if (user) {
//         navigate(from);
//       } else {
//         setErrors(["Sign-in was unsuccessful"]);
//       }
//     } catch (error) {
//       console.log(error);
//       navigate("/error");
//     }
//   };

//   const handleCancel = (event) => {
//     event.preventDefault();
//     navigate("/");
//   };

//   return (
//     <main>
//       <div className="form--centered">
//         <h2>Sign In</h2>
//         {errors.length > 0 && (
//           <div className="errors">
//             {errors.map((error, index) => (
//               <p key={index}>{error}</p>
//             ))}
//             {/* <ErrorsDisplay errors={errors} /> */}
//           </div>
//         )}
//         <form onSubmit={handleSubmit}>
//           <input
//             id="emailAddress"
//             required
//             type="email"
//             ref={emailAddress}
//             placeholder="Email Address"
//           />
//           <input
//             id="password"
//             required
//             type="password"
//             ref={password}
//             placeholder="Password"
//           />
//           <button className="button" type="submit">
//             Sign In
//           </button>
//           <button className="button button-secondary" onClick={handleCancel}>
//             Cancel
//           </button>
//         </form>
//         <p>
//           Don't have a user account? Click here to
//           <Link to="/signup"> sign up</Link>!
//         </p>
//       </div>
//     </main>
//   );
// };
