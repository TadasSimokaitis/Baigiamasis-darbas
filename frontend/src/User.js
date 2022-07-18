import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Table from 'react-bootstrap/Table';

function User() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updatedPost, setUpdatedPost] = useState({
    id: "",
    name: "",
    surname: "",
    email: "",
    age: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get("/posts")
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);


  const deletePost = (id) => {
    console.log(id);

    axios
      .delete(`/delete/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
       
    window.location.reload();
  };

  const updatePost = (id, name, surname, email, age) => {
    setUpdatedPost((prev) => {
      return {
        ...prev,
        id: id,
        name: name,
        surname: surname,
        email: email,
        age: age
      };
    });
    handleShow();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const saveUpdatedPost = () => {
    console.log(updatedPost);

    axios
      .put(`/update/${updatedPost.id}`, updatedPost)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    
    handleClose();
    window.location.reload();
  };

  return (
    <div style={{ width: "90%", margin: "auto auto", textAlign: "center" }}>
      <h1>Users List</h1>
      <Button
        variant="outline-dark"
        style={{ width: "100%", marginBottom: "1rem" }}
        onClick={() => navigate(-1)}
      >
        BACK
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            placeholder="name"
            name="name"
            value={updatedPost.name ? updatedPost.name : ""}
            style={{ marginBottom: "1rem" }}
            onChange={handleChange}
          />
          <Form.Control
            placeholder="surname"
            name="surname"
            onChange={handleChange}
            value={updatedPost.surname ? updatedPost.surname : ""}
          />
          <Form.Control
            placeholder="email"
            name="email"
            onChange={handleChange}
            value={updatedPost.email ? updatedPost.email : ""}
          />
          <Form.Control
            placeholder="age"
            name="age"
            onChange={handleChange}
            value={updatedPost.age ? updatedPost.age : ""}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={saveUpdatedPost}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {posts ? (
        <Table striped bordered hover size="sm">
          <thead >
            <tr>
              <th>Name</th>
              <th>Surname </th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
              <th>Actions</th>
            </tr>
          </thead>
          {posts.map((post) => {
            return (

              <tbody key={post._id}>
                <tr>
                  <td>{post.name}</td>
                  <td>{post.surname}</td>
                  <td>{post.email}</td>
                  <td>{post.age}</td>
                  <td><Button
                    variant="outline-info"
                    onClick={() =>
                      updatePost(post._id, post.name, post.surname, post.email, post.age)
                    }

                  >
                    UPDATE
                  </Button></td>
                  <td><Button
                    onClick={() => deletePost(post._id)}
                    variant="outline-danger"
                  >
                    DELETE
                  </Button></td>
                </tr>
              </tbody>

            );
          })}
        </Table>

      ) : (
        ""
      )}
    </div>
  );
}

export default User;
