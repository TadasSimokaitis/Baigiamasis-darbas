import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    name: "",
    surname: "",
    email: "",
    age: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createPost = (e) => {
    e.preventDefault();

    axios
      .post("/create", post)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    navigate("posts");
  };

  return (
    <div style={{ textAlign: "center", width: "90%", margin: "auto auto" }}>
      <h1>Register User</h1>
      <Form>
        <Form.Group>
          <Form.Control
            name="name"
            value={post.name}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
            placeholder="name"
          />
          <Form.Control
            onChange={handleChange}
            name="surname"
            value={post.surname}
            style={{ marginBottom: "1rem" }}
            placeholder="surname"
          />
          <Form.Control
            onChange={handleChange}
            name="email"
            type="email"
            value={post.email}
            style={{ marginBottom: "1rem" }}
            placeholder="email"
          />
          <Form.Control
            onChange={handleChange}
            name="age"
            value={post.age}
            style={{ marginBottom: "1rem" }}
            placeholder="age"
          />
        </Form.Group>
        <Button
          onClick={createPost}
          variant="outline-success"
          style={{ width: "100%", marginBottom: "1rem" }}
        >
          Create User
        </Button>
      </Form>
      <Button
        onClick={() => navigate("posts")}
        variant="outline-success"
        style={{ width: "100%" }}
      >
        ALL Users
      </Button>
    </div>
  );
}

export default CreateUser;
