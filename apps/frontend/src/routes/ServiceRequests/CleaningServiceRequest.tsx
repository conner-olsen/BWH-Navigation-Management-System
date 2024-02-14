import React, { useState } from 'react';
import axios from "axios";
import {Input} from "../../components/ui/input.tsx";
import {Col, Container, Row} from "react-bootstrap";
import {Label} from "../../components/ui/label.tsx";
import Form from "react-bootstrap/Form";
import {Button} from "../../components/ui/button.tsx";
import LocationDropdown from "../../components/LocationDropdown.tsx";

const CleaningServiceRequest: React.FC = () => {

    const [formData, setFormData] = useState({
        id: '',
        nodeId: '',
        patientName: '',
        type: '',
        priority: '',
        status: 'UnAssigned',
        employeeUser: 'none'
    });

    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setFormData({
            id: 'getRandomInt(1000000)',
            nodeId: '',
            patientName: '',
            type: '',
            priority: '',
            status: '',
            employeeUser: ''
        });
        try {
            const response = await axios.post("/api/cleaning-request", JSON.stringify(formData), {
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
        <Container>

            <h1>
                Cleaning Service Request
            </h1>
            <div className={"border-2 border-blue-950 rounded-lg p-4"}>

                <Container>
                    <Row>
                        <Col>
                            <div>
                                <Label htmlFor="patientName">Patient Name</Label>
                                <Input type="text" id="patientName" placeholder={"Karish Gupta"}
                                       onChange={handleChangeText}/>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Type
                                    of Cleaning</label>
                                <Form.Select onChange={handleChangeSelect}>
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
                            <LocationDropdown onChange={handleChangeSelect} id={"nodeId"}></LocationDropdown>
                        </Col>

                        <Col>
                            <div>
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Priority</label>
                                <Form.Select onChange={handleChangeSelect}>
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
        </Container>
);
};
export default CleaningServiceRequest;
