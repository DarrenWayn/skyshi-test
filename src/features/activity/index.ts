import {
  title,
  activity_group_id,
  priority,
  todoId,
} from "../../components/activity";

const features = {
  handleCreateTodo: async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title,
      activity_group_id: todoId,
      priority,
    };

    const { todo_items: items } = await createTodo(data);
    setCards(items);
    setTitle("");
    window.location.reload();
  },
};

export default features;
