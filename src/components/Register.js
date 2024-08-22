import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errName, setErrName] = useState("");
    const [errEmail, setErrEmail] = useState("");
    const [errPass, setErrPass] = useState("");
    const [count, setCount] = useState(0);

    const navigate = useNavigate();

    // Count number of Users in DB
    axios.get("http://localhost:9999/users")
        .then(res => setCount(res.data?.length))
        .catch(err => console.error(err));

    function handleRegister() {
        // Check Input
        let flag = true;
        // Check Name
        if (name.length == 0) {
            flag = false;
            setErrName("Name is required");
        } else {
            flag = true;
            setErrName("");
        }
        // Check Email
        if (email.length == 0) {
            flag = false;
            setErrEmail("Email is required");
        } else {
            flag = true;
            setErrEmail("");
        }
        // Check Password
        if (password.length == 0) {
            flag = false;
            setErrPass("Password is required");
        } else {
            flag = true;
            setErrPass("");
        }
        // Valid data on Form
        if (flag == true) {
            // Save into Users
            axios.post("http://localhost:9999/users", {
                userId: count+1,
                name: name,
                account: {
                    email: email,
                    password: password,
                    activeCode: "",
                    isActive: false
                },
                address: {
                    street: "",
                    city: "",
                    zipCode: 0
                }
            })
                .then(result => {
                    // Hiển thị thông báo và điều hướng về Login
                    alert("Registration success");
                    navigate("/auth/login");
                })
        }
    }

    return (
        <Row className="content">
            <Col xs={12}>
                <h3 style={{ textAlign: "center" }}>Register Form</h3>
                <Form style={{ margin: "0px auto", width: "50%" }}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={e => setName(e.target.value)}
                            placeholder="Please enter name" />
                        {
                            errName.length > 0 && <span style={{ color: "red" }}>{errName}</span>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control onChange={e => setEmail(e.target.value)}
                            placeholder="Please enter email" />
                        {
                            errEmail.length > 0 && <span style={{ color: "red" }}>{errEmail}</span>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password *</Form.Label>
                        <Form.Control type="password"
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Please enter password" />
                        {
                            errPass.length > 0 && <span style={{ color: "red" }}>{errPass}</span>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label></Form.Label>
                        <Button variant="primary"
                            onClick={() => handleRegister()}
                        >Register</Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    )
}