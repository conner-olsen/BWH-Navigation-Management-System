import {FlowerServiceLogComponent} from "../../components/ServiceRequests/FlowerServiceLogComponent.tsx";
import Global_Footer from "../../components/Global_Footer.tsx";
import {TabsContent, TabsList, TabsTrigger, Tabs} from "../../components/ui/tabs.tsx";
import {ReligiousServiceLogComponent} from "../../components/ServiceRequests/ReligionServiceLogComponent.tsx";
import {CleaningServiceLogComponent} from "../../components/ServiceRequests/CleaningServiceLogComponent.tsx";
import {InternalTransportServiceLogComponent} from "../../components/ServiceRequests/InternalServiceLogComponent.tsx";
import {LanguageServiceLogComponent} from "../../components/ServiceRequests/LanguageServiceLogComponent.tsx";
import {ExternalTransportServiceLogComponent} from "../../components/ServiceRequests/ExternalServiceLogComponent.tsx";
import CreateSRChart from "../../components/ServiceRequests/SRCountData.tsx";
import CreateEmployeeChart from "../../components/ServiceRequests/EmployeeStats.tsx";
import CompletionStats from "../../components/ServiceRequests/CompletionStats.tsx";
import { Col, Row } from "react-bootstrap";


const ServiceLog = () => {

    return (
        <>
            <div style={{display: 'flex', alignItems: 'center', marginLeft: '15%'}}>
                <Col>
                    <h1>SERVICE LOG</h1>
                </Col>
            </div>
            <div className={"align-content-center container"}>


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
                        <div>
                            <Row>
                                <Col className={"h-full"}>
                                    <div className="border-2 border-blue-950 rounded-lg p-4 h-full">
                                        <p>Service Request Types</p>
                                        <CreateSRChart></CreateSRChart>
                                    </div>
                                </Col>
                                <Col className={"h-full"}>
                                    <div className="border-2 border-blue-950 rounded-lg p-4 h-full">
                                        <p>Employee Statistics</p>
                                        <CreateEmployeeChart></CreateEmployeeChart>
                                    </div>
                                    <br/>
                                    <div className="border-2 border-blue-950 rounded-lg p-4 h-full">
                                        <p>Service Request Statuses</p>
                                        <CompletionStats></CompletionStats>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </TabsContent>


                </Tabs>

            </div>
            <Global_Footer/>
        </>
    );

};

export default ServiceLog;
