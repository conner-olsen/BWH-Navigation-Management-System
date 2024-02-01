import React, { useState } from 'react';

const ServiceLog = () => {
    const [jsonData, setJsonData] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const fetchData = async () => {
        try {
            setIsFetching(true);

            // Replace 'YOUR_API_URL' with the actual API endpoint
            const response = await fetch('/api/populate/flower-service-request');
            const data = await response.json();
    console.log(data);
            setJsonData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsFetching(false);
        }
    };

    return (
        <div>
            <button onClick={fetchData} disabled={isFetching}>
                {isFetching ? 'Fetching data...' : 'Fetch Data'}
            </button>

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    {/* Add more table headers based on your JSON data structure */}
                </tr>
                </thead>
                <tbody>
                {jsonData.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        {/* Add more table cells based on your JSON data structure */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ServiceLog;
