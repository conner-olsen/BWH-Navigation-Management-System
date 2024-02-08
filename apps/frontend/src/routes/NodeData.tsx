import {Outlet} from "react-router-dom";
import DragNDrop from "../components/DragNDrop.tsx";
import {Container} from "react-bootstrap";
import NavBar from "../components/NavBar.tsx";
import {GetDataNodes} from "../components/NodesDataBaseTableDisplay.tsx";
import ExportNodeDataToCSVButton from "../components/ExportNodeDataButton.tsx";

export function NodeData() {


    const handleFileDrop = async(file: File) => {
        // Create a FileReader
        const reader = new FileReader();

        // Set up a callback for when the file is loaded
        reader.onload = async (event) => {
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
        reader.readAsText(file);
    };


        return (
            <div>
                <Outlet></Outlet>
                <NavBar></NavBar>

                <h1 className="m-0 text-center">Node Data</h1>

                <br/>

                <Container>
                <ExportNodeDataToCSVButton></ExportNodeDataToCSVButton>
                </Container>

                <br/>

                <DragNDrop onFileDrop={handleFileDrop}></DragNDrop>

                <br/>
                <Container>
                    <GetDataNodes></GetDataNodes>
                </Container>

            </div>
        );

}
