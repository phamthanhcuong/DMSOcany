// reportSchema.ts
import Realm from 'realm';

// Định nghĩa kiểu Report
export interface Report {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

// Định nghĩa schema cho Report
export const ReportSchema: Realm.ObjectSchema = {
  name: 'Report',
  primaryKey: 'id',
  properties: {
    id: 'int',
    title: 'string',
    content: 'string',
    createdAt: 'date',
  },
};