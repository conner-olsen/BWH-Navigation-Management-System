import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
//import {string} from "prop-types";
import {ToggleGroup, ToggleGroupItem} from "./ui/toggle-group.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "./ui/popover.tsx";
import {Button} from "./ui/button.tsx";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem
} from "./ui/command.tsx";
import {Node} from "common/src/graph-structure.ts";
import PathfindingRequest from "common/src/PathfindingRequest.ts";
import {parseCSV} from "common/src/parser.ts";
import nodeCSVString from "common/dev/nodeCSVString.ts";
import MapDisplay from "./maps/MapDisplay.tsx";
import {Check, ChevronsUpDown} from "lucide-react";
import cn from "../lib/utils.ts";





interface SideBarProps {
    onChange: (value: string) => void;
}
// const frameworks = [
//     {
//         value: "next.js",
//         label: "Next.js",
//     },
//     {
//         value: "sveltekit",
//         label: "SvelteKit",
//     },
//     {
//         value: "nuxt.js",
//         label: "Nuxt.js",
//     },
//     {
//         value: "remix",
//         label: "Remix",
//     },
//     {
//         value: "astro",
//         label: "Astro",
//     },
// ];



const MapSidebar: React.FC<SideBarProps> = ({ onChange }) => {
    const [, setBFSResult] = useState<Node[]>([]);
    const [startNode, setStartNode ] = useState<string>("Select Start Location");
    const [endNode, setEndNode ] = useState<string>("End Location");
    const [pathFindingType, ] = useState<string>("/api/bfsAstar-searching");
    const [mapKey, setMapKey] = useState<number>(0);

    const fetchData = useCallback(async (): Promise<AxiosResponse<Node[]>> => {
        try {
            const request: PathfindingRequest = {
                startid: startNode,
                endid: endNode
            };
            const response: AxiosResponse<Node[]> = await axios.post(pathFindingType, request, {
                headers: {
                    'Content-Type': "application/json"
                }
            });

            if (response.status === 200) {
                setBFSResult(response.data);
            }

            return response;
        } catch (error) {
            console.error("Error fetching BFS result:", (error as AxiosError).message);
            throw error;
        }
    }, [startNode, endNode, pathFindingType]);

    useEffect(() => {
        fetchData()
            .then(response => {
                // Handle success
                console.log(response.data);
            })
            .catch(error => {
                // Handle error
                console.error("Error:", error.message);
                // Optionally set state or show error message to the user
            });
    }, [fetchData]);
    useEffect(() => {
        // When pathFindingType changes, update mapKey to force remount of MapDisplay
        setMapKey(prevKey => prevKey + 1);
    }, [pathFindingType]);

    const CSVRow = parseCSV(nodeCSVString);
    const frameworks = [];
    for (let i = 0; i < CSVRow.length; i++) {
        const row = CSVRow[i];
        const rowval = Object.values(row);
        const id = rowval[0];
        const longName = row["longName"];
        frameworks.push({value: id, label: longName});
    }
    const sendHoverMapPath = (path: PathfindingRequest) => {
        setStartNode(path.startid);
        setEndNode(path.endid);
    };


    const [isExpanded, setIsExpanded] = useState(true);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };
    const [map, ] = useState("");

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState("");
  return (
      <div>
          <MapDisplay key={mapKey} startNode={startNode} endNode={endNode} sendHoverMapPath={sendHoverMapPath}/>
          <div className="fixed top-0 left-0 h-screen w-[80px] bg-neutral-300 text-white z-20 px-4 pt-[100px]
                          flex flex-col">
              <button onClick={toggleSidebar} className="text-xl text-white focus:outline-none">
                  {isExpanded ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                           stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                      </svg>
                  ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                           stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                      </svg>
                  )}
              </button>
          </div>
          <div
              className={`fixed top-0 left-0 h-screen w-[400px] bg-background text-foreground z-10 pl-[96px] pt-[100px] sidebar 
          ${isExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
              {/* Sidebar content */}
              <div className="relative">
                  <h2 className="text-xl font-semibold mb-4">Sidebar</h2>

                  <ToggleGroup type="single" value={map} onValueChange={(value) => {
                      onChange(value);
                  }}>
                      <ToggleGroupItem value="lowerLevel1">L1</ToggleGroupItem>
                      <ToggleGroupItem value="lowerLevel2">L2</ToggleGroupItem>
                      <ToggleGroupItem value="floor1">1</ToggleGroupItem>
                      <ToggleGroupItem value="floor2">2</ToggleGroupItem>
                      <ToggleGroupItem value="floor3">3</ToggleGroupItem>
                  </ToggleGroup>

                  <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                          <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="w-[200px] justify-between"
                          >
                              {value
                                  ? frameworks.find((framework) => framework.value === value)?.label
                                  : "Select framework..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                          <Command>
                              <CommandInput placeholder="Search framework..." />
                              <CommandEmpty>No framework found.</CommandEmpty>
                              <CommandGroup className="overflow-auto">
                                      {frameworks.map((framework) => (
                                          <CommandItem
                                              key={framework.value}
                                              value={framework.value}
                                              onSelect={(currentValue) => {
                                                  setValue(currentValue === value ? "" : currentValue);
                                                  setOpen(false);
                                                  setStartNode(value);
                                                  console.log(value);
                                              }}
                                          >
                                              <Check
                                                  className={cn(
                                                      "mr-2 h-4 w-4",
                                                      value === framework.value ? "opacity-100" : "opacity-0"
                                                  )}
                                              />
                                              {framework.label}
                                          </CommandItem>
                                      ))}
                              </CommandGroup>
                          </Command>
                      </PopoverContent>
                  </Popover>

                  <Popover open={open2} onOpenChange={setOpen2}>
                      <PopoverTrigger asChild>
                          <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open2}
                              className="w-[200px] justify-between"
                          >
                              {value
                                  ? frameworks.find((framework) => framework.value === value)?.label
                                  : "Select framework..."}

                          </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                          <Command>
                              <CommandInput placeholder="Search framework..." className="h-9" />
                              <CommandEmpty>No framework found.</CommandEmpty>
                              <CommandGroup>
                                  {frameworks.map((framework) => (
                                      <CommandItem
                                          key={framework.value}
                                          value={framework.value}
                                          onSelect={(currentValue) => {
                                              setValue2(currentValue === value2 ? "" : currentValue);
                                              setOpen2(false);
                                              setEndNode(value2);
                                              console.log(value2);
                                          }}
                                      >
                                          {framework.label}
                                          {/*<CheckIcon*/}
                                          {/*    className={cn(*/}
                                          {/*        "ml-auto h-4 w-4",*/}
                                          {/*        value === framework.value ? "opacity-100" : "opacity-0"*/}
                                          {/*    )}*/}
                                          {/*/>*/}
                                      </CommandItem>
                                  ))}
                              </CommandGroup>
                          </Command>
                      </PopoverContent>
                  </Popover>


              </div>
          </div>
      </div>

  )
      ;
};

export default MapSidebar;
