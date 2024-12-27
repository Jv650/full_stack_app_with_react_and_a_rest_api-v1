import { Link } from "react-router-dom"; //import Link from react router
import { useState, useEffect } from "react";
import { api } from "../utils/apiHelper";

const Courses = () => {
  const [courses, setCourses] = useState([]); //state to store courses

  //fetch courses from API
  useEffect(() => {
    api("/courses", "GET", null)
      // .then((response) => {
      //   if (!response.ok) {
      //     throw new Error(`Error status: ${response.status}`);
      //   }
      //   return response.json(); //converts res to JSON
      // })
      .then((data) => setCourses(data)) //update courses state
      .catch((error) => console.error("Error loading courses ", error));
  }, []); //run once when component loads

  //render component
  return (
    <div className="wrap main--grid">
      {courses.map((course) => (
        <div
          key={course.id}
          className="course--module course--link"
          href="course-detail.html"
        >
          <Link to={`/courses/${course.id}`}>
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
          </Link>
        </div>
      ))}

      <div
        className="course--module course--add--module"
        href="create-course.html"
      >
        <Link to="/courses/create">
          <span className="course--add--title"> New Course</span>
        </Link>
      </div>
    </div>
  );
};

export default Courses;
