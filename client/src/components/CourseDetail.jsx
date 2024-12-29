import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; //import Link from react router
import { api } from "../utils/apiHelper";
import Cookies from "js-cookie";

const CourseDetail = () => {
  const [course, setCourse] = useState([{}]); //empty object bc its expecting props such as title, description, etc.
  const { id } = useParams(); //get course id from the api
  const navigate = useNavigate();

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

  //delete course function
  const handleDelete = async () => {
    try {
      var credentials = Cookies.get("authenticatedUser");
      credentials = JSON.parse(credentials);
      //const response = await api(`/courses/${id}`, "PUT", course, credentials);
      const response = await api(`/courses/${id}`, "DELETE", null, credentials);
      if (response.ok) {
        navigate("/");
      } else {
        throw new Error("Failed to delete the course");
      }
    } catch (error) {
      console.error("Error deleting the course", error);
    }
  };

  // function handleDelete(id) {
  //   api(`/courses/${id}`, {
  //     method: "DELETE",
  //   });
  // }

  return (
    <div className="actions--bar">
      <div className="wrap">
        <Link to={`/${id}/update`}>
          <a className="button">Update Course</a>
        </Link>
        <a
          className="button"
          onClick={handleDelete}
          /*EDIT onClick={"DELETE"}*/
        >
          Delete Course
        </a>
        <Link to="/">
          <a className="button button-secondary">Return to List</a>
        </Link>
      </div>

      <div className="wrap">
        <h2>{course.title}</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--course--title">Course</h3>
              <h4 className="course--name">
                <Markdown>{course.description}</Markdown>
              </h4>
              <p>By {course.authorName}</p>
            </div>
            <div>
              <h3 className="course--course--title">Estimated Time</h3>
              <p>
                <Markdown>{course.estimatedTime}</Markdown>
              </p>

              <h3 className="course--course--title">Materials Needed</h3>
              <ul className="course--course--list">
                <Markdown>{course.materialsNeeded}</Markdown>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseDetail;
