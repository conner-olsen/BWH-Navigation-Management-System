import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const CreateSRChart = () => {
    const [counts, setCounts] = useState({
        flower: 0,
        religious: 0,
        cleaning: 0,
        internal: 0,
        external: 0,
        language: 0,
    });

    useEffect(() => {
        const getCounts = async () => {
            try {
                const responses = await Promise.all([
                    axios.get("/api/get-stats/type/flower"),
                    axios.get("/api/get-stats/type/religious"),
                    axios.get("/api/get-stats/type/cleaning"),
                    axios.get("/api/get-stats/type/internal-transportation"),
                    axios.get("/api/get-stats/type/external-transportation"),
                    axios.get("/api/get-stats/type/language"),
                ]);

                const counts = responses.map(response => response.data);
                setCounts({
                    flower: counts[0],
                    religious: counts[1],
                    cleaning: counts[2],
                    internal: counts[3],
                    external: counts[4],
                    language: counts[5],
                });
            } catch (error) {
                console.error('Error getting data:', error);
            }
        };

        getCounts();
    }, []);

    // Create the chart data
    const statusData = {
        labels: ['Flower', 'Religious', 'Cleaning', 'Internal Transport', 'External Transport', 'Language'],
        datasets: [
            {
                label: '# of Requests per Service',
                data: [counts.flower, counts.religious, counts.cleaning, counts.internal, counts.external, counts.language],
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
