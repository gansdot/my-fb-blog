import React from "react";
import "../css/index.css";
import { Blog } from "../datatype/blogtype";
const BlogCard = ({ blog }: { blog: Blog | undefined }) => {
  return (
    <div>
      <div className="sideBarHeading">{blog?.blogTitle.substring(0, 10)}</div>
      <img
        src={blog?.imgUrl}
        height="80px"
        width="120px"
        alt=""
        className="float-img"
      />
      <p className="sidebar-text">{blog?.blogCategory.substring(0, 30)}</p>
    </div>
  );
};

export default BlogCard;
