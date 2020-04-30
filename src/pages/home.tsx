import React, { useState, useEffect } from "react";
import db from "../config/fbconfig";
import { Blog } from "../datatype/blogtype";
import BlogSpinner from "../components/blogspinner";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HomeImage from "../components/homeimage";
import SideImage from "../components/sideimage";
import "../css/index.css";
const Home = () => {
  const [blog, setBlog] = useState<Blog[]>([]);
  const [error, setError] = useState();

  useEffect(() => {
    db.collection("blogdata")
      .orderBy("postedOn", "desc")
      .limit(5)
      .get()
      .then((snapshot) => {
        const b: any[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          b.push({ ...data, id: doc.id });
        });
        setBlog(b);
      })
      .catch((error) => {
        setError(error);
      });
    return () => {
      //setBlog([]);
    };
  }, []);

  if (!blog || blog?.length === 0) return <BlogSpinner />;

  if (error) return <div>Error..{error}</div>;

  return <DisplayBlog blog={blog} />;
};
function DisplayBlog({ blog }: { blog: Blog[] }) {
  return (
    <Container fluid={true}>
      <Row className="justify-content-md-center">
        <Col md={5} className="mainImageHeading">
          <HomeImage blog={blog[0]} />
        </Col>
        <Col md="auto">
          <Container fluid={true}>
            <Row>
              <Col md={6}>
                <SideImage blog={blog[1]} />
              </Col>
              <Col md={6}>
                <SideImage blog={blog[3]} />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <SideImage blog={blog[2]} />
              </Col>
              <Col md={6}>
                <SideImage blog={blog[4]} />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>

    // <div className="wrapper">
    //   {blog.map((b, index) =>
    //     index === 0 ? (
    //       <div className={`box box${index + 1}`}>
    //         <Figure.Caption>{b.blogTitle}</Figure.Caption>

    //         <img src={b.imgUrl} height="290px" width="440px" alt="" />
    //       </div>
    //     ) : (
    //       <div className={`box box${index + 1}`}>
    //         <Figure.Caption>{b.blogTitle}</Figure.Caption>

    //         <img src={b.imgUrl} height="175px" width="260px" alt="" />
    //       </div>
    //     )
    //   )}
    // </div>
  );
}
export default Home;
