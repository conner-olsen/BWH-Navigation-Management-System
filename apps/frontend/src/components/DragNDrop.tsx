import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface FileDropBoxProps {
  onFileDrop: (file: File) => void;
}

const FileDropBox: React.FC<FileDropBoxProps> = ({ onFileDrop }) => {
  const [dragging, setDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const droppedFile = files[0];
      onFileDrop(droppedFile);
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();

    const files = e.target.files;
    if (files) {
      const file = files[0];
      onFileDrop(file);
    }
  };

  useEffect(() => {
    // Prevent default behavior for drag and drop events
    const preventDefault = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDragOver = (e: DragEvent) => {
      preventDefault(e);
    };

    // Add event listeners for drag and drop events
    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("drop", preventDefault);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("drop", preventDefault);
    };
  }, []);

  return (
    <div>
      <Container
        className={`border-border ${dragging ? "DragDropBoxOn" : "DragDropBox"} ${dragging ? "dragging" : ""} 
           border-2 border-gray-600 border-dashed rounded-lg p-3 text-center relative cursor-pointer
          hover:border-blue-600 hover:bg-primary hover:text-blue-500 transition-all duration-300 ease-in-out w-fit h-1/8`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label
          htmlFor="csv-upload"
          className="absolute top-0 left-0 w-full h-full cursor-pointer"
        ></label>
        <input
          id="csv-upload"
          type="file"
          onChange={handleUpload}
          className="hidden"
        />
        {dragging ? (
          <div>Click or Drop CSV File Here</div>
        ) : (
          <div>Drag and Drop a File Here</div>
        )}
      </Container>
      <br />
    </div>
  );
};

export default FileDropBox;
