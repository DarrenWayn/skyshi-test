import createTodo from "../../api/todos/createTodo";
import getTodoList from "../../api/todos/getTodoList";
import updateTodo from "../../api/todos/updateTodo";
import deleteTodo from "../../api/todos/deleteTodo";
import { TTodos, TTodosResponse } from "../../models/todos/index";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { filters, options } from "../../constants";
import updateActivity from "../../api/activity/updateActivity";

function Todos() {
  const [todoList, setTodoList] = useState<TTodos | undefined>();
  const [cards, setCards] = useState<TTodos[]>([]);
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [editTodo, setEditTodo] = useState<TTodosResponse>({} as any);
  const [activity, setActivity] = useState<string>("");
  const [editActivity, setEditActivity] = useState<TTodosResponse>({} as any);

  const [activeDropdown, setActiveDropdown] = useState<string>("");

  const { todoId } = useParams();

  const iniHasil = useCallback(async () => {
    if (!todoId) return;
    const getTodos: any = await getTodoList(todoId);
    /* setTodoList(getTodos?.todo_items); */
    /* setTodoList((prev) => prev); */
    /* setCards((prev) => ({ ...prev })); */
    setCards(getTodos?.todo_items);
  }, [cards]);

  useEffect(() => {
    iniHasil();
  }, [iniHasil]);

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
    setEditTodo({} as TTodosResponse);
    setTitle("");
  };

  const handleDeleteTodo = async (index: number) => {
    if (!index) return;
    const deleteTodos = await deleteTodo(index);
    setCards(deleteTodos?.todo_items);
  };

  /* const handleFilterTodo = (filter: any) => { */
  /*   if (!filter) return; */
  /*   console.log(filter.id); */
  /*   setActiveDropdown(filter.id); */
  /* }; */

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
      title: updatedItem?.data,
      id: updatedItem.id,
      is_active: updatedItem.is_active,
      priority: updatedItem.priority,
    };
    const { todo_items: item } = await updateTodo(valueEdit);
    setCards(item);
    setTitle("");
  };

  /* const checkbox = useMemo(() => handleCheckbox, [cards]); */

  useEffect(() => {
    let items = cards;
    const sortAlphabetAscending = (a: any, b: any) => {
      if (a.title > b.title) {
        return 1;
      } else if (a.title < b.title) {
        return -1;
      } else {
        return 0;
      }
    };

    const sortAlphabetDescending = (a: any, b: any) => {
      if (a.title < b.title) {
        return 1;
      } else if (a.title > b.title) {
        return -1;
      } else {
        return 0;
      }
    };

    if (activeDropdown === "terbaru") {
      let sortedItems = items.sort((a: any, b: any) => b.id - a.id);
      setCards(sortedItems);
    } else if (activeDropdown === "terlama") {
      let sortedItems = items.sort((a: any, b: any) => a.id - b.id);
      setCards(sortedItems);
    } else if (activeDropdown === "ascending") {
      let sortedItems = items.sort(sortAlphabetAscending);
      setCards(sortedItems);
    } else if (activeDropdown === "descending") {
      let sortedItems = items.sort(sortAlphabetDescending);
      setCards(sortedItems);
    } else {
      let sortedItems = items.sort(
        (a: any, b: any) => b.is_active - a.is_active
      );
      setCards(sortedItems);
    }
  }, []);

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
          /* onClick={(e: any) => setActiveDropdown(e.target.value)} */
        >
          {filters?.map((filter) => (
            <option
              key={filter.id}
              value={filter.value}
              onClick={(e: any) => setActiveDropdown(e.target.value)}
              /* onClick={handleFilterTodo.bind(this, filter)} */
              /* onClick={() => console.log(filter.id)} */
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
                  readOnly
                  /* onChange={() => handleCheckbox(card.id)} */
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
            <option key={option.id} value={option.value}>
              {option.label}
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
