import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '../../components/ui/input.tsx';
import { Col, Container, Row } from 'react-bootstrap';
import { Label } from '../../components/ui/label.tsx';
import { Button } from '../../components/ui/button.tsx';
import LocationDropdown from '../../components/LocationDropdown.tsx';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../components/ui/select.tsx";

const CleaningServiceRequest: React.FC = () => {
    const [formData, setFormData] = useState({
        id: '',
        nodeId: '',
        patientName: '',
        type: '',
        priority: '',
        status: 'Unassigned',
        employeeUser: 'none'
    });

    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/service-request/cleaning', JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json'
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
            type: '',
            priority: '',
            status: 'Unassigned',
            employeeUser: 'none'
        });
    };

    return (
        <Container>
            <h1 className=" bg-gradient-to-r from-blue-600 to-black bg-clip-text text-transparent dark:text-white text-center">Cleaning Service Request</h1>
            <div className="border-2 border-blue-600 dark:border-blue-400 rounded-lg px-4 pb-4">
                <Container>
                    <Row>
                        <div className="col-sm">
                            <br/>
                            <div>
                                <Label htmlFor="patientName">Patient Name</Label>
                                <Input type="text" id="patientName" placeholder="Karish Gupta" onChange={handleChangeText} />
                            </div>
                        </div>
                        <div className="col-sm">
                            <br/>
                            <div>
                                <Label>Type of Cleaning</Label>
                                <Select required onValueChange={
                                    (value) => setFormData({ ...formData, "type": value })}>
                                    <SelectTrigger>
                                        <SelectValue/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Basic">Basic</SelectItem>
                                        <SelectItem value="Regular">Regular</SelectItem>
                                        <SelectItem value="Deep">Deep</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </Row>

                    <Row>
                        <div className="col-sm">
                            <br/>
                            <LocationDropdown onChange={(value) => setFormData({
                                ...formData, "nodeId": value})}></LocationDropdown>
                        </div>
                        <div className="col-sm">
                            <br/>
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
                        </div>
                    </Row>
                    <br />
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

export default CleaningServiceRequest;
