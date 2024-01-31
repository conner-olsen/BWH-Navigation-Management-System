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
  roomLongName:string
  senderName:string
  senderEmail:string
  item:string
  comment:string
  date: string
  status:string
}
