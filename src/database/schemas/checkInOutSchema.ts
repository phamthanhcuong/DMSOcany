// checkInOutSchema.ts
import Realm from 'realm';

// Định nghĩa kiểu CheckInOut
export interface CheckInOut {
  id: number;
  customerId: number; // liên kết với Customer
  checkInTime: Date;
  checkOutTime: Date;
  isSynced: boolean;
}

// Định nghĩa schema cho CheckInOut
export const CheckInOutSchema: Realm.ObjectSchema = {
  name: 'CheckInOut',
  primaryKey: 'id',
  properties: {
    id: 'int',
    customerId: 'int',
    checkInTime: 'date',
    checkOutTime: 'date',
    isSynced: { type: 'bool', default: false },
  },
};