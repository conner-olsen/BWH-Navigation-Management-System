
import React from 'react';
import NavBar from "../../components/NavBar.tsx";
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from  "../../components/ui/card.tsx";
import {Col, Container, Row} from "react-bootstrap";


const ServiceList = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <NavBar/>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15%' }}>
            <h1 className="font-roboto font-extrabold italic"
                style={{marginTop: '5%', marginLeft: '10%', fontSize: '60px'}}>
                SERVICE REQUESTS
            </h1>
            <p className="font-roboto text-neutral-500 italic font-light dark:text-neutral-300"
               style={{marginRight: '30%', marginLeft: '0%', marginTop: '5%', textAlign: "right", fontSize: '25px', lineHeight: '30px'}}>
                At Brigham and Women's we value our patients and want to accommodate to their needs
                as seamlessly as possible. Below is a list of the services we offer.
            </p>
            </div>

            <br/>

            <Container>
                <Row>
                    <Col>
                        <Link to="/flowerService" className={"no-underline"}>
                            <Card className="max-w-md border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-xl">Flower Service Request</CardTitle>
                                    <CardDescription className="text-sm">Send a bogue of flowers to send your regards to any patient on long term stay </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <img src="public/flower_service.jpg" alt="flower service"/>
                                </CardContent>
                            </Card>
                        </Link>
                    </Col>
                    <Col>

                        <Link to="/flowerService" className={"no-underline"}>
                            <Card className="max-w-md border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-xl">Cleaning Service Request</CardTitle>
                                    <CardDescription className="text-sm">Send a cleaning request for quick, deep, or emergency cleaning for patients on long term stay</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <img src="public/cleaning_request.webp" alt="cleaning service"/>
                                </CardContent>
                            </Card>
                        </Link>
                    </Col>

                    <Col>

                        <Link to="/flowerService" className={"no-underline"}>
                            <Card className="max-w-md border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-xl">Religious Service Request</CardTitle>
                                    <CardDescription className="text-sm">Send a request for religious sermons and rituals conducted for patients on long terms stay </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <img src="public/religous_service.jpg" alt="Religious service"/>
                                </CardContent>
                            </Card>
                        </Link>
                    </Col>
                </Row>

                <br/>

                <Row>
                    <Col>
                        <Link to="/flowerService" className={"no-underline"}>
                            <Card className="max-w-md border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-xl">Medication Delivery Service Request</CardTitle>
                                    <CardDescription className="text-sm">Send a request for medication delivery for patients on long terms stay </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <img src="public/medicine.jpg" alt="medicine delivery service"/>
                                </CardContent>
                            </Card>
                        </Link>
                    </Col>

                    <Col>
                        <Link to="/flowerService" className={"no-underline"}>
                            <Card className="max-w-md border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-xl">Internal Transportation Request</CardTitle>
                                    <CardDescription className="text-sm">Send a request for medication delivery for patients on long terms stay </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <img src="public/internal.jpg" alt="medicine delivery service"/>
                                </CardContent>
                            </Card>
                        </Link>
                    </Col>

                    <Col>
                        <Link to="/flowerService" className={"no-underline"}>
                            <Card className="max-w-md border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-xl">External Transportation Request</CardTitle>
                                    <CardDescription className="text-sm">Send a request for medication delivery for patients on long terms stay </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <img src="public/ambulance.jpg" alt="medicine delivery service"/>
                                </CardContent>
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ServiceList;
