import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

type Status = {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
        borderColor: string[];
        borderWidth: number;
    }[];
};

const CreateSRChart = () => {
    const [chartData, setChartData] = useState<Status>();

    useEffect(() => {
        const getCounts = async () => {
            try {
                const responseFlower = await axios.get("/api/get-stats/flower", {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });
                const countFlower = responseFlower.data;

                const responseReligious = await axios.get("/api/get-stats/religious", {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });
                const countReligious = responseReligious.data;

                const responseCleaning = await axios.get("/api/get-stats/cleaning", {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });
                const countCleaning = responseCleaning.data;

                const responseInternal = await axios.get("/api/get-stats/internal-transportation", {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });
                const countInternal = responseInternal.data;

                const responseExternal = await axios.get("/api/get-stats/external-transportation", {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });
                const countExternal = responseExternal.data;

                const responseLanguage = await axios.get("/api/get-stats/language", {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });
                const countLanguage = responseLanguage.data;

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

                setChartData(statusData);

            } catch (error) {
                console.error('Error getting data:', error);
            }
        };

        getCounts().then();
    }, []); // Empty dependency array to ensure the effect runs only once

    return (
        <div>
            {chartData && (
                <Pie className="w-[1000px]" data={chartData} />
            )}
        </div>
    );
};

export default CreateSRChart;
