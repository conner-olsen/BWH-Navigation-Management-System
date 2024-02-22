
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from  "../../components/ui/card.tsx";
import {Col, Container, Row} from "react-bootstrap";
import Global_Footer from "../../components/Global_Footer.tsx";
import CleaningServiceRequest from "./CleaningServiceRequest.tsx";
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "../../components/ui/sheet.tsx";
import FlowerServiceRequest from "./FlowerServiceRequest.tsx";
import ReligiousServiceRequest from "./ReligiousServiceRequest.tsx";
import LanguageService from "./LanguageService.tsx";
import InternalTransportation from "./InternalTransportation.tsx";
import ExternalTransportation from "./ExternalTransportation.tsx";


const ServiceList = () => {
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15%' }}>
                <Row>
                    <Col>
                        <h1> SERVICE REQUESTS </h1>
                    </Col>
                    <Row>
                        <p className="font-roboto text-neutral-500 italic font-light dark:text-neutral-300"
                         >
                            At Brigham and Women's we value our patients and want to accommodate to their needs
                            as seamlessly as possible. Below is a list of the services we offer.
                        </p>
                    </Row>
                </Row>


            </div>

            <br/>

            <Container>
                <Row>
                    <Col>
                        <Sheet>
                            <SheetTrigger className={"h-full"}>
                                <Card className="max-w-md border-gray-200 hover:scale-110 hover:bg-neutral-200
                             transition-all duration-200 h-full">
                                    <CardHeader>
                                        <CardTitle className="text-xl">Religious Service Request</CardTitle>
                                        <CardDescription className="text-sm dark:text-neutral-300">Send a request for
                                            religious sermons and rituals conducted for patients on long term
                                            stay </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <img src="public/service-images-transparent/religion.png"
                                             className="max-w-[180px] m-auto dark:invert" alt="Religious service"/>
                                    </CardContent>
                                </Card>
                            </SheetTrigger>
                            <SheetContent side="bottom">
                                <ReligiousServiceRequest></ReligiousServiceRequest>
                            </SheetContent>
                        </Sheet>
                    </Col>
                    <Col>
                        <Sheet>
                            <SheetTrigger className={"h-full"}>
                                <Card
                                    className="max-w-md border-gray-200 hover:scale-110 hover:bg-blue-200
                                    dark:hover:bg-blue-400 transition-all duration-200 h-full">
                                    <CardHeader>
                                        <CardTitle className="text-xl">Cleaning Service Request</CardTitle>
                                        <CardDescription className="text-sm dark:text-neutral-300">Send a cleaning request
                                            for quick, deep, or emergency cleaning for patients on long term
                                            stay</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <img src="public/service-images-transparent/cleaning_requestNew.png"
                                             className="max-w-[180px] m-auto" alt="cleaning service"/>
                                    </CardContent>
                                </Card>
                            </SheetTrigger>
                            <SheetContent side={"bottom"}>
                                <CleaningServiceRequest></CleaningServiceRequest>
                            </SheetContent>
                        </Sheet>
                    </Col>

                    <Col>
                        <Sheet>
                            <SheetTrigger className={"h-full"}>
                                <Card
                                    className="max-w-md border-gray-200 hover:scale-110 hover:bg-red-200 dark:hover:bg-red-400 transition-all duration-200 h-full">
                                    <CardHeader>
                                        <CardTitle className="text-xl">Flower Service Request</CardTitle>
                                        <CardDescription className="text-sm dark:text-neutral-300">Send a bouquet of flowers
                                            to send your regards to any patient on long term stay </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <img src="public/service-images-transparent/bouquet.png"
                                             className="max-w-[180px] m-auto" alt="flower service"/>
                                    </CardContent>
                                </Card>
                            </SheetTrigger>
                            <SheetContent side="bottom">
                                <FlowerServiceRequest></FlowerServiceRequest>
                            </SheetContent>
                        </Sheet>
                    </Col>
                </Row>

                <br/>

                <Row>
                    <Col>
                        <Sheet>
                            <SheetTrigger className={"h-full"}>
                                <Card
                                    className="max-w-md border-gray-200 hover:scale-110 hover:bg-red-200 dark:hover:bg-red-400 transition-all duration-200 h-full">
                                    <CardHeader>
                                        <CardTitle className="text-xl">Language Translation Request</CardTitle>
                                        <CardDescription className="text-sm dark:text-neutral-300">Send a request for
                                            language translation services for patients on long term stay </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <img src="public/service-images-transparent/languagesNew.png"
                                             className="max-w-[180px] m-auto" alt="language translation service"/>
                                    </CardContent>
                                </Card>
                            </SheetTrigger>
                            <SheetContent side="bottom">
                                <LanguageService></LanguageService>
                            </SheetContent>
                        </Sheet>
                    </Col>

                    <Col>
                        <Sheet>
                            <SheetTrigger className={"h-full"}>
                                <Card
                                    className="max-w-md border-gray-200 hover:scale-110 hover:bg-neutral-200 dark:hover:bg-neutral-400 transition-all duration-200 h-full">
                                    <CardHeader>
                                        <CardTitle className="text-xl">Internal Transportation Request</CardTitle>
                                        <CardDescription className="text-sm dark:text-neutral-300">Send a request for
                                            transportation within the hospital for patients on long term
                                            stay
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <img src="public/service-images-transparent/wheelchair_new.png"
                                             className="max-w-[180px] m-auto dark:invert" alt="internal transport service"/>
                                    </CardContent>
                                </Card>
                            </SheetTrigger>
                            <SheetContent side="bottom">
                                <InternalTransportation></InternalTransportation>
                            </SheetContent>
                        </Sheet>
                    </Col>

                    <Col>
                        <Sheet>
                            <SheetTrigger className={"h-full"}>
                                <Card
                                    className="max-w-md border-gray-200 hover:scale-110 hover:bg-blue-200 dark:hover:bg-blue-400 transition-all duration-200 h-full">
                                    <CardHeader>
                                        <CardTitle className="text-xl">External Transportation Request</CardTitle>
                                        <CardDescription className="text-sm dark:text-neutral-300">Send a request for
                                            external transportation for patients on long term stay </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <img src="public/service-images-transparent/ambulance_blue.png"
                                             className="max-w-[180px] m-auto" alt="external transport service"/>
                                    </CardContent>
                                </Card>
                            </SheetTrigger>
                            <SheetContent side="bottom">
                                <ExternalTransportation></ExternalTransportation>
                            </SheetContent>
                        </Sheet>
                    </Col>
                </Row>
            </Container>
            <Global_Footer/>
        </>
    );
};

export default ServiceList;
