// userSchema.ts
import Realm from 'realm';

export const UserSchema: Realm.ObjectSchema = {
    name: 'User',
    properties: {
        id: 'int',
        name: 'string',
        email: 'string',
    },
    primaryKey: 'id',
};