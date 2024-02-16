import React, { useState } from 'react';
import axios from "axios";
import {Input} from "../../components/ui/input.tsx";
import {Col, Container, Row} from "react-bootstrap";
import {Label} from "../../components/ui/label.tsx";
import {Button} from "../../components/ui/button.tsx";
import {Textarea} from "../../components/ui/textarea.tsx";
import LocationDropdown from "../../components/LocationDropdown.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../components/ui/select.tsx";

const ExternalTransportation: React.FC = () => {


    const [formData, setFormData] = useState({
        id: '',
        nodeId: '',
        patientName: '',
        destination: '',
        transportation: '',
        date: '',
        description: '',
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
            const response = await axios.post("/api/external-transport", JSON.stringify(formData), {
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
            nodeId: '',
            patientName: '',
            description: '',
            transportation: '',
            date: '',
            destination: '',
            priority: '',
            status: 'Unassigned',
            employeeUser: 'none'
        });
    };



    return (
        <Container>

            <h1>
                External Transportation Request
            </h1>
            <div className={"border-2 border-blue-600 dark:border-blue-400 rounded-lg p-4"}>

                <Container>
                    <Row>
                        <Col>
                            <div>
                                <Label htmlFor="patientName">Patient Name</Label>
                                <Input type="text" id="patientName" placeholder={"Tanya Khan"}
                                       onChange={handleChangeText}/>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <Label htmlFor="transportation">Transportation</Label>
                                <Input type="text" id="transportation" placeholder={"Ambulance"}
                                       onChange={handleChangeText}/>
                            </div>
                        </Col>

                    </Row>
                    <br/>

                    <Row>

                        <Col>
                            <div>
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
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <Label htmlFor="destination">Destination</Label>
                                <Input type="text" id="destination" placeholder={"Mayo Clinic"}
                                       onChange={handleChangeText}/>
                            </div>
                        </Col>

                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <div>
                                <Label htmlFor="date">Date</Label>
                                <Input type="text" id="date" placeholder={"02/14/2024"} onChange={handleChangeText}/>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" placeholder={"Subdural Hematoma"}
                                          onChange={handleChangeTextArea}/>
                            </div>
                        </Col>

                        <br/>

                    </Row>
                    <br/>
                    <Row>
                        <LocationDropdown onChange={(value) => setFormData({
                            ...formData, "nodeId": value})}></LocationDropdown>
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
export default ExternalTransportation;
