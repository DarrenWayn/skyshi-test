import createTodo from "../../api/todos/createTodo";
import getTodoList from "../../api/todos/getTodoList";
import updateTodo from "../../api/todos/updateTodo";
import deleteTodo from "../../api/todos/deleteTodo";
import { TTodos, TTodosResponse } from "../../models/todos/index";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { filters, options } from "../../constants";
import updateActivity from "../../api/activity/updateActivity";
import useSortCards from "../../hooks/sorting";

function Todos() {
  const [todoList, setTodoList] = useState<TTodos | undefined>();
  const [cards, setCards] = useState<TTodos[]>([]);
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<string>("choose-priority");
  const [editTodo, setEditTodo] = useState<TTodosResponse>(
    {} as TTodosResponse
  );
  const [activity, setActivity] = useState<string>("");
  const [editActivity, setEditActivity] = useState<TTodosResponse>(
    {} as TTodosResponse
  );

  const [activeDropdown, setActiveDropdown] = useState<string>("");
  const [sorterCards, setSortedCards] = useState<TTodos[]>([]);

  const { todoId } = useParams();

  useEffect(() => {
    (async () => {
      if (!todoId) return;
      const getTodos: any = await getTodoList(todoId);
      setTodoList(getTodos);
      setCards(getTodos.todo_items);
    })();
  }, [cards]);

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

  const handleEditActivity = (activity: any) => {
    setActivity(activity.title);
    setEditActivity(activity);
  };

  const handleCancelEditActivity = () => {
    setEditActivity({} as TTodosResponse);
    setActivity("");
  };

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title,
      activity_group_id: todoId,
      priority,
    };

    const { todo_items: items } = await createTodo(data);
    /* const newCards = [...cards, [items]]; */
    /* setCards(newCards as []); */
    /* setCards((prevCards) => { */
    /*   return [...prevCards, [items] as any]; */
    /* }); */
    setCards([...cards, [items]] as any);
    setTitle("");
    setPriority("choose-priority");
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
    const newCards = [...cards, [items]];
    setCards(newCards as []);
    setTitle("");
    setPriority("choose-priority");
    handleCancelEditTodo();
  };

  const handleEditTodo = (todo: any) => {
    setTitle(todo.title);
    setPriority(todo.priority);
    setEditTodo(todo);
  };

  const handleCancelEditTodo = () => {
    setEditTodo({} as TTodosResponse);
    setTitle("");
  };

  const handleDeleteTodo = async (index: number) => {
    if (!index) return;
    await deleteTodo(index);
    setCards([...cards.filter((_item, i) => i !== index)]);
  };

  const handleCheckbox = async (id: number) => {
    const updatedCards = cards.map((card) =>
      card.id === id
        ? { ...card, is_active: card.is_active === 1 ? 0 : 1 }
        : card
    );
    setCards(updatedCards);
    const updatedItem = updatedCards.find((card) => card.id === id);
    await updateTodo({ ...updatedItem });
  };

  useEffect(() => {
    const sortedCards = useSortCards(cards, activeDropdown);
    setSortedCards(sortedCards);
  }, [activeDropdown, cards]);

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
          value={activeDropdown || "terbaru"}
          onChange={(e: any) => setActiveDropdown(e.target.value)}
        >
          {filters?.map((filter) => (
            <option
              key={filter.id}
              value={filter.value}
              onClick={() => setActiveDropdown(filter.value)}
            >
              {filter.label}
            </option>
          ))}
        </select>
        <ul className="decks">
          {sorterCards?.map((card: any, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={card.is_active === 0}
                onClick={handleCheckbox.bind(this, card.id)}
                readOnly
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
        <label htmlFor="priority">Choose Priority: </label>

        <select
          name="priority"
          id="priority"
          value={priority}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setPriority(e.target.value)
          }
        >
          {options?.map((option) => (
            <option
              key={option.id}
              value={option.value}
              defaultValue={priority}
            >
              {option?.label}
            </option>
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
