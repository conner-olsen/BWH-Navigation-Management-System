import React from "react";
import { BFSComponent } from "../components/BFSComponent.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar.tsx";
import BackButton from "../components/BackButton.tsx";
export default function BFSRoute() {
    return (
        <div className="BFSBox">
            <NavBar></NavBar>
            <BackButton></BackButton>
            <BFSComponent />
        </div>
    );
}
