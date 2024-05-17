export interface Carrier {
  id: string;
  carrierId: string;
  phone: any;
  url: string;
  name: string;
  email: any;
  countryId: string;
  popularity: number;
  aliases: string;
  tracker: string;
  rules: Rules;
  createdAt: string;
  updatedAt: string;
  orgId: any;
  createdById: any;
}
export interface Rules {
  first3: string;
  lengths: number[];
  isNumeric: IsNumeric;
}

export interface IsNumeric {
  [isNumeric: string]: boolean;
}
