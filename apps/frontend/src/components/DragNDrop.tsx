import React, { useState, useEffect } from 'react';
import { Container} from "react-bootstrap";
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
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('drop', preventDefault);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('drop', preventDefault);
    };
  }, []);

  return (
      <Container
          className={`${dragging ? 'DragDropBoxOn' : 'DragDropBox'} ${dragging ? 'dragging' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
      >
          <img className="m-auto" src="../public/icon/csv_drop.svg"/>
          <h3>Select a CSV file to upload</h3>
          <label htmlFor="csv-upload"
                 className="absolute top-0 left-0 w-full h-full cursor-pointer"></label>
          <input id="csv-upload" type="file" onChange={handleUpload}
                className="hidden"/>
          {dragging ? <div>Drop your file here</div> : <div>Drag and drop a file here</div>}
      </Container>
  );
};

export default FileDropBox;
