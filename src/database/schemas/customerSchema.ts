// customerSchema.ts
import Realm from 'realm';

// Định nghĩa kiểu Customer
export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  isSynced: boolean;
}

// Định nghĩa schema cho Customer
export const CustomerSchema: Realm.ObjectSchema = {
  name: 'Customer',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    email: 'string',
    phone: 'string',
    isSynced: { type: 'bool', default: false },
  },
};