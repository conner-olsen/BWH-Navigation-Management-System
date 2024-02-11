import {useState} from "react";

const MapSidebar = () => {

    const [isExpanded, setIsExpanded] = useState(true);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };


  return (
      <div>
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
              className={`fixed top-0 left-0 h-screen w-[400px] bg-background text-foreground pl-[96px] pt-[100px] sidebar 
          ${isExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
              {/* Sidebar content */}
              <div className="relative">
                  <h2 className="text-xl font-semibold mb-4">Sidebar</h2>

                  <ul>
                      <li className="mb-2">Item 1</li>
                      <li className="mb-2">Item 2</li>
                      <li className="mb-2">Item 3</li>
                      <li className="mb-2">Item 4</li>
                  </ul>
              </div>
          </div>
      </div>

  )
      ;
};

export default MapSidebar;
