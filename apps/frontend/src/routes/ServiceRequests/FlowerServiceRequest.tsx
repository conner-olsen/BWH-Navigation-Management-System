
import BackButton from "../../components/BackButton.tsx";
import NavBar from "../../components/NavBar.tsx";
import React, { useState } from 'react';
import axios from "axios";


const FlowerServiceRequest: React.FC = () => {
    const [formData, setFormData] = useState({
        senderName: '',
        senderEmail: '',
        roomLongName: '',
        patientName: '',
        flowerType: '',
        deliveryDate: '',
        note: '',
        status: 'Assigned',
        employeeID: ''
    });


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setFormData({
            senderName: '',
            senderEmail: '',
            roomLongName: '',
            patientName: '',
            flowerType: '',
            deliveryDate: '',
            note: '',
            status: 'Assigned',
            employeeID: ''

        });
        try {
            const response = await axios.post("/api/populate-flower-service-request", JSON.stringify(formData), {
                headers: {
                    "Content-Type": 'application/json'
                }
            });

            if (response.status == 200) {
                console.log('Data sent successfully');
            } else {
                console.error('Error sending data');
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        // console.log(event.target.value);
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const currentDateTime = new Date().toISOString().slice(0, 16);
    return (
        <div>
            <BackButton></BackButton>
            <NavBar></NavBar>
            <h1 className={"pageHeader"}>Flower Delivery Form</h1>
            <br/>
            <form className={"flowerService"} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="senderName">Sender Name</label>
                    <input
                        type="text"
                        id="senderName"
                        name="senderName"
                        placeholder={"John Doe"}
                        required
                        value={formData.senderName}
                        onChange={handleChange}
                    />
                    <label htmlFor="senderEmail">Sender Email</label>
                    <input
                        type="text"
                        id="senderEmail"
                        name="senderEmail"
                        placeholder={"John@gmail.com"}
                        required
                        value={formData.senderEmail}
                        onChange={handleChange}
                    />

                    <label htmlFor="roomLongName">Room Name</label>
                    <input
                        type="text"
                        id="roomLongName"
                        name="roomLongName"
                        placeholder={"Anesthesia Conf Floor L1 (Node longName)"}
                        required
                        value={formData.roomLongName}
                        onChange={handleChange}
                    />
                    <label htmlFor="patientName">Patient's Name</label>
                    <input
                        type="text"
                        id="patientName"
                        name="patientName"
                        placeholder="Jared Smith"
                        required
                        value={formData.patientName}
                        onChange={handleChange}
                    />

                    <label htmlFor="flowerType">Select the type of flowers</label>
                    <select
                        id="flowerType"
                        name="flowerType"
                        required
                        className={"flowerTypeForm"}
                        value={formData.flowerType}
                        onChange={handleChange}
                    >
                        <option value="/">Select</option>
                        <option value="daffodils">Daffodil</option>
                        <option value="daisies">Daisies</option>
                        <option value="hydrangeas">Hydrangeas</option>
                        <option value="lilies">Lilies</option>
                        <option value="marigolds">Marigolds</option>
                        <option value="orchids">Orchid</option>
                        <option value="roses">Roses</option>
                        <option value="sunflowers">Sunflowers</option>
                        <option value="tulips">Tulips</option>
                    </select>

                    <label htmlFor="deliveryDateTime">Date of Delivery</label>
                    <input
                        type="text"
                        id="deliveryDate"
                        name="deliveryDate"
                        placeholder={"01/15/1981"}
                        required
                        value={formData.deliveryDate}
                        onChange={handleChange}
                        min={currentDateTime}
                    />

                    <label>Add a note</label>
                    <textarea
                        placeholder={"I heard you're going through tough times. Get well soon!"}
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                    ></textarea>
                    <br/>
                    <br/>
                    <br/>
                    <input type="submit" value="Submit"/>
                </div>
            </form>
        </div>
    );
};

export default FlowerServiceRequest;
