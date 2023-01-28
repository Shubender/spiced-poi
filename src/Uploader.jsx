import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";

export default function Uploader(props) {
    const [show, setShow] = useState(props.userPopup);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={props.handleSubmitUpload}>
                <Form.Group controlId="formFile" className="m-3 w-75">
                    <Form.Label>Upload your pic here:</Form.Label>
                    <Form.Control
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={props.handleFileChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="m-3">
                    Upload
                </Button>
            </Form>
        </Modal>
    );
}
