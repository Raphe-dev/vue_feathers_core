export interface Task {
  id: string;
  content: string;
  order: number;
}

export type Tasks = Record<string, Task>;

export interface Column {
  id: string;
  name: string;
  tasks: Tasks;
}

export type Columns = Record<string, Column>;

export interface Board {
  id: string;
  name: string;
  backgroundImage: string;
  createdAt: string | number;
  columns: Columns;
}

export type Boards = Record<string, Board>;
