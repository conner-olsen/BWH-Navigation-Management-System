
import React, { useState } from 'react';
import axios from "axios";
import {Input} from "../../components/ui/input.tsx";
import {Col, Container, Row} from "react-bootstrap";
import {Label} from "../../components/ui/label.tsx";
import {Textarea} from "../../components/ui/textarea.tsx";
import {Button} from "../../components/ui/button.tsx";
import LocationDropdown from "../../components/LocationDropdown.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../components/ui/select.tsx";

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

    const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post("/api/service-request/flower", JSON.stringify(formData), {
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

            <h1 className=" bg-gradient-to-r from-red-200 to-red-900 bg-clip-text text-transparent dark:text-white">
                Flower Service Request
            </h1>
            <div className={"border-2 border-red-200 dark:border-blue-400 rounded-lg p-4"}>

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
                            <LocationDropdown onChange={(value) => setFormData({
                                ...formData, "nodeId": value})}></LocationDropdown>
                        </Col>

                        <Col>
                            <div>
                                <Label>Flower Type</Label>
                                <Select required onValueChange={
                                    (value) => setFormData({ ...formData, "flowerType": value })}>
                                    <SelectTrigger>
                                        <SelectValue/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="daffodils">Daffodil</SelectItem>
                                        <SelectItem value="daisies">Daisies</SelectItem>
                                        <SelectItem value="hydrangeas">Hydrangeas</SelectItem>
                                        <SelectItem value="lilies">Lilies</SelectItem>
                                        <SelectItem value="marigolds">Marigolds</SelectItem>
                                        <SelectItem value="orchids">Orchids</SelectItem>
                                        <SelectItem value="roses">Roses</SelectItem>
                                    </SelectContent>
                                </Select>
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
                            <Label>Priority</Label>
                            <Select required onValueChange={
                                (value) => setFormData({ ...formData, "priority": value })}>
                                <SelectTrigger>
                                    <SelectValue/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Low Priority">Low Priority</SelectItem>
                                    <SelectItem value="High Priority">High Priority</SelectItem>
                                    <SelectItem value="Emergency">Emergency</SelectItem>
                                </SelectContent>
                            </Select>
                        </Col>
                        <Col>
                            <Label htmlFor="date">Delivery Date</Label>
                            <Input type="text" id="deliveryDate" placeholder="DD/MM/YY" onChange={handleChangeText}></Input>
                        </Col>
                    </Row>
                    <br/>

                    <Row>
                        <Col className={"justify-center flex"}>
                            <Button variant={"default"} onClick={handleSubmit}>Submit</Button>
                        </Col>
                    </Row>


                </Container>

            </div>
        </Container>
    );
};
export default FlowerServiceRequest;
