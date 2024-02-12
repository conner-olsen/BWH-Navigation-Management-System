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
        nodeID: '',
        patientName: '',
        flowerType: '',
        deliveryDate: '',
        note: '',
        status: 'UnAssigned',
        employeeUser: 'none'
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setFormData({
            id: 0,
            senderName: '',
            senderEmail: '',
            nodeID: '',
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
        const {name, value} = event.target;
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
                            <label htmlFor="nodeID" className="font-bold">Room ID</label>
                            <input type="text" id="nodeID" name="nodeID" placeholder={"ACONF00102"} required
                                value={formData.nodeID} onChange={handleChange} className="form-input"/>
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

                    <div className="mb-3">
                        <label className="block text-black text-sm font-bold mb-2 text-xl" htmlFor="patientName">PATIENT'S
                            NAME</label>
                        <Textarea label="" id="patientName" name="patientName" placeholder="Jared Smith" required
                                  value={formData.patientName} onChange={handleChange} className="font-roboto text-lg"/>
                    </div>

                    {/* Third Row - Sender Email and Flower Type */}
                    <div className="mb-3">
                        <label className="block text-black text-sm font-bold mb-2 text-xl" htmlFor="senderEmail">SENDER
                            EMAIL</label>
                        <Textarea label="" id="senderEmail" name="senderEmail" placeholder="John@gmail.com" required
                                  value={formData.senderEmail} onChange={handleChange} className="font-roboto text-lg"/>
                    </div>

                    <div className="mb-3">
                        <label className="block text-black text-sm font-bold mb-2 text-xl" htmlFor="flowerType">TYPE OF
                            FLOWERS</label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="FLOWER TYPE" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="daffodils">Daffodil</SelectItem>
                                    <SelectItem value="daisies">Daisies</SelectItem>
                                    <SelectItem value="hydrangeas">Hydrangeas</SelectItem>
                                    <SelectItem value="lilies">Lilies</SelectItem>
                                    <SelectItem value="marigolds">Marigolds</SelectItem>
                                    <SelectItem value="orchids">orchids</SelectItem>
                                    <SelectItem value="roses">Roses</SelectItem>
                                    <SelectItem value="marigolds">Marigolds</SelectItem>

                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Fourth Row - Room Name and Delivery Date */}
                    <div className="mb-3">
                        <label className="block text-black text-sm font-bold mb-2 text-xl" htmlFor="roomLongName">ROOM
                            NAME</label>
                        <Textarea label="" id="roomLongName" name="roomLongName"
                                  placeholder="Anesthesia Conf Floor L1 (Node longName)" required
                                  value={formData.roomLongName} onChange={handleChange}
                                  className="font-roboto text-lg"/>
                    </div>

                    <div className="mb-3">
                        <label className="block text-black text-sm font-bold mb-2 text-xl" htmlFor="deliveryDate">DATE
                            OF DELIVERY</label>
                        <Textarea label="" id="deliveryDate" name="deliveryDate" placeholder="01/15/1981" required
                                  value={formData.deliveryDate} onChange={handleChange}
                                  className="font-roboto text-lg"/>
                    </div>

                    {/* Fifth Row - Add a Note */}
                    <div className="col-span-2 mb-3">
                        <label className="block text-black text-sm font-bold mb-2 text-xl" htmlFor="note">ADD A
                            NOTE</label>
                        <Textarea label="" name="note"
                                  placeholder="I heard you're going through tough times. Get well soon!"
                                  value={formData.note} onChange={handleChange} className="font-roboto text-lg"/>
                    </div>


                    {/* Sixth Row - Buttons */}
                    <div className="col-span-2 mb-3 flex justify-center"> {/* Changed justify-end to justify-center */}
                        <Button className="cursor-pointer" type="submit">
                            Submit
                        </Button>
                    </div>


                </form>
            </div>
        </div>
    );

};
export default FlowerServiceRequest;
