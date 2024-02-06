const MapFloor2 = () => {
    return (
        <div className ={"floor2"}>
            <img
                className="pictureOfF2"
                src={`public/maps/02_thesecondfloor.png`}
                alt={`Map: Floor 2`}
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
export default MapFloor2;
