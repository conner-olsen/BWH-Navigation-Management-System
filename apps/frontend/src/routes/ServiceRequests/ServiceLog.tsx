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
import {Pie} from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from "axios";




const ServiceLog = () => {

    let countFlower = 0;
    let countReligious = 0;
    let countCleaning = 0;
    let countInternal = 0;
    let countExternal = 0;
    let countLanguage = 0;

    const getCounts = async () => {
        try {
            countFlower = await axios.get("/api/get-stats/flower", {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            countReligious = await axios.get("/api/get-stats/religious", {
                headers: {
                    "Content-Type": 'application/json'
                }
            });

            countCleaning = await axios.get("/api/get-stats/cleaning", {
                headers: {
                    "Content-Type": 'application/json'
                }
            });

            countInternal = await axios.get("/api/get-stats/internal-transportation", {
                headers: {
                    "Content-Type": 'application/json'
                }
            });

            countExternal = await axios.get("/api/get-stats/external-transportation", {
                headers: {
                    "Content-Type": 'application/json'
                }
            });

            countLanguage = await axios.get("/api/get-stats/language", {
                headers: {
                    "Content-Type": 'application/json'
                }
            });

        } catch (error) {
            console.error('Error getting data:', error);
        }
    };
    getCounts().then();


    ChartJS.register(ArcElement, Tooltip, Legend);
    const statusData = {
        labels: ['Flower', 'Religious', 'Cleaning', 'Internal Transport', 'External Transport', 'Language'],
        datasets: [
            {
                label: '# of Requests per Service',
                data: [countFlower, countReligious, countCleaning, countInternal, countExternal, countLanguage],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

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

                            <Pie className="w-[1000px]" data={statusData} />

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
