
import React, { useState } from 'react';
import axios from "axios";
import {Input} from "../../components/ui/input.tsx";
import {Col, Container, Row} from "react-bootstrap";
import {Label} from "../../components/ui/label.tsx";
import {Textarea} from "../../components/ui/textarea.tsx";
import Form from "react-bootstrap/Form";
import {Button} from "../../components/ui/button.tsx";
import LocationDropdown from "../../components/LocationDropdown.tsx";

const FlowerServiceRequest: React.FC = () => {


    const [formData, setFormData] = useState({
        id: '',
        senderName: '',
        senderEmail: '',
        nodeId: '',
        patientName: '',
        flowerType: '',
        deliveryDate: '',
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

        try {
            const response = await axios.post("/api/populate-flower-service-request", JSON.stringify(formData), {
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
        setFormData({
            id: '',
            senderName: '',
            senderEmail: '',
            nodeId: '',
            patientName: '',
            flowerType: '',
            deliveryDate: '',
            note: '',
            priority: '',
            status: 'Unassigned',
            employeeUser: 'none'
        });
    };


    return (
        <Container>

            <h1>
                Flower Service Request
            </h1>
            <div className={"border-2 border-blue-950 rounded-lg p-4"}>

                <Container>
                    <Row>
                        <Col>
                            <div>
                                <Label htmlFor="senderName">Sender Name</Label>
                                <Input type="text" id="senderName" placeholder={"John Doe"}
                                       onChange={handleChangeText}/>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <Label htmlFor="senderEmail">Sender Email</Label>
                                <Input type="email" id="senderEmail" placeholder={"johndoe@gmail.com"}
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
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Flower
                                    Selection</label>
                                <Form.Select id={"flowerType"} onChange={handleChangeSelect}>
                                    <option value="daffodils">Daffodil</option>
                                    <option value="daisies">Daisies</option>
                                    <option value="hydrangeas">Hydrangeas</option>
                                    <option value="lilies">Lilies</option>
                                    <option value="marigolds">Marigolds</option>
                                    <option value="orchids">orchids</option>
                                    <option value="roses">Roses</option>
                                </Form.Select>
                            </div>
                        </Col>
                    </Row>

                    <br/>

                    <Row>


                        <Col>
                            <Label htmlFor="patientName">Patient Name</Label>
                            <Input type="text" id="patientName" placeholder="John Smith"
                                   onChange={handleChangeText}></Input>
                        </Col>
                        <Col>
                            <Label htmlFor="note">Add a note</Label>
                            <Textarea id="note" placeholder="Get well soon! Miss you loads <3"
                                      onChange={handleChangeTextArea}></Textarea>
                        </Col>
                    </Row>
                    <br/>

                    <Row>
                        <Col>
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1">Priority</label>
                            <Form.Select id={"priority"} onChange={handleChangeSelect}>
                                <option value="Low Priority">Low Priority</option>
                                <option value="Medium Priority">Medium Priority</option>
                                <option value="High Priority">High Priority</option>
                                <option value="Emergency">Emergency</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <Label htmlFor="date">Delivery Date</Label>
                            <Input type="text" id="deliveryDate" placeholder="DD/MM/YY" onChange={handleChangeText}></Input>
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
export default FlowerServiceRequest;
