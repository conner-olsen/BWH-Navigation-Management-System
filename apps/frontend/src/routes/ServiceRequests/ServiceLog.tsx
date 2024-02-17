import {FlowerServiceLogComponent} from "../../components/ServiceRequests/FlowerServiceLogComponent.tsx";
import Global_Footer from "../../components/Global_Footer.tsx";
import {TabsContent, TabsList, TabsTrigger, Tabs} from "../../components/ui/tabs.tsx";
import {ReligiousServiceLogComponent} from "../../components/ServiceRequests/ReligionServiceLogComponent.tsx";
import {CleaningServiceLogComponent} from "../../components/ServiceRequests/CleaningServiceLogComponent.tsx";
import {InternalTransportServiceLogComponent} from "../../components/ServiceRequests/InternalServiceLogComponent.tsx";
import {LanguageServiceLogComponent} from "../../components/ServiceRequests/LanguageServiceLogComponent.tsx";
import {ExternalTransportServiceLogComponent} from "../../components/ServiceRequests/ExternalServiceLogComponent.tsx";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "../../components/ui/sheet.tsx";
import {Button} from "../../components/ui/button.tsx";




const ServiceLog = () => {

    const data = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };\


    return (
        <>
        <div className={"align-content-center container"}>
            <br/>
            <br/>

            <Tabs defaultValue="Flower Service Request" className="align-content-center">
                <TabsList classname-={"align-content-center"}>
                    <TabsTrigger value="Flower Service Request">Flower</TabsTrigger>
                    <TabsTrigger value="Religious Service Request">Religious</TabsTrigger>
                    <TabsTrigger value="Cleaning Service Request">Cleaning</TabsTrigger>
                    <TabsTrigger value="Language Service Request">Language</TabsTrigger>
                    <TabsTrigger value="Internal Transport Service Request">Internal Transport</TabsTrigger>
                    <TabsTrigger value="External Transport Service Request">External Transport</TabsTrigger>
                    <Sheet key={"right"}>
                        <SheetTrigger asChild>
                            <Button variant="ghost">Stats</Button>
                        </SheetTrigger>
                        <SheetContent side={"right"}>
                            <SheetHeader>
                                <SheetTitle>Service Request Statistics</SheetTitle>
                                <SheetDescription>
                                    View graphs of the service request statistics
                                </SheetDescription>
                            </SheetHeader>


                        </SheetContent>
                    </Sheet>
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


                </Tabs>

        </div>
        <Global_Footer />
        </>
    );

};

export default ServiceLog;
