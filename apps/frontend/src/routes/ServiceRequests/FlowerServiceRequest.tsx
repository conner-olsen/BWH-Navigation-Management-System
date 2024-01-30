
import React from 'react';
import BackButton from "../../components/BackButton.tsx";
import NavBar from "../../components/NavBar.tsx";

const FlowerServiceRequest = () => {
    return (
        <div>
            <BackButton link={"/UserSelection"}></BackButton>
            <NavBar></NavBar>
            <body>
            <h1>Flower Delivery Form</h1>

            <form action="/submit" method="post">
                <label htmlFor="flowerType">Select the type of flowers:</label>
                <select id="flowerType" name="flowerType" required className={"flowertypeform"}>
                    <option value="roses">Roses</option>
                    <option value="lilies">Lilies</option>
                    <option value="tulips">Tulips</option>
                    <option value="daisies">Daisies</option>
                    <option value="hydrangeas">Daisies</option>
                    <option value="daffodil">Daffodil</option>
                    <option value="orchid">Orchid</option>
                    <option value="sunflowers">Sunflowers</option>
                    <option value="marigolds">Marigolds</option>
                </select>

                <br/>

                <label htmlFor="roomDetails">Room Details:</label>
                <input type="text" id="roomDetails" name="roomDetails" placeholder="Ex. 305" required/>


                <br/>

                <label htmlFor="patientName">Patient's Name:</label>
                <input type="text" id="patientName" name="patientName" placeholder="John Doe" required/>

                <br/>

                <label htmlFor="deliveryDateTime">Date and Time of Delivery:</label>
                <input type="datetime-local" id="deliveryDateTime" name="deliveryDateTime" required/>

                <br/>

                <p>
                    Addition Information:
                </p>
                <textarea></textarea>


                <br/>

                <input type="submit" value="Submit"/>
            </form>

            </body>

        </div>
    );
};

export default FlowerServiceRequest;
