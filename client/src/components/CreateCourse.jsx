import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { api } from "../utils/apiHelper";

const CreateCourse = () => {
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);
  const [course, setCourse] = useState({
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    userId: authUser?.id || "", //if i change to user id it works
  });

  useEffect(() => {
    if (authUser?.id) {
      setCourse((prevCourse) => ({ ...prevCourse, userId: authUser.id }));
    }
  }, [authUser]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!course.title || !course.description) {
        setErrors((prev) => ({
          ...prev,
          title: !course.title ? "Title is required" : false,
          description: !course.description ? "Description is required" : false,
        }));
        return;
      }
      const payload = {
        title: course.title,
        description: course.description,
        estimatedTime: course.estimatedTime || "",
        materialsNeeded: course.materialsNeeded || "",
        userId: authUser.id, //if i change to user id it works
      };
      console.log("payload is:", payload);

      // const credentials = {
      //   userId: authUser.id,
      //   emailAddress: authUser.emailAddress, //emailAdrress:
      //   password: authUser.password,
      // };
      // console.log("credentials are: ", credentials);

      const response = await api(`/courses`, "POST", payload, authUser);

      if (response.status === 201) {
        // const newCourse = await response.json(); // Get created course data
        // console.log("newcourse data:", newCourse);
        // console.log("Course created successfully!", response);
        navigate("/"); // Redirect to the new course page
      } else {
        const errorData = await response.json();
        console.error("Error creating course:", errorData);
        setErrors((prev) => ({ ...prev, other: errorData.errors || [] }));
        console.error("Error creating course: ", response);
      }
    } catch (error) {
      console.error("An error occurred: ", error);
    }
    console.log("current auth user:", authUser);
  };
  // else if (!response.ok) {
  //   throw new Error("Error creating course");
  // }
  // Reset form after successful submission
  // const newCourse = await response.json();
  // console.log(newCourse);
  // navigate(`/courses/${newCourse.id}`);
  // alert("Course created successfully!");
  //     if (response.ok) {
  //       const newCourse = await response.json(); // Get created course data
  //       console.log(newCourse);
  //       navigate(`/courses/${newCourse.id}`); // Redirect to the new course page
  //       alert("Course created successfully!");
  //     } else {
  //       // Handle API error
  //       const errorData = await response.json();
  //       console.error("Error creating course:", errorData);
  //       alert("Failed to create course. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error creating course:", error);
  //   }
  // };

  const preventDef = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        {(errors.title || errors.description || errors.other.length > 0) && (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.title && <li>Please provide a value for "Title"</li>}
              {errors.description && (
                <li>Please provide a value for "Description"</li>
              )}
              {errors.other.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="title"
                type="text"
                value={course.title}
                onChange={handleChange}
              />

              <p>
                By {authUser.firstName} {authUser.lastName}
              </p>

              <label id="description">Course Description</label>
              <textarea
                id="description"
                name="description"
                value={course.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={course.estimatedTime}
                onChange={handleChange}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
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
          <button
            className="button button-secondary"
            onClick={preventDef}
            to="/"
          >
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};
export default CreateCourse;
