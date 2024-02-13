import NavBar from "../../components/NavBar.tsx";
import React, { useState, useEffect } from 'react';
//import axios from "axios";
import {Input} from "../../components/ui/input.tsx";
import {Col, Container, Row} from "react-bootstrap";
import {Label} from "../../components/ui/label.tsx";
import {Textarea} from "../../components/ui/textarea.tsx";
import Form from "react-bootstrap/Form";
import {parseCSV} from "common/src/parser.ts";

const FlowerServiceRequest: React.FC = () => {
    const [node, setNode] = useState<string>("Select Location");


    // const [formData, setFormData] = useState({
    //     id: '',
    //     senderName: '',
    //     senderEmail: '',
    //     nodeID: '',
    //     patientName: '',
    //     flowerType: '',
    //     deliveryDate: '',
    //     note: '',
    //     status: 'UnAssigned',
    //     employeeUser: 'none'
    // });

    // const handleSubmit = async (event: React.FormEvent) => {
    //     event.preventDefault();
    //     setFormData({
    //         id: 0,
    //         senderName: '',
    //         senderEmail: '',
    //         nodeID: '',
    //         patientName: '',
    //         flowerType: '',
    //         deliveryDate: '',
    //         note: '',
    //         status: '',
    //         employeeUser: ''
    //     });
    //     try {
    //         const response = await axios.post("/api/populate-flower-service-request", JSON.stringify(formData), {
    //             headers: {
    //                 "Content-Type": 'application/json'
    //             }
    //         });
    //
    //         if (response.status === 200) {
    //             console.log('Data sent successfully');
    //         } else {
    //             console.error('Error sending data');
    //         }
    //     } catch (error) {
    //         console.error('Error sending data:', error);
    //     }
    // };

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    //     const {name, value} = event.target;
    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         [name]: value,
    //     }));
    // };

    const [nodeCSVData, setNodeCSVData] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a GET request to the API endpoint
                const res = await fetch("/api/download-node-csv");

                // Check if the request was successful (status code 2xx)
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }


                const result = await res.text();
                // Set the data in the state
                setNodeCSVData(result);
            } catch (err) {
                // Handle errors
                console.log("Failed");
            }
        };

        fetchData().then();
    }, []); //





    //parse node CSV into array of CSVRows
    const CSVRow = parseCSV(nodeCSVData);
    //make array to be inserted in the html code
    const roomNames = [];


    //for each CSV row, add an option with the value as id and name as longName into array
    for (let i = 0; i < CSVRow.length; i++) {
        const row = CSVRow[i];
        const rowval = Object.values(row);
        const id = rowval[0];
        const nodeId = row["nodeId"];
        const longName = row["longName"];
        roomNames.push(<option value={id}> {nodeId + " " + "(" + longName + ")"} </option>);
    }




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

                <Row>
                    <Col>
                        <div>
                            <Label htmlFor="room">Select Location</Label>
                            <Form.Select value={node} size={"sm"}
                                         onChange={e => setNode(e.target.value)}>
                                {roomNames}
                            </Form.Select>
                        </div>

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


            </Container>
        </div>
    );
};
export default FlowerServiceRequest;
