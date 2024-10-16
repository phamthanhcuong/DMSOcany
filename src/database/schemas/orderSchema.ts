// orderSchema.ts
import Realm from 'realm';

// Định nghĩa kiểu Order
export interface Order {
  id: number;
  customerId: number; // liên kết với Customer
  product: string;
  quantity: number;
  totalAmount: number;
  orderDate: Date; // ngày đặt hàng
  isSynced: boolean;
}

// Định nghĩa schema cho Order
export const OrderSchema: Realm.ObjectSchema = {
  name: 'Order',
  primaryKey: 'id',
  properties: {
    id: 'int',
    customerId: 'int',
    product: 'string',
    quantity: 'int',
    totalAmount: 'double',
    orderDate: 'date',
    isSynced: { type: 'bool', default: false },
  },
};