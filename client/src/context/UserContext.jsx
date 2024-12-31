import { createContext, useState } from "react";
import Cookies from "js-cookie";
import { api } from "../utils/apiHelper";
import PropTypes from "prop-types";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // Initialize state with data from cookies (non-sensitive data only)
  const cookie = Cookies.get("authenticatedUser");
  const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);
  const [errors, setErrors] = useState(null);

  // Sign-in function
  const signIn = async (credentials) => {
    try {
      const response = await api("/users", "GET", null, credentials);
      if (response.status === 200) {
        const user = await response.json();
        setAuthUser({ ...user, password: credentials.password }); // Store password in state
        // Save non-sensitive data in a cookie
        Cookies.set(
          "authenticatedUser",
          JSON.stringify({ ...user, password: credentials.password }),
          { expires: 1 }
        );
        setErrors(null);
        return user;
      } else if (response.status === 401) {
        setErrors(["Authentication failed, please check your credentials."]);
        return null;
      } else {
        throw new Error("An unexpected error occurred during sign-in.");
      }
    } catch (error) {
      setErrors([error.message || "An error occurred while signing in."]);
      throw error;
    }
  };

  // Sign-out function
  const signOut = () => {
    setAuthUser(null); // Clear state
    Cookies.remove("authenticatedUser"); // Remove cookie
  };

  return (
    <UserContext.Provider
      value={{
        authUser,
        errors,
        actions: {
          signIn,
          signOut,
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Validate children prop
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
