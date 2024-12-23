import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"; //import Link from react router

const CourseDetail = () => {
  const [course, setCourse] = useState([]);
  const { id } = useParams(); //get course id from the api

  //fetch /api/courses/:id from API
  useEffect(() => {
    fetch(`/api/courses/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch course");
        }
        return response.json(); //converts res to JSON
      })
      .then((data) => setCourse(data)) //update courses state
      .catch((error) => console.error("Error loading courses ", error));
  }, []); //run once when component loads

  return (
    <div className="actions--bar">
      <div className="wrap">
        <Link to={`/courses/${course.id}/update`}>
          <a className="button" href="update-course.html">
            Update Course
          </a>
        </Link>
        <a className="button" href="#">
          Delete Course
        </a>
        <Link to="/courses">
          <a className="button button-secondary" href="index.html">
            Return to List
          </a>
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
