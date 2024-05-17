import { Shipment } from "./shipment"

export interface ResponseWeShip {
    count: number
    rows?: Shipment[]
  }