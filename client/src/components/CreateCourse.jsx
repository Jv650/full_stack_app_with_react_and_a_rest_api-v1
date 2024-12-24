import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
  });

  //handle form input changes
  const handleChange = (event) => {
    setCourse({ ...course, [event.target.title]: event.target.value });
  };

  //handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/courses", "POST", course, null);

      if (!response.ok) {
        throw new Error("Error creating course");
      }
      //reset form after successful submission
      setCourse({
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
      });
      alert("Course created successfully!");
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const preventDef = (event) => {
    event.preventDefault();
    navigate("/home");
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
        {" "}
        onSubmit = {handleSubmit}
        <div className="main--flex">
          <div>
            <label id="title">Course Title</label>
            <input
              id="title"
              name="title"
              ref={course.title}
              value={course.title}
              onChange={handleChange}
            />

            <p>
              By{user.firstName}
              {user.lastName}
            </p>

            <label id="description">Course Description</label>
            <textarea
              id="description"
              name="description"
              ref={course.description}
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
              ref={course.estimatedTime}
              value={course.estimatedTime}
              onChange={handleChange}
            />

            <label id="materialsNeeded">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              ref={course.materialsNeeded}
              value={course.materialsNeeded}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <button className="button" type="submit">
          Create Course
        </button>
        <button
          className="button button-secondary"
          onClick={preventDef}
          to="/home"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
export default CreateCourse;
