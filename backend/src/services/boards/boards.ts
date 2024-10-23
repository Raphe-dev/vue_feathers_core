// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema';

import {
  boardsDataValidator,
  boardsPatchValidator,
  boardsQueryValidator,
  boardsResolver,
  boardsExternalResolver,
  boardsDataResolver,
  boardsPatchResolver,
  boardsQueryResolver,
} from './boards.schema';

import type { Application } from '../../declarations';
import { BoardsService, getOptions } from './boards.class';
import { boardsPath, boardsMethods } from './boards.shared';
import { HookContext } from '@feathersjs/feathers';

export * from './boards.class';
export * from './boards.schema';

const wait = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, 500)
  })
}

const createdAt = async (context: HookContext) => {
  context.data.createdDate = Date.now();
}

// A configure function that registers the service and its hooks via `app.configure`
export const boards = (app: Application) => {
  // Register our service on the Feathers application
  app.use(boardsPath, new BoardsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: boardsMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  });
  // Initialize hooks
  app.service(boardsPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(boardsExternalResolver), schemaHooks.resolveResult(boardsResolver)],
    },
    before: {
      all: [wait, schemaHooks.validateQuery(boardsQueryValidator), schemaHooks.resolveQuery(boardsQueryResolver)],
      find: [],
      get: [],
      create: [createdAt, schemaHooks.validateData(boardsDataValidator), schemaHooks.resolveData(boardsDataResolver)],
      patch: [schemaHooks.validateData(boardsPatchValidator), schemaHooks.resolveData(boardsPatchResolver)],
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
    [boardsPath]: BoardsService;
  }
}
