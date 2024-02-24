import {ChangeEvent, useState} from "react";

const SendAllDataButton = () => {

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleSendAllData = async () => {
        const filemap = {
            file1: JSON.stringify(selectedFiles[0]),
            file2: JSON.stringify(selectedFiles[1]),
            file3: JSON.stringify(selectedFiles[2])
        };


        try {
            const res1 = await fetch("/api/single-button-import", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Set the appropriate content type
                },
                body: JSON.stringify(filemap) // Send an empty JSON object
            });

            console.log(res1);
        } catch (error) {
            console.error("Error:", error);
        }

    };




        // Function to handle file selection
        const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
            if (event.target.files) {
                const files: FileList = event.target.files;
                setSelectedFiles([...selectedFiles, ...Array.from(files)]);
                handleSendAllData();
            }
        };


    return (
        <div>
            <input type="file" multiple onChange={handleFileChange}/>
            <div>
                {selectedFiles.length > 0 && (
                    <p>Import All Files:</p>
                )}
            </div>
        </div>
    );
};

export default SendAllDataButton;
