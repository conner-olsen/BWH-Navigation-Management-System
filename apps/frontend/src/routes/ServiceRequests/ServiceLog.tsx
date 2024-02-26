import {FlowerServiceLogComponent} from "../../components/ServiceRequests/FlowerServiceLogComponent.tsx";
import Global_Footer from "../../components/GlobalFooter.tsx";
import {TabsContent, TabsList, TabsTrigger, Tabs} from "../../components/ui/tabs.tsx";
import {ReligiousServiceLogComponent} from "../../components/ServiceRequests/ReligionServiceLogComponent.tsx";
import {CleaningServiceLogComponent} from "../../components/ServiceRequests/CleaningServiceLogComponent.tsx";
import {InternalTransportServiceLogComponent} from "../../components/ServiceRequests/InternalServiceLogComponent.tsx";
import {LanguageServiceLogComponent} from "../../components/ServiceRequests/LanguageServiceLogComponent.tsx";
import {ExternalTransportServiceLogComponent} from "../../components/ServiceRequests/ExternalServiceLogComponent.tsx";
import CreateSRChart from "../../components/ServiceRequests/SRCountData.tsx";
import CreateEmployeeChart from "../../components/ServiceRequests/EmployeeStats.tsx";
import CompletionStats from "../../components/ServiceRequests/CompletionStats.tsx";
import {Col, Container, Row} from "react-bootstrap";


const ServiceLog = () => {

    return (
        <>
            <div className="container text-center" style={{display: 'flex', alignItems: 'center'}}>
                <Col>
                    <h1>SERVICE LOG</h1>
                </Col>
            </div>
            <Container className={"align-content-center container"}>


                <Tabs defaultValue="Flower Service Request" className="align-content-center">
                    <TabsList classname-={"align-content-center"}>
                        <TabsTrigger value="Flower Service Request">Flower</TabsTrigger>
                        <TabsTrigger value="Religious Service Request">Religious</TabsTrigger>
                        <TabsTrigger value="Cleaning Service Request">Cleaning</TabsTrigger>
                        <TabsTrigger value="Language Service Request">Language</TabsTrigger>
                        <TabsTrigger value="Internal Transport Service Request">Internal Transport</TabsTrigger>
                        <TabsTrigger value="External Transport Service Request">External Transport</TabsTrigger>
                        <TabsTrigger value="Stats">Stats</TabsTrigger>
                    </TabsList>

                    {/*<TabsContent value="Employee List">*/}


                    <TabsContent value="Flower Service Request">
                        <FlowerServiceLogComponent></FlowerServiceLogComponent>
                    </TabsContent>
                    <TabsContent value={"Religious Service Request"}>
                        <ReligiousServiceLogComponent></ReligiousServiceLogComponent>
                    </TabsContent>
                    <TabsContent value={"Cleaning Service Request"}>
                        <CleaningServiceLogComponent></CleaningServiceLogComponent>
                    </TabsContent>
                    <TabsContent value={"Internal Transport Service Request"}>
                        <InternalTransportServiceLogComponent></InternalTransportServiceLogComponent>
                    </TabsContent>
                    <TabsContent value={"External Transport Service Request"}>
                        <ExternalTransportServiceLogComponent></ExternalTransportServiceLogComponent>
                    </TabsContent>
                    <TabsContent value={"Language Service Request"}>
                        <LanguageServiceLogComponent></LanguageServiceLogComponent>
                    </TabsContent>
                    <TabsContent value={"Stats"}>
                        <Container>
                            <Row>
                                <Col className={"h-full mb-4"}>
                                    <Container className="mx-auto bg-background border-2 border-blue-600 dark:border-blue-400 rounded-lg px-8 pt-6 pb-8 mb-4">
                                        <p>Service Request Types</p>
                                        <CreateSRChart></CreateSRChart>
                                    </Container>
                                </Col>
                                <Col className={"h-full"}>
                                    <Container className="mx-auto bg-background border-2 border-blue-600 dark:border-blue-400 rounded-lg px-8 pt-6 pb-8 mb-4">
                                        <p>Employee Statistics</p>
                                        <CreateEmployeeChart></CreateEmployeeChart>
                                    </Container>

                                    <Container className="mx-auto bg-background border-2 border-blue-600 dark:border-blue-400 rounded-lg px-8 pt-6 pb-8 mb-4">
                                        <p>Service Request Statuses</p>
                                        <CompletionStats></CompletionStats>
                                    </Container>
                                </Col>
                            </Row>
                        </Container>
                    </TabsContent>


                </Tabs>

            </Container>
            <Global_Footer/>
        </>
    );

};

export default ServiceLog;
