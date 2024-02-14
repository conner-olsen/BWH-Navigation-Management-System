import NavBar from "../../components/NavBar.tsx";
import React, { useState } from 'react';
import axios from "axios";
import {Input} from "../../components/ui/input.tsx";
import {Col, Container, Row} from "react-bootstrap";
import {Label} from "../../components/ui/label.tsx";
import Form from "react-bootstrap/Form";
import {Button} from "../../components/ui/button.tsx";
import LocationDropdown from "../../components/LocationDropdown.tsx";

const CleaningServiceRequest: React.FC = () => {

    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }



    const [formData, setFormData] = useState({
        id: 0,
        nodeID: '',
        patientName: '',
        type: '',
        priority: '',
        status: 'UnAssigned',
        employeeUser: 'none'
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setFormData({
            id: getRandomInt(1000000),
            nodeID: '',
            patientName: '',
            type: '',
            priority: '',
            status: '',
            employeeUser: ''
        });
        try {
            const response = await axios.post("/api/", JSON.stringify(formData), {
                headers: {
                    "Content-Type": 'application/json'
                }
            });

            if (response.status === 200) {
                console.log('Data sent successfully');
            } else {
                console.error('Error sending data');
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };



    return (
        <div>
            <NavBar></NavBar>

            <h1>
                Cleaning Service Request
            </h1>

            <Container>
                <Row>
                    <Col>
                        <div>
                            <Label htmlFor="patientName">Patient Name</Label>
                            <Input type="text" id="patientName" placeholder={"John Doe"}/>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Type
                                of Cleaning</label>
                            <Form.Select>
                                <option value="Basic">Basic</option>
                                <option value="Regular">Regular</option>
                                <option value="Deep">Deep</option>
                            </Form.Select>
                        </div>
                    </Col>
                </Row>
                <br/>

                <Row>
                    <Col>
                        <LocationDropdown></LocationDropdown>
                    </Col>

                    <Col>
                        <div>
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Priority</label>
                            <Form.Select>
                                <option value="Low Priority">Low Priority</option>
                                <option value="High Priority">High Priority</option>
                                <option value="Emergency">Emergency</option>
                            </Form.Select>
                        </div>
                    </Col>
                </Row>

                <br/>

                <Row>
                    <Button variant={"ghost"} onClick={handleSubmit}>Submit</Button>
                </Row>

                </Container>

            </div>
    );
};
export default CleaningServiceRequest;
