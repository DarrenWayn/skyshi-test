export type TTodos = {
  activity_group_id: number;
  id: number;
  title: string;
  is_active: number;
  priority: string;
};

export type TTodosResponse = {
  id: string;
  title: string;
  created_at: string;
  todo_items: TTodos[];
};
