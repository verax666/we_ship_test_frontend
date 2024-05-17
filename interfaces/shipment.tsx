import { Carrier } from "./carrier";
import { CreatedBy } from "./createdby";
import { Order } from "./order";
import { Org } from "./org";
import { Subscription } from "./subscription";

export interface Shipment {
  id: string;
  trackingNumber: string;
  trackingUrl: any;
  courier: string;
  type: any;
  channel: any;
  customerEmail: string;
  customerPhone: string;
  orderNumber: string;
  customerName: string;
  customerCountry: string;
  customerProvince: string;
  customerCountryCode: string;
  customerProvinceCode: string;
  customerCity: any;
  customerZip: any;
  customerSelectedShipping: any;
  shipperCountry: string;
  shipperProvince: string;
  shipperCountryCode: string;
  shipperProvinceCode: string;
  items: { title: string,name: string; id: number; image?: string,sku: string     }[];
  events: Event[];
  deadline: string;
  estimatedDelivery: any;
  channelCreatedAt: any;
  transitTime: number;
  status: string;
  statusWithDetails: string;
  deliveredAt: any;
  pickedupAt: any;
  fulfillmentDate: string;
  tracker: string;
  syncDate: string;
  chargeId: any;
  trackingEnabled: boolean;
  trackEmail: string;
  markedAs: string;
  createdAt: string;
  updatedAt: string;
  orderId: string;
  subscriptionId: string;
  carrierId: string;
  orgId: string;
  createdById: string;
  createdBy: CreatedBy;
  order: Order;
  subscription: Subscription;
  carrier: Carrier;
  org: Org;
}
