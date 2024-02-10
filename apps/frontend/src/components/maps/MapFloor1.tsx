const MapFloor1 = () => {
    return (
        <div className ={"floor1"}>
            <img
                className="pictureOfF1"
                src={`public/maps/01_thefirstfloor.png`}
                alt={`Map: Floor 1`}
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
export default MapFloor1;
