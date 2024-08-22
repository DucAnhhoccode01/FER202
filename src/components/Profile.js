import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile(){
    const navigate = useNavigate();

    const [selectedColumn, setSelectedColumn] = useState(false);
    const currAccount = JSON.parse(localStorage.getItem("account"));
    const [isEdit, setIsEdit] = useState(false);

    const userId = currAccount.userId;
    const [name, setName] = useState(currAccount.name);
    const [street, setStreet] = useState(currAccount.address.street);
    const [city, setCity] = useState(currAccount.address.city);
    const [zipCode, setZipCode] = useState(currAccount.address.zipCode);
    
    function handleSetEdit(){
        // update value: isEdit
        setIsEdit(true);
    }

    function handleSaveChange(e){
        // Ngăn chặn việc load trang khi dữ liệu trên form chưa hợp lệ
        e.preventDefault();
        // Done: CheckInput
        // Update to DB
        axios.patch(`http://localhost:9999/users/${currAccount.id}`, {
            name: name,
            address: {
                street: street,
                city: city,
                zipCode: zipCode
            }
        }).then(result => {
            alert("Update success");
            navigate("/auth/profile");
            window.location.reload();
        })
    }
    return (
        <Row>
            <Col md={3}>
                <ul>
                    <li>
                        <Link to={"/auth/profile"} onClick={()=>setSelectedColumn(false)}
                            >Profile</Link>
                    </li>
                    <li>
                        <Link to={"/auth/profile"} onClick={()=>setSelectedColumn(true)}>
                            Albums management
                        </Link>
                    </li>
                </ul>
            </Col>
            {
                selectedColumn==false ? (
                    <Col md={9}>
                        <h4>Profile information</h4>
                        <Form className="mb-3" onSubmit={(e) => handleSaveChange(e)}>
                            <Form.Group>
                                <Form.Label>UserId</Form.Label>
                                <Form.Control value={currAccount.userId} disabled/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control defaultValue={currAccount.name} disabled={!isEdit}
                                    onChange={e=>setName(e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control value={currAccount.account.email} disabled/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Street</Form.Label>
                                <Form.Control defaultValue={currAccount.address.street} disabled={!isEdit}
                                    onChange={e=>setStreet(e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>City</Form.Label>
                                <Form.Control defaultValue={currAccount.address.city} disabled={!isEdit}
                                    onChange={e=>setCity(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Zip-Code</Form.Label>
                                <Form.Control defaultValue={currAccount.address.zipCode} type="number" disabled={!isEdit}
                                    onChange={e=>setZipCode(e.target.value)}/>
                            </Form.Group>
                            {
                                isEdit==false ? (
                                    <Button onClick={()=>handleSetEdit()}>Edit</Button>
                                ) : (
                                    <Button type="submit">Save Change</Button>
                                )
                            }
                            
                        </Form>
                    </Col>
                ) : (
                    <Col md={9}>
                        Album
                    </Col>
                )
            }
            
        </Row>
    )
}