import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    function handleLogin(){
        // Passed check input
        // Find user by: email, password
        axios.get(`http://localhost:9999/users?account.email=${email}&account.password=${password}`)
            .then(res => {
                if(res.data?.length > 0){
                    if(res.data[0].account.isActive==false){
                        setErrMsg("This account not active");
                    }else{
                        // Save existUser into LocalStorage
                        localStorage.setItem("account", JSON.stringify(res.data[0]));
                        alert("Login success");
                        navigate("/");
                        window.location.reload();
                    }
                }else{
                    setErrMsg("This account not found");
                }
            })
    }
    
    return (
        <Row className="content">
            <Col xs={12}>
                <h3 style={{textAlign:"center"}}>Login Form</h3>
                <div style={{textAlign:"center"}}>
                    {
                        errMsg.length > 0 && <span style={{color:"red"}}>{errMsg}</span>
                    }
                </div>
                <Form style={{margin: "0px auto", width:"50%"}}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control onChange={e=>setEmail(e.target.value)}
                            placeholder="Please enter email"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password *</Form.Label>
                        <Form.Control type="password" 
                            onChange={e=>setPassword(e.target.value)}
                            placeholder="Please enter password"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label></Form.Label>
                        <Button variant="primary"
                            onClick={()=>handleLogin()}
                            >Login</Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    )
}