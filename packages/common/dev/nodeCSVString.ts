/**
 * This file contains the CSV string for the nodes of the graph.
 * It is used for testing purposes only.
 */

const nodeCSVString = "nodeID,xcoord,ycoord,floor,building,nodeType,longName,shortName\n" +
  "CCONF001L1,2255,849,L1,45 Francis,CONF,Anesthesia Conf Floor L1,Conf C001L1\n" +
  "CCONF002L1,2665,1043,L1,45 Francis,CONF,Medical Records Conference Room Floor L1,Conf C002L1\n" +
  "CCONF003L1,2445,1245,L1,45 Francis,CONF,Abrams Conference Room,Conf C003L1\n" +
  "CDEPT002L1,1980,844,L1,Tower,DEPT,Day Surgery Family Waiting Floor L1,Department C002L1\n" +
  "CDEPT003L1,1845,844,L1,Tower,DEPT,Day Surgery Family Waiting Exit Floor L1,Department C003L1\n" +
  "CDEPT004L1,2310,1043,L1,45 Francis,DEPT,Medical Records Film Library Floor L1,Department C004L1\n" +
  "CHALL001L1,1732,924,L1,Tower,HALL,Hallway 1 Floor L1,Hallway C001L1\n" +
  "CHALL002L1,2445,1043,L1,45 Francis,HALL,Hallway 2 Floor L1,Hallway C002L1\n" +
  "CHALL003L1,2445,1284,L1,45 Francis,HALL,Hallway 3 Floor L1,Hallway C003L1\n" +
  "CHALL004L1,2770,1070,L1,45 Francis,HALL,Hallway 4 Floor L1,Hallway C004L1\n" +
  "CHALL005L1,1750,1284,L1,Tower,HALL,Hallway 5 Floor L1,Hallway C005L1\n" +
  "CHALL006L1,2130,1284,L1,Tower,HALL,Hallway 6 Floor L1,Hallway C006L1\n" +
  "CHALL007L1,2130,1045,L1,Tower,HALL,Hallway 7 Floor L1,Hallway C007L1\n" +
  "CHALL008L1,2215,1045,L1,45 Francis,HALL,Hallway 8 Floor L1,Hallway C008L1\n" +
  "CHALL009L1,2220,904,L1,45 Francis,HALL,Hallway 9 Floor L1,Hallway C009L1\n" +
  "CHALL010L1,2265,904,L1,45 Francis,HALL,Hallway 10 Floor L1,Hallway C010L1\n" +
  "CHALL011L1,2360,849,L1,45 Francis,HALL,Hallway 11 Floor L1,Hallway C011L1\n" +
  "CHALL012L1,2130,904,L1,45 Francis,HALL,Hallway 12 Floor L1,Hallway C012L1\n" +
  "CHALL013L1,2130,844,L1,45 Francis,HALL,Hallway 13 Floor L1,Hallway C013L1\n" +
  "CHALL014L1,1845,924,L1,Tower,HALL,Hallway 14 Floor L1,Hallway C014L1\n" +
  "CHALL015L1,2300,849,L1,45 Francis,HALL,Hallway 15 Floor L1,Hallway C015L1\n" +
  "CLABS001L1,1965,1284,L1,Tower,LABS,Outpatient Fluoroscopy Floor L1,Lab C001L1\n" +
  "CLABS002L1,1750,1090,L1,Tower,LABS,Pre-Op PACU Floor L1,Lab C002L1\n" +
  "CLABS003L1,2290,1284,L1,45 Francis,LABS,Nuclear Medicine Floor L1,Lab C003L1\n" +
  "CLABS004L1,2320,1284,L1,45 Francis,LABS,Ultrasound Floor L1,Lab C004L1\n" +
  "CLABS005L1,2770,1284,L1,45 Francis,LABS,CSIR MRI Floor L1,Lab C005L1\n" +
  "CREST001L1,1732,1019,L1,Tower,REST,Restroom L Elevator Floor L1,Restroom C001L1\n" +
  "CREST002L1,2065,1284,L1,Tower,REST,Restroom M Elevator Floor L1,Restroom C002L1\n" +
  "CREST003L1,2300,879,L1,45 Francis,REST,Restroom K Elevator Floor L1,Restroom C003L1\n" +
  "CREST004L1,2770,1160,L1,45 Francis,REST,Restroom H Elevator Floor L1,Restroom C004L1\n" +
  "CRETL001L1,2185,904,L1,45 Francis,RETL,Vending Machine 1 L1,Retail C001L1\n" +
  "CSERV001L1,2490,1043,L1,45 Francis,SERV,Volunteers Floor L1,Service C001L1\n" +
  "CSERV001L2,2015,1280,L2,45 Francis,SERV,Interpreter Services Floor L2,Service C001L2\n" +
  "GELEV00QL1,1637,2116,L1,Shapiro,ELEV,Elevator Q MapNode 7 Floor L1,Elevator Q L1\n" +
  "GEXIT001L1,1702,2260,L1,Shapiro,EXIT,Fenwood Road Exit MapNode 1 Floor L1,Fenwood Road EntranceExit L1\n" +
  "GHALL002L1,1702,2167,L1,Shapiro,HALL,Hallway MapNode 2 Floor L1,Hall\n" +
  "GHALL003L1,1688,2167,L1,Shapiro,HALL,Hallway MapNode 3 Floor L1,Hall\n" +
  "GHALL004L1,1666,2167,L1,Shapiro,HALL,Hallway MapNode 4 Floor L1,Hall\n" +
  "GHALL005L1,1688,2131,L1,Shapiro,HALL,Hallway MapNode 5 Floor L1,Hall\n" +
  "GHALL006L1,1665,2116,L1,Shapiro,HALL,Hallway MapNode 6 Floor L1,Hall\n" +
  "GSTAI008L1,1720,2131,L1,Shapiro,STAI,Stairs MapNode 8 Floor L1,L1 Stairs\n" +
  "WELEV00HL1,2715,1070,L1,45 Francis,ELEV,Elevator H Floor L1,Elevator HL1\n" +
  "WELEV00JL1,2360,799,L1,45 Francis,ELEV,Elevator J Floor L1,Elevator JL1\n" +
  "WELEV00KL1,2220,974,L1,45 Francis,ELEV,Elevator K Floor L1,Elevator KL1\n" +
  "WELEV00LL1,1785,924,L1,Tower,ELEV,Elevator L Floor L1,Elevator LL1\n" +
  "WELEV00ML1,1820,1284,L1,Tower,ELEV,Elevator M Floor L1,Elevator ML1\n";

export default nodeCSVString;
