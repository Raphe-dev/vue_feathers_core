// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers';
import { MongoDBService } from '@feathersjs/mongodb';
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb';

import type { Application } from '../../declarations';
import type { Columns, ColumnsData, ColumnsPatch, ColumnsQuery } from './columns.schema';

export type { Columns, ColumnsData, ColumnsPatch, ColumnsQuery };

export interface ColumnsParams extends MongoDBAdapterParams<ColumnsQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class ColumnsService<ServiceParams extends Params = ColumnsParams> extends MongoDBService<
  Columns,
  ColumnsData,
  ColumnsParams,
  ColumnsPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('columns')),
  };
};
