import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {Input} from "./ui/input.tsx";

const SendAllDataButton = () => {

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleSendAllData = useCallback(async () => {
        let filemap: {[key: string]: string} = {};

        await Promise.all(selectedFiles.map(async (file, index) => {
            const fileContent = await file.text();
            filemap[`file${index}`] = fileContent;
        }));

        try {

            const res1 = await fetch("/api/single-button-import", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Set the appropriate content type
                },
                body: JSON.stringify(filemap)
            });

            console.log(res1);
        } catch (error) {
            console.error("Error:", error);
        }
    }, [selectedFiles]);

    useEffect(() => {
        if (selectedFiles.length > 0) {
            //console.log(selectedFiles);
            handleSendAllData();
        }
    }, [selectedFiles, handleSendAllData]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files: FileList = event.target.files;
            setSelectedFiles([...selectedFiles, ...Array.from(files)]);
        }
    };



    return (
        <div>
            <Input type="file" multiple onChange={handleFileChange} className={"hover:bg-blue-300"} />
        </div>
    );
};

export default SendAllDataButton;
