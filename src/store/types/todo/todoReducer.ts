export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export interface TodoState {
  todos: [] | Todo[];
  loading: boolean;
}
