import {Outlet} from "react-router-dom";
import BackButton from "../components/BackButton.tsx";
import DragNDrop from "../components/DragNDrop.tsx";
import axios from "axios";
import { useState } from 'react';
import {Container} from "react-bootstrap";

export function MapRoute() {
    // let CSVString: string = "";
    const [CSVString, setCSVString] = useState("");
    let returnedJSON: string = "";

    const handleFileDrop = (file: File) => {
        const reader = new FileReader();

        console.log('Dropped file:', file);
        reader.addEventListener(
            "load",
            () => {
                // this will then display a text file
                if (typeof (reader.result) === "string") {
                    setCSVString(reader.result);
                    // CSVString = reader.result;
                    console.log('File contends', CSVString);
                } else {
                    // CSVString = "Failed";
                    setCSVString("Failed");
                    console.log('No Content');
                }
            },
            false,
        );

        if (file) {
            reader.readAsText(file);
        }
    };

    axios
        .post("/api/csv-to-json")
        .then((response) => {
            // This just prints the JSON string to the console, but you can do anything with it here
            returnedJSON = JSON.stringify(response.data, null, 2);
            console.log(returnedJSON);
        })
        .catch((error) => {
            console.error(`Error: ${error}`);
        });

    return (
        <div>
            <Outlet></Outlet>
            <BackButton link={"/"}></BackButton>
            <img
                className={"pictureOfL1"}
                src="public/icon/00_thelowerlevel1 (2).png"
                alt="Lower Level of Hospital (L1)"
                style={{marginTop: "60px"}}
            />
            <br/>
            <DragNDrop onFileDrop={handleFileDrop}></DragNDrop>
            <br/>

            <Container className="CsvDataText">
                <p>CSV File: </p>
                <br/>
                <div> {CSVString}</div>
            </Container>
        </div>
    );
}
