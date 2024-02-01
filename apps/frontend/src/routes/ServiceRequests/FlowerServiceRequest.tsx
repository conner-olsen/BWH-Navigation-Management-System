
import BackButton from "../../components/BackButton.tsx";
import NavBar from "../../components/NavBar.tsx";
import React, { useState } from 'react';

const FlowerServiceRequest: React.FC = () => {
    const [formData, setFormData] = useState({
        roomLongName: '',
        senderName: '',
        senderEmail: '',
        flowerType: '', // Add flowerType to formData
        roomNum: '',
        patientName: '',
        deliveryDate: '',
        note: '', // Add note to formData
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch('your_backend_endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
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
        console.log(event.target.value);
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const currentDateTime = new Date().toISOString().slice(0, 16);
    console.log(currentDateTime);
    return (
        <form onSubmit={handleSubmit}>
            <BackButton link={"/UserSelection"}></BackButton>
            <NavBar></NavBar>
            <h1 style={{ fontSize: 30 }}>Flower Delivery Form</h1>
            <div className={"flowerService"}>
                <label htmlFor="senderName">Sender Name</label>
                <input
                    type="text"
                    id="senderName"
                    name="senderName"
                    placeholder={"Mr. Worldwide"}
                    required
                    onChange={handleChange}
                />
                <label htmlFor="senderEmail">Sender Email</label>
                <input
                    type="text"
                    id="senderEmail"
                    name="senderEmail"
                    placeholder={"mr305mrworldwide@gmail.com"}
                    required
                    onChange={handleChange}
                />

                <label htmlFor="roomLongName">Room Name</label>
                <input
                    type="text"
                    id="roomLongName"
                    name="roomLongName"
                    placeholder={"Hotel Room"}
                    required
                    onChange={handleChange}
                />
                <label htmlFor="patientName">Patient's Name</label>
                <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    placeholder="Armando Pérez"
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
    );
};

export default FlowerServiceRequest;
