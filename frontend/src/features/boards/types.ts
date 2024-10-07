export interface Task {
  id: string;
  content: string;
  order: number;
}

export interface TaskList {
  id: string;
  name: string;
  tasks: Record<number, Task>;
}

export interface Board {
  id: string;
  name: string;
  backgroundImage: string;
  createdAt: string | number;
  taskLists: Record<string, TaskList>;
}

export type Boards = Record<string, Board>;
