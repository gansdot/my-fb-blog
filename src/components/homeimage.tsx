import React from "react";
import Figure from "react-bootstrap/Figure";
import { Blog } from "../datatype/blogtype";

const HomeImage = ({ blog }: { blog: Blog }) => {
  return (
    <Figure>
      <Figure.Caption>{blog?.blogTitle}</Figure.Caption>

      <Figure.Image
        width={900}
        height={550}
        alt="220x145"
        className="img-fluid"
        src={blog?.imgUrl}
      />
    </Figure>
  );
};

export default HomeImage;
