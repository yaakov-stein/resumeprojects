import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class Wallet {
  readonly badges?: (string | null)[] | null;
  readonly numberOfBadges?: number | null;
  constructor(init: ModelInit<Wallet>);
}

type BusinessMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type BadgesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CustomerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Business {
  readonly id: string;
  readonly businessName?: string | null;
  readonly numberOfCustomer?: string | null;
  readonly customers?: (string | null)[] | null;
  readonly numberOfBadges?: number | null;
  readonly badges?: (string | null)[] | null;
  readonly Badges?: (Badges | null)[] | null;
  readonly Customers?: (Customer | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Business, BusinessMetaData>);
  static copyOf(source: Business, mutator: (draft: MutableModel<Business, BusinessMetaData>) => MutableModel<Business, BusinessMetaData> | void): Business;
}

export declare class Badges {
  readonly id: string;
  readonly badgeName?: string | null;
  readonly perks?: (string | null)[] | null;
  readonly numberInCollection?: number | null;
  readonly currentOwner?: string | null;
  readonly business?: string | null;
  readonly dateIssued?: string | null;
  readonly cost?: string | null;
  readonly businessID: string;
  readonly customerID: string;
  readonly Business?: Business | null;
  readonly Customer?: Customer | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Badges, BadgesMetaData>);
  static copyOf(source: Badges, mutator: (draft: MutableModel<Badges, BadgesMetaData>) => MutableModel<Badges, BadgesMetaData> | void): Badges;
}

export declare class Customer {
  readonly id: string;
  readonly name?: string | null;
  readonly wallet?: Wallet | null;
  readonly businessID: string;
  readonly Badges?: (Badges | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Customer, CustomerMetaData>);
  static copyOf(source: Customer, mutator: (draft: MutableModel<Customer, CustomerMetaData>) => MutableModel<Customer, CustomerMetaData> | void): Customer;
}