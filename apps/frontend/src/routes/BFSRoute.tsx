import React from "react";
import { BFSComponent } from "../components/BFSComponent.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar.tsx";
export default function BFSRoute() {
    return (
        <div className="BFSBox">
            <NavBar></NavBar>
            <BFSComponent />
        </div>
    );
}
