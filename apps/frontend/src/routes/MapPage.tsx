import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import BackButton from "../components/BackButton.tsx";
import NavBar from "../components/NavBar.tsx";

export default function MapPage() {
    const [selectedPhoto, setSelectedPhoto] = useState("00_thegroundfloor.png");
    const [floorName, setFloorName] = useState("The Ground Floor");

    const handlePhotoChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedPhoto(event.target.value);

        switch (event.target.value) {
            case "00_thegroundfloor.png":
                setFloorName("The Ground Floor");
                break;
            case "00_thelowerlevel1.png":
                setFloorName("The Lower Level 1");
                break;
            case "00_thelowerlevel2.png":
                setFloorName("The Lower Level 2");
                break;
            case "01_thefirstfloor.png":
                setFloorName("Floor 1");
                break;
            case "02_thesecondfloor.png":
                setFloorName("Floor 2");
                break;
            case "03_thethirdfloor.png":
                setFloorName("Floor 3");
                break;
            default:
                setFloorName("");
        }
    };

    return (
        <div style={{textAlign: "center", marginTop: "20px"}}>
            <NavBar/>
            <div style={{
                position: "absolute",
                top: "40px",  // Adjust the top value to move it higher
                right: "10px",  // Adjust the right value to move it to the right
            }}>
                <BackButton/>
            </div>

            <div style={{marginLeft: "10px", marginBottom: "20px", textAlign: "left"}}>
                <label htmlFor="photoSelector" style={{fontWeight: "bold", display: "block"}}>
                    Select Map:
                </label>
                <select
                    id="photoSelector"
                    value={selectedPhoto}
                    onChange={handlePhotoChange}
                    style={{width: "300px"}}
                >
                    <option value="00_thegroundfloor.png">The Ground Floor</option>
                    <option value="00_thelowerlevel1.png">The Lower Level 1</option>
                    <option value="00_thelowerlevel2.png">The Lower Level 2</option>
                    <option value="01_thefirstfloor.png">Floor 1</option>
                    <option value="02_thesecondfloor.png">Floor 2</option>
                    <option value="03_thethirdfloor.png">Floor 3</option>
                </select>
            </div>


            <div style={{
                background: "linear-gradient(to right, #3498db, #000000)",
                borderRadius: "10px",
                padding: "10px",
                width: "900px",
                marginLeft: "500px",
                marginTop: "20px"

            }}>
                <div style={{
                    color: "white",
                    fontWeight: "bold"
                }}>
                    {floorName && `Floor: ${floorName}`}
                </div>
            </div>


            <div style={{
                display: "inline-block",
                background: "linear-gradient(to right, #3498db, #000000)",
                borderRadius: "10px",
                padding: "20px",
                marginTop: "20px"
            }}>
                <img
                    className="pictureOfL1"
                    src={`public/icon/${selectedPhoto}`}
                    alt={`Map: ${selectedPhoto}`}
                    style={{
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                        borderRadius: "10px"
                    }}
                />
            </div>

            <Outlet/>
        </div>

    );
}

