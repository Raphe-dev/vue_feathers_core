// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema';
import { Type, getValidator, querySyntax } from '@feathersjs/typebox';
import { ObjectIdSchema } from '@feathersjs/typebox';
import type { Static } from '@feathersjs/typebox';

import type { HookContext } from '../../declarations';
import { dataValidator, queryValidator } from '../../validators';
import type { BoardsService } from './boards.class';

// Main data model schema
export const boardsSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    name: Type.String(),
    backgroundImage: Type.String(),
    createdDate: Type.Number()
  },
  { $id: 'Boards', additionalProperties: false },
);
export type Boards = Static<typeof boardsSchema>;
export const boardsValidator = getValidator(boardsSchema, dataValidator);
export const boardsResolver = resolve<Boards, HookContext<BoardsService>>({});

export const boardsExternalResolver = resolve<Boards, HookContext<BoardsService>>({});

// Schema for creating new entries
export const boardsDataSchema = Type.Pick(boardsSchema, ['name', 'backgroundImage', 'createdDate'], {
  $id: 'BoardsData',
});
export type BoardsData = Static<typeof boardsDataSchema>;
export const boardsDataValidator = getValidator(boardsDataSchema, dataValidator);
export const boardsDataResolver = resolve<Boards, HookContext<BoardsService>>({});

// Schema for updating existing entries
export const boardsPatchSchema = Type.Partial(boardsSchema, {
  $id: 'BoardsPatch',
});
export type BoardsPatch = Static<typeof boardsPatchSchema>;
export const boardsPatchValidator = getValidator(boardsPatchSchema, dataValidator);
export const boardsPatchResolver = resolve<Boards, HookContext<BoardsService>>({});

// Schema for allowed query properties
export const boardsQueryProperties = Type.Pick(boardsSchema, ['_id','name', 'backgroundImage', 'createdDate']);
export const boardsQuerySchema = Type.Intersect(
  [
    querySyntax(boardsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false }),
  ],
  { additionalProperties: false },
);
export type BoardsQuery = Static<typeof boardsQuerySchema>;
export const boardsQueryValidator = getValidator(boardsQuerySchema, queryValidator);
export const boardsQueryResolver = resolve<BoardsQuery, HookContext<BoardsService>>({});
