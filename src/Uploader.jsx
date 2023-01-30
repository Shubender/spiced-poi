import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";

export default function Uploader(props) {
    const [show, setShow] = useState(props.userPopup);
    const [selectedFile, setSelectedFile] = useState(null);
    const [color, setColor] = useState('');


    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    function checkInput(event) {
        const value = document.getElementById("validationTextarea").value;
        console.log("value: ", value);

        if (value.length < 10 || value.length > 140) {
            // event.target.classList.remove("is-valid");
            event.target.classList.add("is-invalid");
        } else {
            event.target.classList.remove("is-invalid");
            event.target.classList.add("is-valid");
        }
    }

    function handleSubmitUpload(event) {
        event.preventDefault();
        console.log("File uploaded");

        const formData = new FormData(event.target);
        formData.append("lat", props.userClick.lat);
        formData.append("lng", props.userClick.lng);
        formData.append("color", color);


        fetch("/api/upload", {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("upload file data:", data);
                // this.setState({ imgFromApp: data.userFile.imageurl });
                setShow(false);
                props.onPlaceUpload();
            })
            .catch((err) => {
                console.log("handleSubmitUpload error: ", err);
            });
    }

    function handleFileChange(event) {
        console.log("handleFileChange: ", event);
        setSelectedFile(event.target.files[0]);
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add new place</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmitUpload}>
                <Form.Group className="m-3 w-75">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Type your thought about this place"
                        required
                        name="description"
                        id="validationTextarea"
                        className="form-control"
                        onKeyUp={checkInput}
                    />
                    <Form.Text id="textLong" muted>
                        From 10 to 140 characters
                    </Form.Text>
                </Form.Group>
                <Form.Group className="m-3 w-75">
                    <Form.Label>Choose type of place</Form.Label>
                    <div>
                        {["radio"].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                                <Form.Check
                                    style={{ color: "blue" }}
                                    inline
                                    label="Fancy"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-1`}
                                    onChange={() => {
                                        setColor("blue");
                                    }}
                                />
                                <Form.Check
                                    style={{ color: "green" }}
                                    inline
                                    label="Useful"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-2`}
                                    onChange={() => {
                                        setColor("green");
                                    }}
                                />
                                <Form.Check
                                    style={{ color: "red" }}
                                    inline
                                    label="Broken"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-3`}
                                    onChange={() => {
                                        setColor("red");
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </Form.Group>
                <Form.Group className="m-3 w-75">
                    <Form.Label>Upload your pic here</Form.Label>
                    <Form.Control
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                    <Form.Text id="lngLatText" muted>
                        Longitude: {props.userClick.lng.toFixed(5)} | Latitude:{" "}
                        {props.userClick.lat.toFixed(5)}
                    </Form.Text>
                </Form.Group>

                <Button variant="outline-primary" type="submit" className="m-3">
                    Upload
                </Button>
            </Form>
        </Modal>
    );
}
