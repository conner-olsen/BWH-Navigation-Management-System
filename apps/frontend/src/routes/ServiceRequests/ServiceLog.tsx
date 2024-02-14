
import {FlowerServiceLogComponent} from "../../components/FlowerServiceLogComponent.tsx";
import Global_Footer from "../../components/Global_Footer.tsx";
import {TabsContent, TabsList, TabsTrigger, Tabs} from "../../components/ui/tabs.tsx";
//import {Button} from "../../components/ui/button.tsx";
//import {GetDataEmployees} from "../../components/EmployeeManagerComponent.tsx";
import {ReligiousServiceLogComponent} from "../../components/ReligionServiceLogComponent.tsx";
import {CleaningServiceLogComponent} from "../../components/CleaningServiceLogComponent.tsx";
import {InternalTransportServiceLogComponent} from "../../components/InternalServiceLogComponent.tsx";
import {LanguageServiceLogComponent} from "../../components/LanguageServiceLogComponent.tsx";
import {ExternalTransportServiceLogComponent} from "../../components/ExternalServiceLogComponent.tsx";

const ServiceLog = () => {
    return (
        <div className={"align-content-center"}>
            <br/>
            <br/>
            <Tabs defaultValue="External Transport Service Request" className="w-screen align-content-center">
                <TabsList classname-={"align-content-center"}>
                    <TabsTrigger value="External Transport Service Request">External Transport Service Request</TabsTrigger>
                    <TabsTrigger value="Flower Service Request">Flower Service Request</TabsTrigger>
                    <TabsTrigger value="Religious Service Request">Religious Service Request</TabsTrigger>
                    <TabsTrigger value="Cleaning Service Request">Cleaning Service Request</TabsTrigger>
                    <TabsTrigger value="Language Service Request">Language Service Request</TabsTrigger>
                    <TabsTrigger value="Internal Transport Service Request">Internal Transport Service Request</TabsTrigger>

                </TabsList>

                {/*<TabsContent value="Employee List">*/}

                <TabsContent value={"External Transport Service Request"}>
                    <ExternalTransportServiceLogComponent></ExternalTransportServiceLogComponent>
                </TabsContent>
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
                <TabsContent value={"Language Service Request"}>
                    <LanguageServiceLogComponent></LanguageServiceLogComponent>
                </TabsContent>


                </Tabs>
            <Global_Footer />
        </div>
    );

};

export default ServiceLog;
