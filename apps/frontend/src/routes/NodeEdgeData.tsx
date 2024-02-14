import {Outlet} from "react-router-dom";
import DragNDrop from "../components/DragNDrop.tsx";
import {Col, Container, Row} from "react-bootstrap";
import {GetDataNodes} from "../components/NodesDataBaseTableDisplay.tsx";
import ExportNodeDataToCSVButton from "../components/ExportNodeDataButton.tsx";
import {Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs.tsx";
import ExportEdgeDataButton from "../components/ExportEdgeDataButton.tsx";
import {GetDataEdges} from "../components/EdgesDataBaseTableDisplay.tsx";
import Global_Footer from "../components/Global_Footer.tsx";

export function NodeEdgeData() {


    const handleNodeFileDrop = async(file: File) => {
        // Create a FileReader
        const nodeReader = new FileReader();

        // Set up a callback for when the file is loaded
        nodeReader.onload = async (event) => {
            if (event.target) {
                // Extract the CSV content as a string
                const csvString = event.target.result as string;

                console.log(csvString);

                try {
                    const res = await fetch("/api/node-populate", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json", // Set the appropriate content type
                        },
                        body: JSON.stringify({csvString}), // Send the CSV string as JSON
                    });


                    console.log(res);
                } catch (error) {
                    console.error("Error:", error);
                }
            }

        };
        nodeReader.readAsText(file);
    };

    const handleEdgeFileDrop = async(file: File) => {
        // Create a FileReader
        const edgeReader = new FileReader();

        // Set up a callback for when the file is loaded
        edgeReader.onload = async (event) => {
            if (event.target) {
                // Extract the CSV content as a string
                const csvString = event.target.result as string;

                console.log(csvString);

                try {
                    const res = await fetch("/api/edge-populate", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json", // Set the appropriate content type
                        },
                        body: JSON.stringify({csvString}), // Send the CSV string as JSON
                    });


                    console.log(res);
                } catch (error) {
                    console.error("Error:", error);
                }
            }

        };
        edgeReader.readAsText(file);
    };


    return (
        <>


            <Outlet></Outlet>

            <Container>
                <Row>
                    <Col>
                        <h1 className="m-0 text-left">Node Data</h1>
                        <Container>
                            <ExportNodeDataToCSVButton></ExportNodeDataToCSVButton>
                        </Container>
                        <br/>
                        <DragNDrop onFileDrop={handleNodeFileDrop}></DragNDrop>
                    </Col>
                    <Col>
                        <h1 className="m-0 text-left">Edge Data</h1>
                        <Container>
                            <ExportEdgeDataButton></ExportEdgeDataButton>
                        </Container>
                        <br/>
                        <DragNDrop onFileDrop={handleEdgeFileDrop}></DragNDrop>
                    </Col>
                </Row>
            </Container>

            <Container className="mt-4">
                <Tabs defaultValue="node">
                    <TabsList className={"w-fit"}>
                        <TabsTrigger value="node" className={"text-center"}>Node Data</TabsTrigger>
                        <TabsTrigger value="edge" className={"text-center"}>Edge Data</TabsTrigger>
                    </TabsList>
                    <TabsContent value="node">

                        <Container>
                            <GetDataNodes></GetDataNodes>
                        </Container>
                    </TabsContent>
                    <TabsContent value="edge">

                        <Container>
                            <GetDataEdges></GetDataEdges>
                        </Container>
                    </TabsContent>
                </Tabs>
            </Container>


            <Global_Footer />
        </>
    );

}
