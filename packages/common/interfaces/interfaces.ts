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
  id: number;
  nodeId: string;
  status: string;
  employeeUser: string;
  priority: string;
}

export interface flowerServiceRequest extends ServiceRequest {
  senderName: string;
  senderEmail: string;
  patientName: string;
  flowerType: string;
  deliveryDate: string;
  note: string;
}

export interface maintenanceServiceRequest extends ServiceRequest{
  requestType: string;
  comment: string;
};

export interface externalTransportationServiceRequest extends ServiceRequest {
  name: string;
  destination: string;
  transportation: string;
  date: string;
  description: string;
}

export interface internalTransportServiceRequest extends ServiceRequest {
  name: string;
  mode: string;
  destination: string;
}

export interface languageInterpreterServiceRequest extends ServiceRequest {
  name: string;
  languagePref: string;
}

export type religiousServiceRequest = {
  name: string;
  religion: string;
  type: string;
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


