import axios from "axios";
import {useEffect} from "react";
// import {Card, CardContent} from "../ui/card.tsx";
import {Container} from "react-bootstrap";

let countProgress: number = 0;
let countCompleted: number = 0;
let countAssigned: number = 0;
let countUnassigned: number = 0;
let countTotal: number = 0;

const CompletionStats = () => {

    useEffect(() => {
        const getStats = async () => {
            try {
                const responseCompleted = await axios.get("/api/get-stats/status/completed", {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });
                console.log(responseCompleted.data);
                countCompleted = responseCompleted.data;

                const responseProgress = await axios.get("/api/get-stats/status/in-progress", {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });
                console.log(responseProgress.data);
                countProgress = responseProgress.data;

                const responseAssigned = await axios.get("/api/get-stats/status/assigned", {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });
                console.log(responseAssigned.data);
                countAssigned = responseAssigned.data;

                const responseUnassigned = await axios.get("/api/get-stats/status/unassigned", {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });
                console.log(responseUnassigned.data);
                countUnassigned = responseUnassigned.data;

                const responseTotal = await axios.get("/api/get-stats/type/all", {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });
                //console.log(responseTotal.data);
                countTotal = responseTotal.data;

            } catch (error) {
                console.error('Error getting data:', error);
            }
        };

        getStats()
            .then();
    }, []); // Empty dependency array to ensure the effect runs only once

    return (
        <Container>
            <p>Completed: {countCompleted}</p>

            <p>In Progress: {countProgress}</p>

            <p>Assigned: {countAssigned}</p>

            <p>Unassigned: {countUnassigned}</p>

            <p>Total: {countTotal}</p>
        </Container>
    );
};
export default CompletionStats;
