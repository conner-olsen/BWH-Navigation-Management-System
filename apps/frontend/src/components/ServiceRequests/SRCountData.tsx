import React, { useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';


let countFlower: number = 0;
let countCleaning: number = 0;
let countExternal: number = 0;
let countInternal: number = 0;
let countLanguage: number = 0;
let countReligious: number = 0;
const CreateSRChart = () => {

    useEffect(() => {
        const getCounts = async () => {
            try {
                const responseFlower = await axios.get("/api/get-stats/type/flower", {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });
                //console.log(responseFlower.data);
                countFlower = responseFlower.data;

                const responseReligious = await axios.get("/api/get-stats/type/religious", {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });
                //console.log(responseReligious.data);
                countReligious = responseReligious.data;


                const responseCleaning = await axios.get("/api/get-stats/type/cleaning", {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });
                //console.log(responseCleaning.data);
                countCleaning = responseCleaning.data;

                const responseInternal = await axios.get("/api/get-stats/type/internal-transportation", {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });
                //console.log(responseInternal.data);
                countInternal = responseInternal.data;

                const responseExternal = await axios.get("/api/get-stats/type/external-transportation", {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });
                //console.log(responseExternal.data);
                countExternal = responseExternal.data;

                const responseLanguage = await axios.get("/api/get-stats/type/language", {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });
                //console.log(responseLanguage.data);
                countLanguage = responseLanguage.data;

            } catch (error) {
                console.error('Error getting data:', error);
            }
        };

        getCounts().then();
    }, []); // Empty dependency array to ensure the effect runs only once


    // Create the chart data
    const statusData = {
        labels: ['Flower', 'Religious', 'Cleaning', 'Internal Transport', 'External Transport', 'Language'],
        datasets: [
            {
                label: '# of Requests per Service',
                data: [countFlower, countReligious, countCleaning, countInternal, countExternal, countLanguage],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <Pie data={statusData} />
        </div>
    );
};

export default CreateSRChart;
