// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema';

import {
  columnsDataValidator,
  columnsPatchValidator,
  columnsQueryValidator,
  columnsResolver,
  columnsExternalResolver,
  columnsDataResolver,
  columnsPatchResolver,
  columnsQueryResolver,
} from './columns.schema';

import type { Application } from '../../declarations';
import { ColumnsService, getOptions } from './columns.class';
import { columnsPath, columnsMethods } from './columns.shared';

export * from './columns.class';
export * from './columns.schema';

// A configure function that registers the service and its hooks via `app.configure`
export const columns = (app: Application) => {
  // Register our service on the Feathers application
  app.use(columnsPath, new ColumnsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: columnsMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  });
  // Initialize hooks
  app.service(columnsPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(columnsExternalResolver), schemaHooks.resolveResult(columnsResolver)],
    },
    before: {
      all: [schemaHooks.validateQuery(columnsQueryValidator), schemaHooks.resolveQuery(columnsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(columnsDataValidator), schemaHooks.resolveData(columnsDataResolver)],
      patch: [schemaHooks.validateData(columnsPatchValidator), schemaHooks.resolveData(columnsPatchResolver)],
      remove: [],
    },
    after: {
      all: [],
    },
    error: {
      all: [],
    },
  });
};

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [columnsPath]: ColumnsService;
  }
}
