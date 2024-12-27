import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom"; //import Link from react router
import { api } from "../utils/apiHelper";

const UpdateCourse = () => {
  const { id } = useParams(); //get course id from the api
  const navigate = useNavigate();

  //state forcourse data
  const [course, setCourse] = useState({
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
  });

  //fetch /api/courses/:id from API
  useEffect(() => {
    api(`/courses/${id}`, "PUT", setCourse)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch course");
        }
        return response.json(); //converts res to JSON
      })
      .then((data) => setCourse(data)) //update courses state
      .catch((error) => console.error("Error loading courses ", error));
  }, [id]);

  //handle the input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  //handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    api(`/courses/${id}`, "PUT", course)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update course");
        }
        return response.json();
      })
      .then(() => navigate(`/courses/${id}`)) //redirect to the course detail page
      .catch((error) => console.error("Error updating course", error));
  };

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="main--flex">
          <div>
            <label id="courseTitle">Course Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={course.title}
              onChange={handleChange}
            />

            <p>
              By {course.firstName},{course.lastName}
            </p>

            <label id="courseDescription">Course Description</label>
            <textarea
              id="description"
              name="description"
              value={course.description}
              type="text"
              onChange={handleChange}
            ></textarea>
            <div>
              <label id="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={course.estimatedTime}
                onChange={handleChange}
              />

              <label id="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                type="text"
                value={course.materialsNeeded}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>
        <button className="button" type="submit">
          Update Course
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
