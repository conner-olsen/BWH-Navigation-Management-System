export interface node {
  nodeId:string,
  xcoord:number,
  ycoord:number,
  floor:string,
  building:string,
  nodeType:string,
  longName:string,
  shortName:string
}

export interface edge {
  edgeID: string;
  startNodeID: string;
  endNodeID: string;
}

export interface ServiceRequest {
  id: string;
  nodeId: string;
  status: string;
  employeeUser: string;
  priority: string;
}

export interface flowerServiceRequest extends ServiceRequest {
  node: string;
  priority: string;
  status: string;
  employeeUser: string;
  senderName: string;
  senderEmail: string;
  patientName: string;
  flowerType: string;
  deliveryDate: string;
  note: string;
}

export interface cleaningServiceRequest extends ServiceRequest{
  node: string;
  priority: string;
  status: string;
  employeeUser: string;
  type: string;
  patientName: string;
}

export interface externalTransportationServiceRequest extends ServiceRequest {
  node: string;
  priority: string;
  status: string;
  employeeUser: string;
  name: string;
  destination: string;
  transportation: string;
  date: string;
  description: string;
}

export interface internalTransportServiceRequest extends ServiceRequest {
  node: string;
  priority: string;
  status: string;
  employeeUser: string;
  name: string;
  mode: string;
  destination: string;
}

export interface languageInterpreterServiceRequest extends ServiceRequest {
  node: string;
  priority: string;
  status: string;
  employeeUser: string;
  name: string;
  languagePref: string;
}

export type religiousServiceRequest = {
  node: string;
  priority: string;
  status: string;
  employeeUser: string;
  patientName: string;
  religion: string;
  note: string;
}

export interface user{
  Username: string;
}

export interface employee {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}


