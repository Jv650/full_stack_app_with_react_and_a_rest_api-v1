import CourseDetail from "./CourseDetail";

const UpdateCourse = () => {
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
              ref={course.title}
              value={course.title}
            />

            <p>
              By {firstName} {lastName}
            </p>

            <label id="courseDescription">Course Description</label>
            <textarea
              id="description"
              name="description"
              ref={course.description}
              value={course.description}
            ></textarea>
            <div>
              <label id="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                ref={course.estimatedTime}
                value={course.estimatedTime}
              />

              <label id="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                ref={course.materialsNeeded}
                value={course.materialsNeeded}
              ></textarea>
            </div>
          </div>
        </div>
        <button className="button" type="submit">
          Update Course
        </button>
        <button
          className="button button-secondary"
          onclick="event.preventDefault(); location.href='index.html';"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
