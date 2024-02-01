import {useEffect, useState} from "react";

const ExportNodeDataToCSVButton = () => {
    const [file, setFile] = useState("");
    const [loading, setLoading] = useState(true);

    const handleExportButton = (props: { dataToExport: string  }) =>{
        // Convert data to CSV format
        const csvData = convertToCSV(props.dataToExport);

        // Create a Blob and download the CSV file
        const blob = new Blob([csvData], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'exported_data.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a GET request to the API endpoint
                const response = await fetch("/api/download-node-csv");

                // Check if the request was successful (status code 2xx)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the JSON response
                const result = await JSON.stringify(response);

                // Set the data in the state
                setFile(result);
            } catch (err) {
                // Handle errors
                console.log("Failed");
            } finally {
                // Set loading to false, indicating that the request has completed
                setLoading(false);
            }
        };

        fetchData().then();
    }, []); //

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <button className="exportButton" onClick={handleExportButton(file)}>Export</button>
    );
};


export default ExportNodeDataToCSVButton;
