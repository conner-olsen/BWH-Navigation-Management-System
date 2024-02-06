const MapGroundFloor = () => {
    return (
        <div className ={"groundFloor"}>
            <img
                className="pictureOfFG"
                src={`public/maps/00_thegroundfloor.png`}
                alt={`Map: The Ground Floor`}
                style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    borderRadius: "10px"
                }}
            />
        </div>
    );
};
export default MapGroundFloor;
