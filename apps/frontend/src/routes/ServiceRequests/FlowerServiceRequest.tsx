import NavBar from "../../components/NavBar.tsx";
import React, { useState } from 'react';
import axios from "axios";
import { Textarea } from "../../components/ui/textarea.tsx";
import { Button } from "../../components/ui/button.tsx";
import { Select, SelectTrigger,SelectItem,SelectContent,SelectValue,SelectGroup } from "../../components/ui/select.tsx";


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



    return (
        <div>
            <NavBar></NavBar>
            <div className="mt-20"> {/* Added mx-4 for left and right margins, mt-6 for top margin */}

            </div>

            <div className="mx-40">
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

                    {/* First Row - Flower Delivery Service with Smaller Image */}
                    <div className="mb-3 col-span-2 flex items-center">
                        <div>
                            <h1 className="font-roboto font-bold text-6xl text-dark-blue mb-1 text-left">FLOWER</h1>
                            <h1 className="font-roboto font-bold text-6xl text-dark-blue text-left">DELIVERY</h1>
                        </div>
                        <img src="/flower_service.jpg" alt="Flower Service" className="mr-2"
                             style={{width: '150px', height: '150px'}}/>
                    </div>

                    {/* Second Row - Sender Name and Patient's Name */}
                    <div className="mb-3">
                        <label className="block text-black text-xl font-bold mb-2" htmlFor="senderName">SENDER
                            NAME</label>
                        <Textarea label="" id="senderName" name="senderName" placeholder="John Doe" required
                                  value={formData.senderName} onChange={handleChange} className="font-roboto text-lg"/>
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
