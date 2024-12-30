import { useState, useEffect, useContext } from "react";
import Markdown from "react-markdown";
import { UserContext } from "../context/UserContext";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; //import Link from react router
import { api } from "../utils/apiHelper";

const CourseDetail = () => {
  const [course, setCourse] = useState({}); //empty object bc its expecting props such as title, description, etc.
  const { id } = useParams(); //get course id from the api
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);

  //fetch /api/courses/:id from API
  useEffect(() => {
    api(`/courses/${id}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Error status: ${response.status}`);
        }
        return await response.json(); //converts res to JSON
      })
      .then((data) => setCourse(data)) //update courses state
      .catch((error) => console.error("Error loading courses ", error));
  }, [id]); //run once when component loads

  const handleDelete = async (id) => {
    try {
      if (!authUser) {
        throw new Error("You must be signed in to delete a course.");
      }

      const { id: userId, password } = authUser; //use userid and password from context

      //fetch the course data to check if mwtches owner
      const courseResponse = await api(`/courses/${id}`, "GET", null, {
        email: authUser.email,
        password,
      });

      if (!courseResponse.ok) {
        throw new Error("Failed to fetch course data.");
      }

      const courseData = await courseResponse.json();

      //check if the authenticated user owns the course
      if (courseData.userId !== userId) {
        throw new Error("You are not authorized to delete this course.");
      }

      //delete request
      const response = await api(`/courses/${id}`, "DELETE", null, {
        email: authUser.email,
        password,
      });

      if (response.ok) {
        navigate("/"); //nav to the home page on success
      } else {
        throw new Error("Failed to delete the course.");
      }
    } catch (error) {
      console.error("Error deleting the course:", error);
    }
  };

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          {authUser && authUser.id === course.id && (
            <>
              <Link className="button" to={`/courses/${id}/update`}>
                Update Course
              </Link>
              <button
                className="button"
                onClick={() => handleDelete(course.id)}
              >
                Delete Course
              </button>
            </>
          )}
          <Link to="/">
            <a className="button button-secondary">Return to List</a>
          </Link>
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <div className="main--flex">
          <div>
            <h3 className="course--detail--title">Course</h3>
            <h4 className="course--name">{course.title}</h4>
            <p>
              By {""}
              {course.user
                ? `${course.user.firstName} ${course.user.lastName}`
                : ""}
            </p>
            <Markdown>{course.description}</Markdown>
          </div>
          <div>
            <h3 className="course--detail--title">Estimated Time</h3>
            <p>
              <Markdown>{course.estimatedTime}</Markdown>
            </p>

            <h3 className="course--course--title">Materials Needed</h3>
            <ul className="course--course--list">
              <Markdown>{course.materialsNeeded}</Markdown>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CourseDetail;
