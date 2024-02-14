import NavBar from "../../components/NavBar.tsx";
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
        nodeID: '',
        patientName: '',
        flowerType: '',
        deliveryDate: '',
        note: '',
        status: 'Unassigned',
        employeeUser: 'none'
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setFormData({
            id: '',
            senderName: '',
            senderEmail: '',
            nodeID: '',
            patientName: '',
            flowerType: '',
            deliveryDate: '',
            note: '',
            status: '',
            employeeUser: ''
        });
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
    };


    return (
        <div>
            <NavBar></NavBar>

            <h1>
                Flower Service Request
            </h1>

            <Container>
                <Row>
                    <Col>
                        <div>
                            <Label htmlFor="senderName">Sender Name</Label>
                            <Input type="text" id="senderName" placeholder={"John Doe"}/>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <Label htmlFor="senderEmail">Sender Email</Label>
                            <Input type="email" id="senderEmail" placeholder={"johndoe@gmail.com"}/>
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
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Flower Selection</label>
                            <Form.Select>
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
                        <Input type="text" id="patientName" placeholder="John Smith"></Input>
                    </Col>
                    <Col>
                        <Label htmlFor="note">Add a note</Label>
                        <Textarea id="note" placeholder="Get well soon! Miss you loads <3"></Textarea>
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
export default FlowerServiceRequest;
