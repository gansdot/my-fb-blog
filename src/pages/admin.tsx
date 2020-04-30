import React, { useState, useEffect, MouseEvent } from "react";
import { Status } from "../datatype/blogtype";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import BlogInput from "../components/bloginput";
import BlogEditor from "../components/blogeditor";
import Alert from "react-bootstrap/Alert";
import { storage } from "../config/fbconfig";
import db from "../config/fbconfig";
import ProgressBar from "react-bootstrap/ProgressBar";

const Admin = () => {
  const [show, setShow] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<Status>({
    style: "primary",
    message: "",
    status: "",
  });
  const [content, setContent] = useState("");
  const blogTitle = useFormInput("", "Title", true);
  const blogCategory = useFormInput("", "Summary", true);
  const author = useFormInput("", "Author", true);
  const image = useFormInput("", "Image", true);
  const slug = useFormInput("", "Tag", false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setId(0);

    return () => {};
  }, []);

  function handleSubmit(event: MouseEvent<HTMLButtonElement> | undefined) {
    if (
      image.value.length !== 0 &&
      blogTitle.value.length !== 0 &&
      author.value.length !== 0
    ) {
      setValidated(false);
      setShow(true);
      setMessage({
        style: "warning",
        variant: "warning",
        status: "being processed....",
        message: "please wait....",
      });

      fbPersist();
    } else {
      setValidated(true);
      event?.preventDefault();
      event?.stopPropagation();
    }
  }

  function onEditorChange(value: string) {
    setContent(value);
  }
  function fbPersist() {
    console.log(image.value);

    const uploadTask = storage
      .ref(`images/${image.value.name}`)
      .put(image.value);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(percent);
        console.log(progress);
      },
      (error) => {
        console.log("Upload Error " + error);
      },
      () => {
        storage
          .ref("images")
          .child(image.value.name)
          .getDownloadURL()
          .then((url) => {
            console.log("URL ==> " + url);

            db.collection("blogdata")
              .add({
                id,
                blogTitle: blogTitle.value,
                author: author.value,
                slug: slug.value,
                blogCategory: blogCategory.value,
                blogText: content,
                imgUrl: url,
                postedOn: new Date().toISOString(),
              })
              .then(function (docRef) {
                setMessage({
                  style: "success",
                  message: `successfully saved data. Ref id: ${docRef.id}`,
                  status: "Success",
                  variant: "success",
                });
                console.log("Document written with ID: ", docRef.id);
              })
              .catch(function (error) {
                console.error("Error adding document: ", error);
              });
          });
      }
    );
  }
  return (
    <>
      <h3 style={{ paddingLeft: "15px" }}>Blog Writing Administrator</h3>

      <Container className="p-3" fluid={true}>
        <Alert
          show={show}
          onClose={() => {
            setProgress(0);
            setShow(false);
          }}
          variant={message.style}
          dismissible
        >
          <Alert.Heading>Your blog {message.status}</Alert.Heading>
          <ProgressBar variant={message.variant} now={progress} />
          <p>{message.message}</p>
        </Alert>
        <Form noValidate validated={validated}>
          <BlogInput {...blogTitle} />

          <BlogInput {...blogCategory} />
          <BlogInput {...author} />

          <BlogInput {...image} />
          <BlogEditor onEditorChange={onEditorChange} />

          <Button
            disabled={show}
            className="btn btn-secondary btn-block"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              handleSubmit(e)
            }
          >
            Save Blog
          </Button>
        </Form>
      </Container>
    </>
  );
};

function useFormInput(initialValue: string, title: string, required: boolean) {
  const [value, setValue] = useState<any>(initialValue);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target !== null && e.target.files) {
      const image = e.target.files[0];
      setValue(() => image);
      console.log("Image value " + image.name);
    } else {
      setValue(e.target.value);
    }
  }
  return {
    title,
    value,
    required,
    handleChange,
  };
}

export default Admin;
