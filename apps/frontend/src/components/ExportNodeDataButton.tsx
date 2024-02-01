// import {node} from "common/interfaces/interfaces.ts";
//
// export const GetDataNodes = () => {
//     const [data, setData] = useState<node[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Make a GET request to the API endpoint
//                 const response = await fetch("/api/node-populate");
//
//                 // Check if the request was successful (status code 2xx)
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//
//                 // Parse the JSON response
//                 const result = await response.json();
//
//                 // Set the data in the state
//                 setData(result);
//             } catch (err) {
//                 // Handle errors
//                 setError(err.message);
//             } finally {
//                 // Set loading to false, indicating that the request has completed
//                 setLoading(false);
//             }
//         };
//
//         fetchData().then();
//     }, []); //
//
//     if (loading) {
//         return <div>Loading...</div>;
//     }
//
//     if (error) {
//         return <div>Error: {error}</div>;
//     }
//
//     return (
//         <div>
//             <TableNodes tableData={data}></TableNodes>
//         </div>
//     );
// };
