import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";

export default function UserAuthentication() {
    const {
        user,
    } = useAuth0();


    const authenticate = async () => {
        try {
            // Send a GET request
            const response = await axios.get("/api/populate-autho", {
                headers: {
                    "Content-Type": 'application/json'
                }
            });

            console.log('Data fetched successfully');

            // Check if the response status is 200
            if (response.status === 200) {
                console.log('Employee already exists');
            } else {
                console.log('Unexpected response status:', response.status);
            }
        } catch (error) {
            // Handle errors
            console.error('Error fetching data:', error);

            // If the GET request fails, you can handle the error and attempt a POST request
            try {
                const postResponse = await axios.post("/api/populate-autho", JSON.stringify(user), {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });
                console.log('Data sent successfully');
            } catch (postError) {
                console.error('Error sending data:', postError);
            }
        }
    };

    return (
        <></>
    );
}
