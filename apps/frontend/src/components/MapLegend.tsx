import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./ui/hovercard.tsx";
import { iconPaths } from "./maps/IconPath.tsx";

const MapLegend = () => {
  return (
    <div
      className={`fixed bottom-[0px] mb-2.5 mr-2.5 right-[0px] flex flex-col bg-background rounded-xl z-10`}
    >
      <HoverCard openDelay={100}>
        <HoverCardTrigger className="w-[80px] h-[80px] flex justify-center items-center no-underline text-foreground relative cursor-pointer group">
          <p className="absolute bottom-[5px] text-[12px] font-bold m-0 z-10">
            Legend
          </p>
          <img
            src="public/map-legend-bg.png"
            alt="map-bg"
            className="dark:brightness-75 group-hover:scale-[0.9] transition-all duration-200"
          ></img>
        </HoverCardTrigger>

        <HoverCardContent side="right" className="p-4 z-40">
          <p className="text-xs text-center">Legend</p>

          <div className="flex items-center">
            <img
              id={"CONF"}
              src={iconPaths.CONF}
              alt="Conference Room"
              className="w-6 h-6 mr-2 dark:invert"
            />
            <label id={"CONF"}>Conference Room</label>
          </div>

          <div className="flex items-center">
            <img
              id={"DEPT"}
              src={iconPaths.DEPT}
              alt="Department Room"
              className="w-6 h-6 mr-2 dark:invert"
            />
            <label id={"DEPT"}>Department Room</label>
          </div>

          <div className="flex items-center">
            <img
              id={"ELEV"}
              src={iconPaths.ELEV}
              alt="Elevator"
              className="w-6 h-6 mr-2 dark:invert"
            />
            <label id={"ELEV"}>Elevator</label>
          </div>

          <div className="flex items-center">
            <img
              id={"EXIT"}
              src={iconPaths.EXIT}
              alt="Exit"
              className="w-6 h-6 mr-2 dark:invert"
            />
            <label id={"EXIT"}>Exit</label>
          </div>

          <div className="flex items-center">
            <img
              id={"INFO"}
              src={iconPaths.INFO}
              alt="Info Desk"
              className="w-6 h-6 mr-2 dark:invert"
            />
            <label id={"INFO"}>Info Desk</label>
          </div>

          <div className="flex items-center">
            <img
              id={"LABS"}
              src={iconPaths.LABS}
              alt="Laboratory"
              className="w-6 h-6 mr-2 dark:invert"
            />
            <label id={"LABS"}>Laboratory</label>
          </div>

          <div className="flex items-center">
            <img
              id={"REST"}
              src={iconPaths.REST}
              alt="Restroom"
              className="w-6 h-6 mr-2 dark:invert"
            />
            <label id={"REST"}>Restroom</label>
          </div>

          <div className="flex items-center">
            <img
              id={"BATH"}
              src={iconPaths.BATH}
              alt="Bathroom"
              className="w-6 h-6 mr-2 dark:invert"
            />
            <label id={"BATH"}>Bathroom</label>
          </div>

          <div className="flex items-center">
            <img
              id={"RETL"}
              src={iconPaths.RETL}
              alt="Retail"
              className="w-6 h-6 mr-2 dark:invert"
            />
            <label id={"RETL"}>Retail</label>
          </div>

          <div className="flex items-center">
            <img
              id={"STAI"}
              src={iconPaths.STAI}
              alt="Stairs"
              className="w-6 h-6 mr-2 dark:invert"
            />
            <label id={"STAI"}>Stairs</label>
          </div>

          <div className="flex items-center">
            <img
              id={"SERV"}
              src={iconPaths.SERV}
              alt="Service"
              className="w-6 h-6 mr-2 dark:invert"
            />
            <label id={"SERV"}>Service</label>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default MapLegend;
