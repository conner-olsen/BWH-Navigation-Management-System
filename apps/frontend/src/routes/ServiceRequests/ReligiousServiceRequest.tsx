import React, { useState } from 'react';
import axios from "axios";
import {Input} from "../../components/ui/input.tsx";
import {Col, Container, Row} from "react-bootstrap";
import {Label} from "../../components/ui/label.tsx";
import {Button} from "../../components/ui/button.tsx";
import LocationDropdown from "../../components/LocationDropdown.tsx";
import {Textarea} from "../../components/ui/textarea.tsx";

const CleaningServiceRequest: React.FC = () => {



    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }



    const [formData, setFormData] = useState({
        id: 0,
        nodeID: '',
        patientName: '',
        religion: '',
        note: '',
        status: 'UnAssigned',
        employeeUser: 'none'
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setFormData({
            id: getRandomInt(1000000),
            nodeID: '',
            patientName: '',
            religion: '',
            note: '',
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
                Religious Service Request
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
                            <Label htmlFor="religion">Religion</Label>
                            <Input type="text" id="religion" placeholder={"Christianity"}/>
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
                            <Label htmlFor="note">Request Details</Label>
                            <Textarea id="note" placeholder="Prayer time breaks"></Textarea>
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
