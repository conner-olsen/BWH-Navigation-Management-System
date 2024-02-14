import NavBar from "../../components/NavBar.tsx";
import React, { useState } from 'react';
import axios from "axios";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../../components/ui/select.tsx";
import {Button} from "../../components/ui/button.tsx";
import {Textarea} from "../../components/ui/textarea.tsx";


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



    return (
        <div>
            <NavBar></NavBar><div className="mt-20"> {/* Added mx-4 for left and right margins, mt-6 for top margin */}

        </div>

            <div className="mx-40">
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

                    {/* First Row - Flower Delivery Service with Smaller Image */}
                    <div className="mb-3 col-span-2 flex items-center">
                        <div>
                            <h1 className="font-roboto font-bold text-6xl text-dark-blue mb-1 text-left">FLOWER</h1>
                            <h1 className="font-roboto font-bold text-6xl text-dark-blue text-left">DELIVERY</h1>
                        </div>
                        <img src="/service-images-transparent/flower_serviceT.png" alt="Flower Service" className="mr-2"
                             style={{width: '150px', height: '150px'}}/>
                    </div>

                    {/* Second Row - Sender Name and Patient's Name */}
                    <div className="mb-3">
                        <label className="block text-foreground text-xl font-bold mb-2" htmlFor="senderName">SENDER
                            NAME</label>
                        <Textarea label="" id="senderName" name="senderName" placeholder="John Doe" required
                                  value={formData.senderName} onChange={handleChange} className="font-roboto text-lg"/>
                    </div>

                    <div className="mb-3">
                        <label className="block text-foreground text-sm font-bold mb-2 text-xl" htmlFor="patientName">PATIENT'S
                            NAME</label>
                        <Textarea label="" id="patientName" name="patientName" placeholder="Jared Smith" required
                                  value={formData.patientName} onChange={handleChange} className="font-roboto text-lg"/>
                    </div>

                    {/* Third Row - Sender Email and Flower Type */}
                    <div className="mb-3">
                        <label className="block text-foreground text-sm font-bold mb-2 text-xl" htmlFor="senderEmail">SENDER
                            EMAIL</label>
                        <Textarea label="" id="senderEmail" name="senderEmail" placeholder="John@gmail.com" required
                                  value={formData.senderEmail} onChange={handleChange} className="font-roboto text-lg"/>
                    </div>

                    <div className="mb-3 ">
                        <label className="block text-foreground text-sm font-bold mb-2 text-xl" htmlFor="flowerType">TYPE OF
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
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Fourth Row - Room Name and Delivery Date */}
                    <div className="mb-3">
                        <label className="block text-foreground text-sm font-bold mb-2 text-xl" htmlFor="roomLongName">ROOM
                            NAME</label>
                        <Textarea label="" id="roomLongName" name="roomLongName"
                                  placeholder="Anesthesia Conf Floor L1 (Node longName)" required
                                  value={formData.nodeID} onChange={handleChange}
                                  className="font-roboto text-lg"/>
                    </div>

                    <div className="mb-3">
                        <label className="block text-foreground text-sm font-bold mb-2 text-xl" htmlFor="deliveryDate">DATE
                            OF DELIVERY</label>
                        <Textarea label="" id="deliveryDate" name="deliveryDate" placeholder="01/15/1981" required
                                  value={formData.deliveryDate} onChange={handleChange}
                                  className="font-roboto text-lg"/>
                    </div>

                    {/* Fifth Row - Add a Note */}
                    <div className="col-span-2 mb-3">
                        <label className="block text-foreground text-sm font-bold mb-2 text-xl" htmlFor="note">ADD A
                            NOTE</label>
                        <Textarea label="" name="note"
                                  placeholder="I heard you're going through tough times. Get well soon!"
                                  value={formData.note} onChange={handleChange} className="font-roboto text-lg"/>
                    </div>

                    {/* Sixth Row - Buttons */}
                    <div className="mb-2 flex justify-center w-full col-span-2"> {/* Changed justify-end to justify-center */}
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
