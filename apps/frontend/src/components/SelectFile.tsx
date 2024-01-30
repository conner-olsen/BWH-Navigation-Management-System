// import React, { useState, ChangeEvent, FormEvent } from 'react';
//
// function FileSelection() {
//     const [file, setFile] = useState<File | undefined>();
//
//     function handleChange(event: ChangeEvent<HTMLInputElement>) {
//         if (event.target.files && event.target.files.length > 0) {
//             setFile(event.target.files[0]);
//         }
//     }
//
//     function handleSubmit(event: FormEvent<HTMLFormElement>) {
//         event.preventDefault();
//         // Add your file upload logic here if needed
//     }
//
//     return (
//         <div className="App">
//             <form>
//                 <h1>React File Upload</h1>
//                 <input type="file" onChange={handleChange}/>
//                 <button type="submit">Upload</button>
//             </form>
//         </div>
//     );
// }
//
// export default FileSelection;
