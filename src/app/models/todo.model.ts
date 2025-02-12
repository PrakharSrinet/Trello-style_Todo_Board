export interface Todo {
  id: number;
  todo: string;
  newTodoDescription?: string;
  description?: string; // Optional description field
  completed: boolean;
  status: 'pending' | 'in-progress' | 'completed';
}
