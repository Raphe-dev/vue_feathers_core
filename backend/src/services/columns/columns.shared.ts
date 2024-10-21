// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers';
import type { ClientApplication } from '../../client';
import type { Columns, ColumnsData, ColumnsPatch, ColumnsQuery, ColumnsService } from './columns.class';

export type { Columns, ColumnsData, ColumnsPatch, ColumnsQuery };

export type ColumnsClientService = Pick<
  ColumnsService<Params<ColumnsQuery>>,
  (typeof columnsMethods)[number]
>;

export const columnsPath = 'columns';

export const columnsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const;

export const columnsClient = (client: ClientApplication) => {
  const connection = client.get('connection');

  client.use(columnsPath, connection.service(columnsPath), {
    methods: columnsMethods,
  });
};

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [columnsPath]: ColumnsClientService;
  }
}
