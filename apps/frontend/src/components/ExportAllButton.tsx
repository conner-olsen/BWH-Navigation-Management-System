import { useEffect, useState } from "react";
import { Button } from "./ui/button.tsx";

const ExportAllDataToCSVButton = () => {
  const [fileEmployee, setFileEmployee] = useState("");
  const [fileNode, setFileNode] = useState("");
  const [fileEdge, setFileEdge] = useState("");
  const [loading, setLoading] = useState(true);

  const handleExportButton = () => {
    // Node data export
    const blob1 = new Blob([fileNode], { type: "text/csv" });
    const link1 = document.createElement("a");
    link1.href = URL.createObjectURL(blob1);
    link1.download = "exported_node_data.csv";
    document.body.appendChild(link1);
    link1.click();
    document.body.removeChild(link1);

    // Edge Data export
    const blob2 = new Blob([fileEdge], { type: "text/csv" });
    const link2 = document.createElement("a");
    link2.href = URL.createObjectURL(blob2);
    link2.download = "exported_edge_data.csv";
    document.body.appendChild(link2);
    link2.click();
    document.body.removeChild(link2);

    // Create a Blob and download the CSV file
    const blob3 = new Blob([fileEmployee], { type: "text/csv" });
    const link3 = document.createElement("a");
    link3.href = URL.createObjectURL(blob3);
    link3.download = "exported_employee_data.csv";
    document.body.appendChild(link3);
    link3.click();
    document.body.removeChild(link3);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to Node endpoint
        const response1 = await fetch("/api/download-node-csv");

        if (!response1.ok) {
          throw new Error(`HTTP error! Status: ${response1.status}`);
        }
        const result1 = await response1.text();
        setFileNode(result1);

        // Make a GET request to the Edge endpoint
        const response2 = await fetch("/api/download-edge-csv");

        if (!response2.ok) {
          throw new Error(`HTTP error! Status: ${response2.status}`);
        }
        const result2 = await response2.text();
        setFileEdge(result2);

        // Make a GET request to the Employee endpoint
        const response3 = await fetch("/api/employee-csv");

        if (!response3.ok) {
          throw new Error(`HTTP error! Status: ${response3.status}`);
        }
        const result3 = await response3.text();
        setFileEmployee(result3);
      } catch (err) {
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
    <Button variant={"default"} onClick={handleExportButton}>
      Export All
    </Button>
  );
};

export default ExportAllDataToCSVButton;
