// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema';
import { Type, getValidator, querySyntax } from '@feathersjs/typebox';
import { ObjectIdSchema } from '@feathersjs/typebox';
import type { Static } from '@feathersjs/typebox';

import type { HookContext } from '../../declarations';
import { dataValidator, queryValidator } from '../../validators';
import type { ColumnsService } from './columns.class';

// Main data model schema
export const columnsSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    board_id: Type.String(),
    name: Type.String(),
    created_at: Type.String(),
    color: Type.String(),
  },
  { $id: 'Columns', additionalProperties: false },
);
export type Columns = Static<typeof columnsSchema>;
export const columnsValidator = getValidator(columnsSchema, dataValidator);
export const columnsResolver = resolve<Columns, HookContext<ColumnsService>>({});

export const columnsExternalResolver = resolve<Columns, HookContext<ColumnsService>>({});

// Schema for creating new entries
export const columnsDataSchema = Type.Pick(columnsSchema, ['name', 'board_id', 'created_at', 'color'], {
  $id: 'ColumnsData',
});
export type ColumnsData = Static<typeof columnsDataSchema>;
export const columnsDataValidator = getValidator(columnsDataSchema, dataValidator);
export const columnsDataResolver = resolve<Columns, HookContext<ColumnsService>>({});

// Schema for updating existing entries
export const columnsPatchSchema = Type.Partial(columnsSchema, {
  $id: 'ColumnsPatch',
});
export type ColumnsPatch = Static<typeof columnsPatchSchema>;
export const columnsPatchValidator = getValidator(columnsPatchSchema, dataValidator);
export const columnsPatchResolver = resolve<Columns, HookContext<ColumnsService>>({});

// Schema for allowed query properties
export const columnsQueryProperties = Type.Pick(columnsSchema, ['_id', 'name', 'created_at', 'color', 'board_id']);
export const columnsQuerySchema = Type.Intersect(
  [
    querySyntax(columnsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false }),
  ],
  { additionalProperties: false },
);
export type ColumnsQuery = Static<typeof columnsQuerySchema>;
export const columnsQueryValidator = getValidator(columnsQuerySchema, queryValidator);
export const columnsQueryResolver = resolve<ColumnsQuery, HookContext<ColumnsService>>({});
