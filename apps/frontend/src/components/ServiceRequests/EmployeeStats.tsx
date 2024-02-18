import {employee} from "common/interfaces/interfaces.ts";
import {useEffect, useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select.tsx";
import {Bar} from "react-chartjs-2";
import 'chart.js/auto';
import axios from "axios";
import { useCallback } from 'react';
import { useRef } from 'react';


interface Dataset {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
}

interface BarGraphData {
    labels: string[];
    datasets: Dataset[];
}

const CreateEmployeeChart = () => {


    const initialBarGraphData: BarGraphData = {
        labels: [],
        datasets: [
            {
                label: '',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 0
            }
        ]
    };

    const [selectedEmployee, setSelectedEmployee] = useState<string>("");
    const [data, setData] = useState<employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [barGraphData, setBarGraphData] = useState<BarGraphData>(initialBarGraphData);

    const handleChange = (event: string) => {
        setSelectedEmployee(event);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a GET request to the API endpoint
                const response = await fetch("/api/employee-mod");

                // Check if the request was successful (status code 2xx)
                if (!response.ok) {
                    throw new Error(`Please load node data ${response.status}`);
                }

                // Parse the JSON response
                const result = await response.json();

                // Set the data in the state
                setData(result);
            } catch (err) {
                // Handle errors
                console.log(err);
            } finally {
                // Set loading to false, indicating that the request has completed
                setLoading(false);
            }
        };

        fetchData().then();
    }, []); //


    interface employeeSR {
        username: string;
        count: number;
    }
    const totalEmployeeSR = useRef<employeeSR[]>([]);

    const getEmployeeServiceCounts = useCallback(async () => {
        try {
            const response = await axios.get("/api/get-employee-stats", {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            totalEmployeeSR.current = response.data;

            setBarGraphData({
                labels: totalEmployeeSR.current.map((employee) => employee.username),
                datasets: [
                    {
                        label: 'Employee Stats',
                        data: totalEmployeeSR.current.map((employee) => employee.count),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(201, 203, 207, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(201, 203, 207)'
                        ],
                        borderWidth: 1
                    }]
            });

        } catch (error) {
            console.error('Error getting data:', error);
        }
    }, []);

    useEffect(() => {
        getEmployeeServiceCounts();
    }, [getEmployeeServiceCounts]);


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Select onValueChange={handleChange} value={selectedEmployee}>
                <SelectTrigger>
                    <SelectValue placeholder="Employee"/>
                </SelectTrigger>
                <SelectContent>

                    {data.map((employee, index) => (
                        <SelectItem value={data[index].username}>{data[index].username}</SelectItem>
                    ))}

                </SelectContent>
            </Select>


            <Bar data={barGraphData}/>
        </div>

    );
};

export default CreateEmployeeChart;
