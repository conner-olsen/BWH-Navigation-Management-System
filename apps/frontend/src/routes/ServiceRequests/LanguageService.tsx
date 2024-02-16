import React, { useState } from 'react';
import axios from "axios";
import {Input} from "../../components/ui/input.tsx";
import {Col, Container, Row} from "react-bootstrap";
import {Label} from "../../components/ui/label.tsx";
import {Button} from "../../components/ui/button.tsx";
import LocationDropdown from "../../components/LocationDropdown.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../components/ui/select.tsx";

const LanguageService: React.FC = () => {

    const [formData, setFormData] = useState({
        id: '',
        nodeId: '',
        name: '',
        languagePref: '',
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
            const response = await axios.post("/api/service-request/language", JSON.stringify(formData), {
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
            name: '',
            languagePref: '',
            priority: '',
            status: 'Unassigned',
            employeeUser: 'none'
        });
    };



    return (
        <Container>

            <h1>
                Language Service Request
            </h1>
            <div className={"border-2 border-blue-600 dark:border-blue-400 rounded-lg p-4"}>

                <Container>
                    <Row>
                        <Col>
                            <div>
                                <Label htmlFor="name">Patient Name</Label>
                                <Input type="text" id="name" placeholder={"Aiden Deady"}/>
                            </div>
                        </Col>
                        <Col>
                            <LocationDropdown onChange={(value) => setFormData({
                                ...formData, "nodeId": value})}></LocationDropdown>
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
                                <Label htmlFor="languagePref">Language</Label>
                                <Input type="text" id="languagePref" placeholder={"French"}
                                       onChange={handleChangeText}/>
                            </div>
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
export default LanguageService;
