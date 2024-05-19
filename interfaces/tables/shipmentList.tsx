export interface ShipmentList {
    trackingNumber: number,
    status?: string;
    customerName?: string;
    customerSelectedShipping?: string;
    fulfillmentDate?: string;
}