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


export interface flowerServiceRequest {
  senderName:string
  senderEmail:string
  roomLongName:string
  patientName:string
  flowerType:string
  deliveryDate: string
  note:string
}
