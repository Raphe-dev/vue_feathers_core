import { columns } from './columns/columns';
import { tasks } from './tasks/tasks';
import { boards } from './boards/boards';
import { todo } from './todo/todo';
import { user } from './users/users';
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations';

export const services = (app: Application) => {
  app.configure(columns);
  app.configure(tasks);
  app.configure(boards);
  app.configure(todo);
  app.configure(user);
};
