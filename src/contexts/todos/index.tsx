import React, { useState, createContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import createTodo from "../../api/todos/createTodo";
import deleteTodo from "../../api/todos/deleteTodo";
import getTodoList from "../../api/todos/getTodoList";
import updateTodo from "../../api/todos/updateTodo";
import { Todos, TodosResponse } from "../../models/todos";

export const TodosContext = createContext({} as any);

const TodosContextProvider = (props: any) => {
  const [todoList, setTodoList] = useState<Todos | undefined>();
  const [cards, setCards] = useState<Todos[]>([]);
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [_, setFilter] = useState<string>("");
  const [editTodo, setEditTodo] = useState<TodosResponse>({} as any);

  const { todoId } = useParams();

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title,
      activity_group_id: todoId,
      priority,
    };

    const { todo_items: items } = await createTodo(data);
    setCards(items);
    setTitle("");
  };

  const handleUpdateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTodo.id) return;

    const valueEdit = {
      title: title,
      id: editTodo.id,
      priority,
    };

    const { todo_items: items } = await updateTodo(valueEdit);
    setCards(items);
    setTitle("");
    handleCancelEditTodo();
  };

  const handleEditTodo = (todo: any) => {
    setTitle(todo.title);
    setEditTodo(todo);
  };

  const handleCancelEditTodo = () => {
    setEditTodo({} as TodosResponse);
    setTitle("");
  };

  const handleDeleteTodo = async (index: number) => {
    if (!index) return;
    const deleteTodos = await deleteTodo(index);
    setCards(deleteTodos?.todo_items);
    /* window.location.reload(); */
  };

  const handleFilterTodo = (filter: any) => {
    if (!filter) return;
    console.log(filter);
  };

  const handleCheckbox = async (id: number) => {
    let newCards = [];
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].id !== id) {
        newCards.push(cards[i]);
      } else {
        newCards.push({
          ...cards[i],
          is_active: cards[i].is_active === 1 ? 0 : 1,
        });
      }
    }
    setCards(newCards);
    const updatedItem: any = newCards.find((card) => card.id === id);
    const valueEdit = {
      title: updatedItem.data,
      id: updatedItem.id,
      is_active: updatedItem.is_active,
      priority: updatedItem.priority,
    };
    const { todo_items: item } = await updateTodo(valueEdit);
    setCards(item);
    setTitle("");
  };

  useEffect(() => {
    (async () => {
      if (!todoId) return;
      const getTodos: any = await getTodoList(todoId);
      setTodoList(getTodos);
      setCards(getTodos?.todo_items);
    })();
  }, [todoId, cards]);

  const backArrow = "<";

  return (
    <TodosContext.Provider
      value={{
        handleCreateTodo,
        handleDeleteTodo,
        handleUpdateTodo,
        handleEditTodo,
        handleCancelEditTodo,
        handleFilterTodo,
        handleCheckbox,
        setTodoList,
        todoList,
        setPriority,
        setFilter,
        backArrow,
        cards,
        setCards,
        title,
        setTitle,
        editTodo,
      }}
    >
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
