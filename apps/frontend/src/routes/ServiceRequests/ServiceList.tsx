
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from  "../../components/ui/card.tsx";
import {Col, Container, Row} from "react-bootstrap";
import Global_Footer from "../../components/Global_Footer.tsx";


const ServiceList = () => {
    return (
        <>

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
                        <Link to="/FlowerService" className={"no-underline"}>
                            <Card className="max-w-md border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-xl">Flower Service Request</CardTitle>
                                    <CardDescription className="text-sm">Send a bogue of flowers to send your regards to any patient on long term stay </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <img src="public/service-images-transparent/flower_serviceT.png" alt="flower service"/>
                                </CardContent>
                            </Card>
                        </Link>
                    </Col>
                    <Col>

                        <Link to="/CleaningService" className={"no-underline"}>
                            <Card className="max-w-md border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-xl">Cleaning Service Request</CardTitle>
                                    <CardDescription className="text-sm">Send a cleaning request for quick, deep, or emergency cleaning for patients on long term stay</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <img src="public/service-images-transparent/cleaning_requestT.png" alt="cleaning service"/>
                                </CardContent>
                            </Card>
                        </Link>
                    </Col>

                    <Col>

                        <Link to="/ReligiousService" className={"no-underline"}>
                            <Card className="max-w-md border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-xl">Religious Service Request</CardTitle>
                                    <CardDescription className="text-sm">Send a request for religious sermons and rituals conducted for patients on long terms stay </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <img src="public/service-images-transparent/religious_serviceT.png" alt="Religious service"/>
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
                                    <CardTitle className="text-xl">Language Translation Service Request</CardTitle>
                                    <CardDescription className="text-sm">Send a request for medication delivery for patients on long terms stay </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <img src="public/service-images-transparent/languagesT.png" alt="language translation service"/>
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
                                    <img src="public/service-images-transparent/internalT.png" alt="internal transport service"/>
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
                                    <img src="public/service-images-transparent/ambulanceT.png" alt="external transport service"/>
                                </CardContent>
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </Container>
            <Global_Footer />
        </>
    );
};

export default ServiceList;
