import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../utils/apiHelper";
import ErrorsDisplay from "./Error";
import { UserContext } from "../context/UserContext";

const UpdateCourse = () => {
  const { id } = useParams(); //get course id from the api
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);
  //state forcourse data
  const [course, setCourse] = useState({
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    other: [],
  });

  //fetch /api/courses/:id from API
  useEffect(() => {
    api(`/courses/${id}`, "GET", setCourse)
      .then((response) => {
        if (response.status === 400 || response.status == 401) {
          const data = response.json();
          setErrors(data || []);
        }
        if (!response.ok) {
          throw new Error("Failed to fetch course");
        }
        //console.log(response.json());
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
    // var credentials = Cookies.get("authenticatedUser");
    // credentials = JSON.parse(credentials);
    //console.log(credentials);
    //console.log(id);
    api(`/courses/${id}`, "PUT", course, authUser)
      .then(async (response) => {
        // console.log(response);
        // console.log(response.status);
        if (response.status === 401) {
          const data = await response.json();
          //console.log(data);
          setErrors(["You are unathorized to update this course."]);
          throw { errors: data.errors, status: response.status };
        } else if (response.status === 400) {
          const data = await response.json();
          //console.log(data);
          setErrors(data.errors || []);
          throw { errors: data.errors, status: response.status };
        } else if (!response.ok) {
          throw new Error("Failed to update course");
        }
      })
      .then(() => navigate(`/courses/${id}`)) //redirect to the course detail page
      .catch((error) => console.error("Error updating course", error));
  };

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      <>{errors.length > 0 ? <ErrorsDisplay errors={errors} /> : null}</>

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

            <label htmlFor="courseDescription">Course Description</label>
            <textarea
              id="courseDescription"
              name="description"
              value={course.description}
              type="text"
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
              type="text"
              value={course.materialsNeeded}
              onChange={handleChange}
            ></textarea>
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
