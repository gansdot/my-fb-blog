import React, { useState, useEffect, FC } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import db from "../config/fbconfig";
import { Blog, PostProps } from "../datatype/blogtype";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Avatar from "react-avatar";
import BlogSpinner from "../components/blogspinner";
import firebase from "firebase";
import Image from "react-bootstrap/Image";
interface IPostsProps extends RouteComponentProps<{ id: string }> {}

const Posts: React.FC<IPostsProps> = ({ history, location, match }) => {
  const [blog, setBlog] = useState<Blog[]>([]);
  const [error, setError] = useState();

  useEffect(() => {
    db.collection("blogdata")
      .orderBy("postedOn", "desc")
      .limit(6)
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
    return () => {};
  }, []);

  if (!blog || blog?.length === 0) return <BlogSpinner />;

  if (error) return <div>Error..{error}</div>;

  return <DisplayPost id={match.params.id} blog={blog} />;
};

const DisplayPost: FC<PostProps> = ({ id, blog }) => {
  function createMarkup(value: string) {
    return { __html: value };
  }
  let sb = id !== "1" ? blog?.filter((b) => b.id === id)[0] : blog?.[0];
  return (
    <Container>
      <Row>
        <Col sm={8}>
          <Row className="blogheading">
            <span>{sb?.blogTitle.substring(0, 50)}</span>
          </Row>
          <Row>
            <div style={{ textAlign: "right", margin: "8px 2px" }}>
              <Avatar
                facebookId={firebase.auth().currentUser?.providerData[0]?.uid}
                size="51"
                round={true}
                alt="sign out"
              />
            </div>
            <Col sm={10}>
              <Row>
                <div className="blogBy">by {sb?.author}</div>
              </Row>
              <Row>
                <div className="bydate">{sb?.postedOn}</div>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col sm={4}>
          <Row>
            <div style={{ height: "60px" }}></div>
          </Row>
          <Row>
            <div
              style={{
                paddingLeft: "20px",
                width: "73%",
                paddingBottom: "20px",
              }}
            >
              <span className="d-block pl-5 pr-5 bg-dark text-white">
                More from <br></br> CodeGans
              </span>
            </div>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          <Row>
            <div>
              <img
                src={sb?.imgUrl}
                className="img-fluid"
                width="600px"
                height="390px"
                alt="img1"
              />
            </div>
          </Row>
          <Row>
            <div
              style={{
                width: "96%",
                height: 150,
                marginTop: 10,
              }}
            >
              <div
                dangerouslySetInnerHTML={createMarkup(
                  sb?.blogText ? sb.blogText : ""
                )}
              />
            </div>
          </Row>
        </Col>
        <Col sm={4}>
          {blog?.map((b, index) => (
            <Link
              to={`/posts/${b.id}`}
              key={index}
              style={{ textDecoration: "none" }}
            >
              <Image
                src={b.imgUrl}
                width="120px"
                height="90"
                style={{ margin: "3px", padding: "3px" }}
              />
            </Link>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Posts;
