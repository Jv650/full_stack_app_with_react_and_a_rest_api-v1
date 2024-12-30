import { Route, Routes } from "react-router-dom";
//import UserContext from "./context/UserContext";

//App Components
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import { UserContext, UserProvider } from "./context/UserContext";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import PrivateRoute from "./components/PrivateRoute";
import Authenticated from "./components/Autheticated";

function App() {
  return (
    <UserProvider>
      <div>
        {console.log(UserContext)}
        <Header />
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/signout" element={<UserSignOut />} />
          <Route element={<PrivateRoute />}>
            <Route path="authenticated" element={<Authenticated />} />
            <Route path="/courses/:id/update" element={<UpdateCourse />} />
            <Route path="/courses/create" element={<CreateCourse />} />
          </Route>
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
