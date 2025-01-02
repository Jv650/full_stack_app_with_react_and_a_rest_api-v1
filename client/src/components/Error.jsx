//import React from 'react';
import PropTypes from "prop-types";

const ErrorsDisplay = (props) => {
  const errors = props.errors;
  if (errors.length) {
    return (
      <div className="validation--errors">
        <h3>Validation Errors</h3>
        <ul>
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }
};
//will list out all errors passed into array
export default ErrorsDisplay;

ErrorsDisplay.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.any).isRequired,
};
