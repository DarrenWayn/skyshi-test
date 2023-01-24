import createTodo from "../../api/todos/createTodo";
import getTodoList from "../../api/todos/getTodoList";
import updateTodo from "../../api/todos/updateTodo";
import deleteTodo from "../../api/todos/deleteTodo";
import { Todos, TodosResponse } from "../../models/todos/index";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { options } from "../../constants";
import updateActivity from "../../api/activity/updateActivity";
import useSortCards from "../../hooks/sorting";
import { LoadingContext } from "../../contexts/loader";
import Loader from "../loader";
import Header from "../header";
import Sort from "../sort";

function TodosComponent() {
  const [todoList, setTodoList] = useState<Todos | undefined>();
  const [cards, setCards] = useState<Todos[]>([]);
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<string>("choose-priority");
  const [editTodo, setEditTodo] = useState<TodosResponse>({} as TodosResponse);
  const [activity, setActivity] = useState<string>("");
  const [editActivity, setEditActivity] = useState<TodosResponse>(
    {} as TodosResponse
  );

  const [activeDropdown, setActiveDropdown] = useState<string>("");
  const [sortedCards, setSortedCards] = useState<Todos[]>([]);
  const [sortClick, setSortClick] = useState<boolean>(false);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const { todoId } = useParams();

  const handleGetTodoList = async (todoId: any) => {
    setIsLoading(true);
    const getTodos: any = await getTodoList(todoId);
    setTodoList(getTodos);
    setCards(getTodos.todo_items);
    setIsLoading(false);
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

  const handleEditActivity = (activity: any) => {
    setActivity(activity.title);
    setEditActivity(activity);
  };

  const handleCancelEditActivity = () => {
    setEditActivity({} as TodosResponse);
    setActivity("");
  };

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title,
      activity_group_id: todoId,
      priority,
    };

    await createTodo(data);
    handleGetTodoList(todoId);
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

    await updateTodo(valueEdit);
    handleGetTodoList(todoId);
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
    setEditTodo({} as TodosResponse);
    setTitle("");
  };

  const handleDeleteTodo = async (index: number) => {
    if (!index) return;
    await deleteTodo(index);
    handleGetTodoList(todoId);
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
    if (!todoId) return;
    handleGetTodoList(todoId);
  }, [todoId]);

  const handleSortClick = () => {
    setSortClick(!sortClick);
  };

  useEffect(() => {
    const sortedCards = useSortCards(cards, activeDropdown);
    setSortedCards(sortedCards);
  }, [activeDropdown, cards]);

  const backArrow = "<";

  return (
    <React.Fragment>
      <Header />
      <div className="flex justify-around mx-[14%] items-baseline mt-5">
        <h1 className="text-2xl font-bold">
          <Link to="/" className="font-bold text-lg ml-4 mr-3">
            {backArrow}
          </Link>
          <a onClick={handleEditActivity.bind(this, todoList)}>
            {todoList?.title}
          </a>
        </h1>
        <form
          onSubmit={editTodo?.id ? handleUpdateActivity : handleCreateTodo}
          className="flex gap-2"
        >
          <div
            className="rounded-full text-gray-600 bg-gray-100 p-2 hover:cursor-pointer"
            onClick={handleSortClick}
          >
            Sort
          </div>

          <button className="bg-blue-400 rounded-full p-2 px-9 text-white text-lg">
            {editTodo.id ? "Simpan" : "+ Tambah"}
          </button>
        </form>
      </div>

      {sortClick ? (
        <Sort
          setSortClick={setSortClick}
          setActiveDropdown={setActiveDropdown}
        />
      ) : null}
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
        <label htmlFor="filter" style={{ color: "white" }}>
          Filter:
        </label>

        {isLoading ? (
          <Loader />
        ) : (
          <ul className="decks decks-small">
            {sortedCards?.map((card: any, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={card.is_active === 0}
                  onClick={handleCheckbox.bind(this, card.id)}
                  readOnly
                />
                <a
                  onClick={handleEditTodo.bind(this, card)}
                  style={{ color: "black" }}
                >
                  {card.title}
                </a>
                {card.priority}
                <button onClick={() => handleDeleteTodo(card.id)}>X</button>
              </li>
            ))}
          </ul>
        )}
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
        <label htmlFor="deck-title" style={{ color: "white" }}>
          Todos
        </label>
        <input
          id="deck-title"
          value={title}
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
          placeholder="  Type Your TodoList Here ...."
        />

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
        {editTodo.id && (
          <button onClick={handleCancelEditTodo}>Cancel Edit</button>
        )}
      </form>
    </React.Fragment>
  );
}

export default TodosComponent;
