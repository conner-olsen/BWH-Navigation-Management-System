import React, { useState } from 'react';
import axios from "axios";
import {Input} from "../../components/ui/input.tsx";
import {Col, Container, Row} from "react-bootstrap";
import {Label} from "../../components/ui/label.tsx";
import Form from "react-bootstrap/Form";
import {Button} from "../../components/ui/button.tsx";
import LocationDropdown from "../../components/LocationDropdown.tsx";

const InternalTransportation: React.FC = () => {

    const [formData, setFormData] = useState({
        id: '',
        nodeId: '',
        patientName: '',
        mode: '',
        destination: '',
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


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post("/api/internal-transport", JSON.stringify(formData), {
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
            mode: '',
            destination: '',
            priority: '',
            status: '',
            employeeUser: ''
        });
    };



    return (
        <Container>

            <h1>
                Internal Transportation Request
            </h1>
            <div className={"border-2 border-blue-950 rounded-lg p-4"}>

                <Container>
                    <Row>
                        <Col>
                            <div>
                                <Label htmlFor="patientName">Patient Name</Label>
                                <Input type="text" id="patientName" placeholder={"Will Smith"}
                                       onChange={handleChangeText}/>
                            </div>
                        </Col>

                        <Col>
                            <div>
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Priority</label>
                                <Form.Select id={"priority"} onChange={handleChangeSelect}>
                                    <option value="Low Priority">Low Priority</option>
                                    <option value="High Priority">High Priority</option>
                                    <option value="Emergency">Emergency</option>
                                </Form.Select>
                            </div>
                        </Col>

                    </Row>
                    <br/>

                    <Row>
                        <Col>
                            <LocationDropdown onChange={handleChangeSelect} id={"nodeId"}></LocationDropdown>
                        </Col>

                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <div>
                                <Label htmlFor="destination">Destination</Label>
                                <Input type="text" id="destination" placeholder={"X-ray Labs"} onChange={handleChangeText}/>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <Label htmlFor="mode">Mode Of Transportation</Label>
                                <Input type="text" id="mode" placeholder={"Wheelchair"} onChange={handleChangeText}/>
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
export default InternalTransportation;
