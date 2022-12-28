export type TTodos = {
  activity_group_id: number;
  title: string;
  is_active: number;
  priority: string;
};

export type TTodosResponse = {
  id: number;
  title: string;
  created_at: string;
  todo_items: TTodos[];
};
