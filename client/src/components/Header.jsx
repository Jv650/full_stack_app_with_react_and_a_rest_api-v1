import { Link, useNavigate } from "react-router-dom";
import UserProvider from "../context/UserContext";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const Header = () => {
  const navigate = useNavigate();
  const { authUser, actions } = useContext(UserContext);

  const signOut = (event) => {
    event.preventDefault();
    actions.signOut();
    navigate("/home");
  };

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/home">Courses</Link>
        </h1>
        <nav>
          <ul className={authUser ? "header--signedout" : "header--signedout"}>
            {authUser ? (
              <ul className="header--signedin">
                <li>Welcome, {authUser.firstName}</li>
                <li>
                  <Link onClick={signOut} to="/signout">
                    Sign Out
                  </Link>
                </li>
              </ul>
            ) : (
              <>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/signin">Sign In</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
