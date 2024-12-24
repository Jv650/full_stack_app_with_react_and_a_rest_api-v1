import { createContext, useState } from "react";
import Cookies from "js-cookie";
import { api } from "../utils/apiHelper";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const cookie = Cookies.get("authenticatedUser");
  //ternary operator wil check if cookie exists
  //if cookie exists it will set the value with cookie
  //JSON.parse will parse the cookie into a string object
  //if cookie doenst exist it will be mull
  const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);
  //sign in function
  const signIn = async (credentials) => {
    const encodedCredentials = btoa(
      `${credentials.username}:${credentials.password}`
    );

    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    };
    try {
      //fetch method
      const response = await fetch(
        "https://localhost:5000/api/users",
        fetchOptions
      );
      if (response.status === 200) {
        const user = await response.json();
        setAuthUser(user);
        //create cookie authenticateuser will be the name of the cookie
        //JSON.stringify will be store the stringified user object
        //expires will hold the expiration date, 1 means it will expire after1 day
        Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
        return user;
      } else if (response.status === 401) {
        //is server response w/ 401 that means it could not authenticate the user
        return null;
      } else {
        throw new Error("An unexpected error occurred during sign-in.");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      throw error;
    }
  };

  //sign out function
  const signOut = () => {
    setAuthUser(null);
    //to remove the cookies whenever usesr signsout and is refreshed
    Cookies.remove("authenticatedUser");
  };

  return (
    <UserContext.Provider
      value={{
        authUser,
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

export default UserContext;

// import { createContext, useState } from "react";

// const UserContext = createContext(null);

// export const UserProvider = (props) => {
//   const [user, setUser] = useState(null);

//   const signInUser = (username, password) => {
//     const newUser = {
//       username,
//       password,
//     };
//     setUser(newUser);
//   };

//   const signOutUser = () => {
//     setUser(null);
//   };

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         actions: {
//           signIn: signInUser,
//           signOut: signOutUser,
//         },
//       }}
//     >
//       {props.children}
//     </UserContext.Provider>
//   );
// };
// export default UserContext;
