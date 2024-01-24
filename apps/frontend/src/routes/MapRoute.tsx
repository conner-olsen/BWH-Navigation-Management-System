import { Outlet } from "react-router-dom";
import BackButton from "../components/BackButton.tsx";
import DragNDrop from "../components/DragNDrop.tsx";
import axios from "axios";

export function MapRoute() {
    const csvData = new FormData();
    let CSVString: string = "";
    const handleFileDrop = (file: File) => {
        console.log('Dropped file:', file);
        const formData = new FormData();
        formData.append("mapFile", file);
    };

    axios
        .post("/api/csv-to-json", csvData)
        .then((response) => {
            // This just prints the JSON string to the console, but you can do anything with it here
            const jsonString = JSON.stringify(response.data, null, 2);
            console.log(jsonString);
            CSVString = jsonString;
        })
        .catch((error) => {
            console.error(`Error: ${error}`);
        });


    return (
      <div>
          <Outlet></Outlet>
          <BackButton></BackButton>
          <img
              className={"pictureOfL1"}
              src="public/icon/00_thelowerlevel1 (2).png"
              alt="Lower Level of Hospital (L1)"
              style={{marginTop: "60px"}}
          />
          <br/>
          <DragNDrop onFileDrop={handleFileDrop}></DragNDrop>

          <div className="CsvDataText">
              <p>{CSVString}</p>
          </div>

      </div>
  );
}
