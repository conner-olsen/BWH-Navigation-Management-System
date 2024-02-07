import NavBar from "../../components/NavBar.tsx";
import React, { useState } from 'react';
import axios from "axios";


function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

const FlowerServiceRequest: React.FC = () => {
    const [formData, setFormData] = useState({
        id: getRandomInt(10000),
        senderName: '',
        senderEmail: '',
        roomLongName: '',
        patientName: '',
        flowerType: '',
        deliveryDate: '',
        note: '',
        status: 'Assigned',
        employeeUser: 'none'
    });


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setFormData({
            id: 0,
            senderName: '',
            senderEmail: '',
            roomLongName: '',
            patientName: '',
            flowerType: '',
            deliveryDate: '',
            note: '',
            status: '',
            employeeUser: ''
        });
        try {
            const response = await axios.post("/api/populate-flower-service-request", JSON.stringify(formData), {
                headers: {
                    "Content-Type": 'application/json'
                }
            });

            if (response.status === 200) {
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
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };


    const populateEmployeeTable = () => {
        axios.patch("/api/populate-employee", {

        }).then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <NavBar></NavBar>
            <button className="inline-block p-2.5 text-center text-light-blue cursor-pointer
                           border-light-blue rounded-md border-solid border-2
                           transition-all transition-duration-300
                           hover:bg-light-blue hover:text-white" onClick={populateEmployeeTable}>Populate Employee Table
            </button>
            <div className="container">
                <h1 className="font-roboto font-bold text-dark-blue">FLOWER DELIVERY FORM</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between">
                        <div className="flex flex-col grow pr-2">
                            <label htmlFor="senderName" className="font-bold">Sender Name</label>
                            <input type="text" id="senderName" name="senderName" placeholder={"John Doe"} required
                                value={formData.senderName} onChange={handleChange}
                                className="form-input"/>
                            <label htmlFor="senderEmail" className="font-bold">Sender Email</label>
                            <input type="text" id="senderEmail" name="senderEmail" placeholder={"John@gmail.com"} required
                                value={formData.senderEmail} onChange={handleChange} className="form-input"/>
                            <label htmlFor="roomLongName" className="font-bold">Room Name</label>
                            <input type="text" id="roomLongName" name="roomLongName" placeholder={"Anesthesia Conf Floor L1 (Node longName)"} required
                                value={formData.roomLongName} onChange={handleChange} className="form-input"/>
                        </div>
                        <div className="flex flex-col grow pl-2">
                            <label htmlFor="patientName" className="font-bold">Patient's Name</label>
                            <input type="text" id="patientName" name="patientName" placeholder="Jared Smith" required
                                value={formData.patientName} onChange={handleChange} className="form-input"/>
                            <label htmlFor="flowerType" className="font-bold">Select the type of flowers</label>
                            <select id="flowerType" name="flowerType" required className="form-input"
                                value={formData.flowerType} onChange={handleChange} >
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

                            <label htmlFor="deliveryDateTime" className="font-bold">Date of Delivery</label>
                            <input type="text" id="deliveryDate" name="deliveryDate" placeholder={"01/15/1981"} required
                                value={formData.deliveryDate} onChange={handleChange} className="form-input"/>
                        </div>
                    </div>
                    <label className="font-bold">Add a note</label>
                    <textarea placeholder={"I heard you're going through tough times. Get well soon!"}
                        name="note" value={formData.note} onChange={handleChange} className="form-input"></textarea>
                    <input type="submit" value="Submit"
                           className="mt-5"/>

                </form>
            </div>

        </div>
    );
};

export default FlowerServiceRequest;
