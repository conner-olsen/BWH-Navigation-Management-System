import {Outlet} from "react-router-dom";
import BackButton from "../components/BackButton.tsx";
import DragNDrop from "../components/DragNDrop.tsx";
//import { useState } from 'react';
import {Container} from "react-bootstrap";
import NavBar from "../components/NavBar.tsx";
import MapDisplay from "../components/MapDisplay.tsx";

export function MapRoute() {


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

    // function generateTableRows(data: DataItem[]): JSX.Element[] {
    //     return data.map((item, index) => (
    //         <tr key={index}>
    //             <td>{item.property1}</td>
    //             <td>{item.property2}</td>
    //             <td>{item.property3}</td>
    //             <td>{item.property4}</td>
    //             <td>{item.property5}</td>
    //             <td>{item.property6}</td>
    //             <td>{item.property7}</td>
    //             <td>{item.property8}</td>
    //         </tr>
    //     ));
    // }
    //
    // const Table: React.FC<{ data: DataItem[] }> = ({data}) => {
    //     return (
    //         <table>
    //             <thead>
    //             <tr>
    //                 <th>Column 1</th>
    //                 <th>Column 2</th>
    //                 <th>Column 3</th>
    //                 <th>Column 4</th>
    //                 <th>Column 5</th>
    //                 <th>Column 6</th>
    //                 <th>Column 7</th>
    //                 <th>Column 8</th>
    //
    //             </tr>
    //             </thead>
    //             <tbody>
    //             {generateTableRows(data)}
    //             </tbody>
    //         </table>
    //     );
    // };

        return (
            <div>
                <Outlet></Outlet>
                <NavBar></NavBar>


                <BackButton link={"/"}></BackButton>
                {/*<img*/}
                {/*    className={"pictureOfL1"}*/}
                {/*    src="public/maps/L1map.png"*/}
                {/*    alt="Lower Level of Hospital (L1)"*/}
                {/*    style={{marginTop: "60px"}}*/}
                {/*/>*/}
                <MapDisplay /> {/* Use MapDisplay component */}
                <br/>
                <br/>

                <DragNDrop onFileDrop={handleFileDrop}></DragNDrop>
                <br/>

                <Container className="CsvDataText">
                    <p>CSV File: </p>
                    <br/>
                </Container>
            </div>
        );

}
