import { BrowserRouter, Route, Routes } from "react-router-dom";
//import UserContext from "./context/UserContext";

//App Components
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SignOut from "./components/SignOut";
//import UpdateCourse from "./components/UpdateCourse";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/home" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          {/*<Route path="/updatecourse" element={<UpdateCourse />} />*/}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
//{console.log(UserContext)}
