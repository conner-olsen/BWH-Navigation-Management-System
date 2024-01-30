// import React, { useEffect, useState } from "react";
// import axios, { AxiosError } from "axios";
// import PathfindingRequest from "common/src/PathfindingRequest.ts";
//
//
// export function CSVTableComponent() {
//
//
//
//     const [dataItem, setDataItem] = useState();
//
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const request:PathfindingRequest = {
//                     startid:"CHALL008L1",
//                     endid:"WELEV00LL1"
//                 };
//                 const response = await axios.post("/api/bfs-searching",request, {
//                     headers: {
//                         'Content-Type':"application/json"
//                     }
//                 });
//
//                 if (response.status === 200) {
//                     setBFSResult(response.data);
//                 }
//             } catch (error) {
//                 console.error("Error fetching BFS result:", (error as AxiosError).message);
//             }
//         };
//         fetchData().then();
//     }, []); // Empty dependency array ensures the effect runs once on mount
//
//
//
//     function generateTableRows(data: DataItem[]): JSX.Element[] {
//         return data.map((item, index) => (
//             <tr key={index}>
//                 <td>{item.property1}</td>
//                 <td>{item.property2}</td>
//                 <td>{item.property3}</td>
//                 <td>{item.property4}</td>
//                 <td>{item.property5}</td>
//                 <td>{item.property6}</td>
//                 <td>{item.property7}</td>
//                 <td>{item.property8}</td>
//             </tr>
//         ));
//     }
//
//     const Table: React.FC<{ data: DataItem[] }> = ({data}) => {
//         return (
//             <table>
//                 <thead>
//                 <tr>
//                     <th>Column 1</th>
//                     <th>Column 2</th>
//                     <th>Column 3</th>
//                     <th>Column 4</th>
//                     <th>Column 5</th>
//                     <th>Column 6</th>
//                     <th>Column 7</th>
//                     <th>Column 8</th>
//
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {generateTableRows(data)}
//                 </tbody>
//             </table>
//         );
//     };
// }
