import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import updateActivity from "../../api/activity/updateActivity";
import createTodo from "../../api/todos/createTodo";
import deleteTodo from "../../api/todos/deleteTodo";
import getTodoList from "../../api/todos/getTodoList";
import updateTodo from "../../api/todos/updateTodo";
import { options, filters } from "../../constants";
import { TTodos } from "../../models/todos";

function Todos() {
  const [todoList, setTodoList] = useState<TTodos | undefined>();
  const [cards, setCards] = useState<TTodos[]>([]);
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [editTodo, setEditTodo] = useState<object>({});

  const [activity, setActivity] = useState<string>("");
  const [editActivity, setEditActivity] = useState<object>({});

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
    window.location.reload();
  };

  const handleUpdateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTodo?.id) return;

    const valueEdit = {
      title: title,
      id: editTodo?.id,
      priority,
    };

    const { todo_items: items } = await updateTodo(valueEdit);
    setCards(items);
    setTitle("");
    window.location.reload();
  };

  const handleUpdateActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editActivity?.id) return;

    const valueEditActivity = {
      title: activity,
      activity_group_id: todoId,
    };

    const { data: title } = await updateActivity(valueEditActivity);
    setTodoList(title);
    setActivity("");
    window.location.reload();
  };

  const handleEditTodo = (todo: any) => {
    setTitle(todo.title);
    setEditTodo(todo);
  };

  const handleEditActivity = (activity: any) => {
    setActivity(activity.title);
    setEditActivity(activity);
  };

  const handleCancelEditTodo = () => {
    setEditTodo({});
    setTitle("");
  };

  const handleCancelEditActivity = () => {
    setEditActivity({});
    setActivity("");
  };

  const handleDeleteTodo = async (index: number) => {
    if (!index) return;
    const deleteTodos = await deleteTodo(index);
    setCards(deleteTodos?.todo_items);
    window.location.reload();
  };

  const handleFilterTodo = (filter: any) => {
    if (!filter) return;
    console.log(filter);
  };

  const handleCheckbox = async (todo: any) => {
    let items = [];
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].id !== todo.id) {
        items.push(cards[i]);
      } else {
        items.push({
          ...cards[i],
          is_active: cards[i].is_active === 1 ? 0 : 1,
        });
      }
    }
    setCards(items);
    const updatedItem = cards.find((card) => card.id === todo.id);
    const valueEdit = {
      title: updatedItem.data,
      id: updatedItem.id,
      is_active: updatedItem.is_active,
      priority: updatedItem.priority,
    };
    const { items_todo: item } = await updateTodo(valueEdit);
    setCards(item);
    setTitle("");
    window.location.reload();
  };

  useEffect(() => {
    (async () => {
      if (!todoId) return;
      const getTodos = await getTodoList(todoId);
      setTodoList(getTodos);
      setCards(getTodos?.todo_items);
    })();
  }, [todoId]);

  const backArrow = "<";

  return (
    <React.Fragment>
      <h1 style={{ display: "flex" }}>
        <a href="/"> {backArrow} </a>
        <a onClick={handleEditActivity.bind(this, todoList)}>
          {todoList?.title}
        </a>
      </h1>

      {editActivity.id ? (
        <React.Fragment>
          <form onSubmit={handleUpdateActivity}>
            <label htmlFor="deck-title">Todos</label>
            <input
              id="deck-title"
              value={activity}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setActivity(e.target.value);
              }}
            />
            <button onClick={handleUpdateActivity}>save activity</button>
            <button onClick={handleCancelEditActivity}>Cancel Edit</button>
          </form>
        </React.Fragment>
      ) : null}
      <label htmlFor="filter">Filter: </label>
      <select
        name="filter"
        id="filter"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setFilter(e.target.value)
        }
      >
        {filters?.map((filter) => (
          <option
            value={filter.value}
            onClick={handleFilterTodo.bind(this, filter)}
          >
            {filter.label}
          </option>
        ))}
      </select>
      <ul className="decks">
        {cards &&
          cards?.map((card: any) => (
            <li key={card.id}>
              <input
                type="checkbox"
                checked={card.is_active === 0}
                onClick={handleCheckbox.bind(this, card)}
              />
              <a onClick={handleEditTodo.bind(this, card)}>{card.title}</a>
              {card.priority}
              <button onClick={() => handleDeleteTodo(card.id)}>X</button>
            </li>
          ))}
      </ul>

      <form onSubmit={editTodo?.id ? handleUpdateTodo : handleCreateTodo}>
        <label htmlFor="deck-title">Todos</label>
        <input
          id="deck-title"
          value={title}
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor="priotity">Choose Priority: </label>
        <select
          name="pririty"
          id="priority"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setPriority(e.target.value)
          }
        >
          {options?.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
        <button>{editTodo.id ? "save todo" : "create todo"}</button>
        {editTodo.id && (
          <button onClick={handleCancelEditTodo}>Cancel Edit</button>
        )}
      </form>
    </React.Fragment>
  );
}

export default Todos;
