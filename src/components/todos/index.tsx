import updateActivity from "../../api/activity/updateActivity";
import createTodo from "../../api/todos/createTodo";
import getTodoList from "../../api/todos/getTodoList";
import updateTodo from "../../api/todos/updateTodo";
import deleteTodo from "../../api/todos/deleteTodo";
import { TTodos, TTodosResponse } from "../../models/todos/index";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { filters, options } from "../../constants";

function Todos() {
  const [todoList, setTodoList] = useState<TTodos | undefined>();
  const [cards, setCards] = useState<TTodos[]>([]);
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [_, setFilter] = useState<string>("");
  const [editTodo, setEditTodo] = useState<TTodosResponse>({} as any);

  const [activity, setActivity] = useState<string>("");
  const [editActivity, setEditActivity] = useState<TTodosResponse>({} as any);

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

  const handleUpdateActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editActivity.id) return;

    const valueEditActivity = {
      title: activity,
      activity_group_id: editActivity?.id,
    };

    const { data: title }: any = await updateActivity(valueEditActivity);
    setTodoList(title);
    setActivity("");
    handleCancelEditActivity();
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
    setEditTodo({} as TTodosResponse);
    setTitle("");
  };

  const handleCancelEditActivity = () => {
    setEditActivity({} as TTodosResponse);
    setActivity("");
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
    <React.Fragment>
      <h1 style={{ display: "flex" }}>
        <a href="/"> {backArrow} </a>
        <a onClick={handleEditActivity.bind(this, todoList)}>
          {todoList?.title}
        </a>
      </h1>

      {editActivity.id ? (
        <React.Fragment>
          <form
            onSubmit={handleUpdateActivity}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              gap: "1rem",
            }}
          >
            <label htmlFor="deck-title">Rename Activity: </label>
            <input
              id="deck-title"
              value={activity}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setActivity(e.target.value);
              }}
            />
            <button>
              {editActivity.id ? "save activity" : "create activity"}
            </button>
            {editActivity.id && (
              <button onClick={handleCancelEditActivity}>Cancel Edit</button>
            )}
          </form>
        </React.Fragment>
      ) : null}
      <div
        className="todo-list"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          gap: "1rem",
        }}
      >
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
                  onClick={handleCheckbox.bind(this, card.id)}
                />
                <a onClick={handleEditTodo.bind(this, card)}>{card.title}</a>
                {card.priority}
                <button onClick={() => handleDeleteTodo(card.id)}>X</button>
              </li>
            ))}
        </ul>
      </div>

      <form
        onSubmit={editTodo?.id ? handleUpdateTodo : handleCreateTodo}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          gap: "1rem",
        }}
      >
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
