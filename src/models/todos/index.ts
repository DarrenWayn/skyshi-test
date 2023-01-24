export type Todos = {
  activity_group_id: number;
  id: number;
  title: string;
  is_active: number;
  priority: string;
};

export type TodosResponse = {
  id: string;
  title: string;
  created_at: string;
  todo_items: Todos[];
};

export type TodoData = {
  title: string;
  activity_group_id: string;
  priority: string;
};
