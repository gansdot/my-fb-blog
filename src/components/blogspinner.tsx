import React from "react";

const BlogSpinner = () => {
  return (
    <>
      <div className="d-flex align-items-center">
        <h2>Loading..</h2>
        <div
          className="spinner-border ml-auto"
          role="status"
          aria-hidden="true"
        ></div>
      </div>
    </>
  );
};

export default BlogSpinner;
