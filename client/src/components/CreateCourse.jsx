import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Cookies from "js-cookie";
import { api } from "../utils/apiHelper";

const CreateCourse = () => {
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);
  const [course, setCourse] = useState({});

  // State for validation errors
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    other: [],
  });

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Update course state
    setCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
    // Reset validation error if editing title or description
    if (name === "title" || name === "description") {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    }
  };

  // // Handle form submission
  // const handleSubmit = () => {
  //   event.preventDefault();
  //   Cookies.get("authenticatedUser");
  //   credentials = JSON.parse(credentials);
  //   fetch(`http://localhost:5000/api/courses`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8",
  //     },
  //     body: JSON.stringify({
  //       title: "",
  //       description: "",
  //       estimatedTime: "",
  //       materialsNeeded: "",
  //     })
  //       .then((response) => response.json())
  //       .then((data) => console.log("Data sent:", data))
  //       .catch((error) => console.error("Error:", error)),
  //   });
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let credentials = Cookies.get("authenticatedUser");
      credentials = JSON.parse(credentials);
      if (!course.title || !course.description) {
        setErrors((prev) => ({
          ...prev,
          title: course.title ? "" : "Title is required",
          description: course.description ? "" : "Description is required",
        }));
        return;
      }
      const payload = {
        title: course.title,
        description: course.description,
        estimatedTime: course.estimatedTime || "",
        materialsNeeded: course.materialsNeeded || "",
        userId: credentials.id, //if i change to user id it works
      };

      let response = await api(`/courses`, "POST", payload, credentials);
      // else if (!response.ok) {
      //   throw new Error("Error creating course");
      // }
      // Reset form after successful submission
      // const newCourse = await response.json();
      // console.log(newCourse);
      // navigate(`/courses/${newCourse.id}`);
      // alert("Course created successfully!");
      if (response.ok) {
        const newCourse = await response.json(); // Get created course data
        console.log(newCourse);
        navigate(`/courses/${newCourse.id}`); // Redirect to the new course page
        alert("Course created successfully!");
      } else {
        // Handle API error
        const errorData = await response.json();
        console.error("Error creating course:", errorData);
        alert("Failed to create course. Please try again.");
      }
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
      <form onSubmit={handleSubmit}>
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
        <button className="button" type="submit">
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
