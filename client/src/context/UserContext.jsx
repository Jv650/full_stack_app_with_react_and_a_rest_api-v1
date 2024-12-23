import { createContext, useState } from "react";
import Cookies from "js-cookie";
import { api } from "../utils/apiHelper";

const UserContext = createContext(null);

export const UserProvider = (children) => {
  const cookie = Cookies.get("authenticatedUser");
  //ternary operator wil check if cookie exists
  //if cookie exists it will set the value with cookie
  //JSON.parse will parse the cookie into a string object
  //if cookie doenst exist it will be mull
  const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);

  const signIn = async (credentials) => {
    //fetch method
    const response = await api("/users", "GET", null, credentials);
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
      throw new Error();
    }
  };

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
