import React, { useState } from 'react';
import axios from "axios";
import {Input} from "../../components/ui/input.tsx";
import {Col, Container, Form, Row} from "react-bootstrap";
import {Label} from "../../components/ui/label.tsx";
import {Button} from "../../components/ui/button.tsx";
import LocationDropdown from "../../components/LocationDropdown.tsx";
import {Textarea} from "../../components/ui/textarea.tsx";

const ReligiousServiceRequest: React.FC = () => {

    const [formData, setFormData] = useState({
        id: '',
        nodeId: '',
        patientName: '',
        religion: '',
        note: '',
        priority: '',
        status: 'Unassigned',
        employeeUser: 'none'
    });



    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setFormData({
            id: '',
            nodeId: '',
            patientName: '',
            religion: '',
            note: '',
            priority: '',
            status: '',
            employeeUser: ''
        });
        try {
            const response = await axios.post("/api/religious-service-request", JSON.stringify(formData), {
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
                Religious Service Request
            </h1>
            <div className={"border-2 border-blue-950 rounded-lg p-4"}>

                <Container>
                    <Row>
                        <Col>
                            <div>
                                <Label htmlFor="patientName">Patient Name</Label>
                                <Input type="text" id="patientName" placeholder={"James Walden"}
                                       onChange={handleChangeText}/>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <Label htmlFor="religion">Religion</Label>
                                <Input type="text" id="religion" placeholder={"Christianity"}
                                       onChange={handleChangeText}/>
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
                                <Form.Select onChange={handleChangeSelect} id={"priority"}>
                                    <option value="Low Priority">Low Priority</option>
                                    <option value="High Priority">High Priority</option>
                                    <option value="Emergency">Emergency</option>
                                </Form.Select>
                            </div>
                        </Col>


                        <Col>
                            <div>
                                <Label htmlFor="note">Request Details</Label>
                                <Textarea id="note" placeholder="Prayer time breaks"
                                          onChange={handleChangeTextArea}></Textarea>
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
export default ReligiousServiceRequest;
