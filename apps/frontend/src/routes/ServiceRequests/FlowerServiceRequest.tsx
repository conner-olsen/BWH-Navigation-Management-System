
import React from 'react';
import BackButton from "../../components/BackButton.tsx";
import NavBar from "../../components/NavBar.tsx";

const FlowerServiceRequest = () => {
    return (
        <div>
            <BackButton link={"/UserSelection"}></BackButton>
            <NavBar></NavBar>
            <h1 style={{fontSize: 30}}>Flower Delivery Form</h1>
            <div className={"flowerService"}>
            <form action="/submit" method="post">
                <label htmlFor="flowerType">Select the type of flowers:</label>
                <select id="flowerType" name="flowerType" required className={"flowerTypeForm"}>
                    <option value="daffodils">Daffodil</option>
                    <option value="daisies">Daisies</option>
                    <option value="hydrangeas">Daisies</option>
                    <option value="lilies">Lilies</option>
                    <option value="marigolds">Marigolds</option>
                    <option value="orchids">Orchid</option>
                    <option value="roses">Roses</option>
                    <option value="sunflowers">Sunflowers</option>
                    <option value="tulips">Tulips</option>
                </select>

                <br/>

                <label htmlFor="roomDetails">Room Details:</label>
                <input type="text" id="roomDetails" name="roomDetails" placeholder="Ex. 305" required/>


                <br/>

                <label htmlFor="patientName">Patient's Name:</label>
                <input type="text" id="patientName" name="patientName" placeholder="Armando Pérez" required/>

                <br/>

                <label htmlFor="deliveryDateTime">Date and Time of Delivery:</label>
                <input type="datetime-local" id="deliveryDateTime" name="deliveryDateTime" required/>

                <br/>

                <p>
                    Add a note:
                </p>
                <textarea placeholder={"Get well soon! We miss you so much"}></textarea>


                <br/>

                <input type="submit" value="Submit"/>
            </form>
</div>

        </div>
    );
};


export default FlowerServiceRequest;
/*
import React, { useState } from 'react';

const FlowerForm: React.FC = () => {
    const [formData, setFormData] = useState({
        // Your form fields here (e.g., name, color, etc.)
        name: '',
        color: '',
        // Add other fields as needed
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
                // Handle success, e.g., show a success message
                console.log('Data sent successfully');
            } else {
                // Handle error, e.g., show an error message
                console.error('Error sending data');
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            {/!* Your form fields go here *!/}
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <label>
                Color:
                <input type="text" name="color" value={formData.color} onChange={handleChange} />
            </label>
            {/!* Add other form fields as needed *!/}
            <button type="submit">Submit</button>
        </form>
    );
};

export default FlowerForm;
*/
