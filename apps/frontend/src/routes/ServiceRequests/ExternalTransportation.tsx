import React, { useState } from 'react';
import axios from "axios";
import {Input} from "../../components/ui/input.tsx";
import {Col, Container, Row} from "react-bootstrap";
import {Label} from "../../components/ui/label.tsx";
import Form from "react-bootstrap/Form";
import {Button} from "../../components/ui/button.tsx";
import {Textarea} from "../../components/ui/textarea.tsx";

const ExternalTransportation: React.FC = () => {



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

            <h1>
                External Transportation Request
            </h1>

            <Container>
                <Row>
                    <Col>
                        <div>
                            <Label htmlFor="patientName">Patient Name</Label>
                            <Input type="text" id="patientName" placeholder={"Tanya Khan"}/>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <Label htmlFor="transportation">Transportation</Label>
                            <Input type="text" id="transportation" placeholder={"Ambulance"}/>
                        </div>
                    </Col>

                </Row>
                <br/>

                <Row>

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
                    <Col>
                        <div>
                            <Label htmlFor="destination">Destination</Label>
                            <Input type="text" id="destination" placeholder={"Mayo Clinic"}/>
                        </div>
                    </Col>

                </Row>
                <br/>
                <Row>
                    <Col>
                        <div>
                            <Label htmlFor="date">Date</Label>
                            <Input type="text" id="date" placeholder={"02/14/2024"}/>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" placeholder={"  Subdural Hematoma"}/>
                        </div>
                    </Col>



                </Row>
                <br/>
                <Row>

                </Row>
                <br/>


                <Row>
                    <Button variant={"ghost"} onClick={handleSubmit}>Submit</Button>
                </Row>

            </Container>

        </div>
    );
};
export default ExternalTransportation;
