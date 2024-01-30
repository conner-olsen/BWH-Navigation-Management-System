import {Outlet} from "react-router-dom";
import BackButton from "../components/BackButton.tsx";
import DragNDrop from "../components/DragNDrop.tsx";
//import { useState } from 'react';
import {Container} from "react-bootstrap";
import NavBar from "../components/NavBar.tsx";

export function MapRoute() {


    const handleFileDrop = async(file: File) => {


        // Create a FormData object and append the file to it
        // const formData = new FormData();
        // formData.append('file', file);

        try {
            const res = await fetch("/api/node-populate", {
                method: "POST",
                body: file
            });

            console.log(res);
        } catch (error) {
            console.error("Error:", error);
        }

    };

        return (
            <div>
                <Outlet></Outlet>
                <NavBar></NavBar>
                <BackButton link={"/"}></BackButton>
                <img
                    className={"pictureOfL1"}
                    src="public/icon/00_thelowerlevel1 (2).png"
                    alt="Lower Level of Hospital (L1)"
                    style={{marginTop: "60px"}}
                />
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
