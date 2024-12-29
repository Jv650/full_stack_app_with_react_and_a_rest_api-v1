import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import { api } from "../utils/apiHelper";

const CreateCourse = () => {
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);
  const [course, setCourse] = useState({
    userId: authUser.id,
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
  });

  //handle form input changes
  const handleChange = (event) => {
    setCourse({ ...course, [event.target.name]: event.target.value });
  };

  //handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api("/courses", "POST");

      if (!response.ok) {
        throw new Error("Error creating course");
      }
      //reset form after successful submission
      const newCourse = await response.json();
      navigate(`/courses/${newCourse.id}`);
      alert("Course created successfully!");
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const preventDef = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="wrap">
      <h2>Create Course</h2>
      <div className="validation--errors">
        <h3>Validation Errors</h3>
        <ul>
          <li>Please provide a value for "Title"</li>
          <li>Please provide a value for "Description"</li>
        </ul>
      </div>
      <form>
        <div className="main--flex">
          <div>
            <label id="title">Course Title</label>
            <input
              id="title"
              name="title"
              value={course.title}
              onChange={handleChange}
            />

            {/* <p>By</p> edit */}

            <label id="description">Course Description</label>
            <textarea
              id="description"
              name="description"
              value={course.description}
              onChange={handleChange}
            ></textarea>
          </div>
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
              value={course.materialsNeeded}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <button className="button" type="submit" onSubmit={handleSubmit}>
          Create Course
        </button>
        <button className="button button-secondary" onClick={preventDef} to="/">
          Cancel
        </button>
      </form>
    </div>
  );
};
export default CreateCourse;
