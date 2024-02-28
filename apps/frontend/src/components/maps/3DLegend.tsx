const Legend = () => {
    return (
        <div className="bg-background h-[250px] w-[250px] fixed top-[90px] right-[20px] p-4 rounded-md border-2
        border-neutral-500 z-40">
            <h6 className={"text-center"}>LEGEND</h6>
            <div className={"flex items-center justify-between"}>
                <div className={"w-[20px] h-[20px] rounded-[100%] bg-white border-2 border-black"}></div>
                <span className={"text-sm pl-2"}>Starting Location</span>
            </div>
            <div className={"flex items-center justify-between"}>
                <div className={"w-[20px] h-[20px] rounded-[100%] bg-black border-2 border-white"}></div>
                <span className={"text-sm pl-2"}>Arrived at New Floor</span>
            </div>
            <div className={"flex items-center justify-between"}>
                <div className={"w-[20px] h-[20px] rounded-[100%] bg-green-500 border-2 border-foreground"}></div>
                <span className={"text-sm pl-2"}>Ending Location</span>
            </div>
            <div className={"flex items-center justify-between"}>
                <div className={"w-[20px] h-[20px] rounded-[100%] bg-blue-700 border-2 border-foreground"}></div>
                <span className={"text-sm pl-2"}>Elevator</span>
            </div>
            <div className={"flex items-center justify-between"}>
                <div className={"w-[20px] h-[20px] rounded-[100%] bg-yellow-300 border-2 border-foreground"}></div>
                <span className={"text-sm pl-2"}>Stairs</span>
            </div>
            <div className={"flex items-center justify-between"}>
                <div className={"w-[40px] h-[1px] bg-orange-500"}></div>
                <span className={"text-sm pl-2"}>Going up</span>
            </div>
            <div className={"flex items-center justify-between"}>
                <div className={"w-[40px] h-[1px] bg-blue-500"}></div>
                <span className={"text-sm pl-2"}>Going down</span>
            </div>
        </div>
    );
};

export default Legend;
