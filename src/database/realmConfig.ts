// realmConfig.ts
import Realm from 'realm';
import { UserSchema } from './schemas/userSchema';
import { CustomerSchema } from './schemas/customerSchema';
import { OrderSchema } from './schemas/orderSchema';

const realmConfig = {
    path: 'DMSOcany.realm', // Tên file Realm
    schema: [UserSchema, CustomerSchema, OrderSchema], // Các schema đã định nghĩa
    schemaVersion: 1, // Phiên bản schema
};

const realm = new Realm(realmConfig);

export default realm;