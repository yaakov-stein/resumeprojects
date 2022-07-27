// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Business, Badges, Customer, Wallet } = initSchema(schema);

export {
  Business,
  Badges,
  Customer,
  Wallet
};