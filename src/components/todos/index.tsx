import createTodo from "../../api/todos/createTodo";
import getTodoList from "../../api/todos/getTodoList";
import updateTodo from "../../api/todos/updateTodo";
import deleteTodo from "../../api/todos/deleteTodo";
import { Todos, TodosResponse } from "../../models/todos/index";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import updateActivity from "../../api/activity/updateActivity";
import useSortCards from "../../hooks/sorting";
import { LoadingContext } from "../../contexts/loader";
import Loader from "../loader";
import Header from "../header";
import Sort from "../sort";
import useClickOutside from "../../hooks/clickOutside";
import ModalCreateAndUpdate from "../modal/modalcreateandupdate";
import { ModalContext } from "../../contexts/modal";
import ModalDelete from "../modal/modaldelete";

const TodosComponent: React.FC = () => {
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

  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  );

  const [modalType, setModalType] = useState<string>("");
  const { isModalOpen, handleOpenModal, handleCloseModal } =
    useContext(ModalContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const ref = useRef<HTMLDivElement>(null);

  const { todoId } = useParams();

  const handleClickOutside = useCallback(() => {
    handleUpdateActivity();
  }, [activity, editActivity]);

  useClickOutside({ ref, callback: handleClickOutside });

  const handleGetTodoList = async (todoId: any) => {
    setIsLoading(true);
    const getTodos: any = await getTodoList(todoId);
    setTodoList(getTodos);
    setCards(getTodos.todo_items);
    setIsLoading(false);
  };

  const handleUpdateActivity = async (/* e: React.FormEvent */) => {
    /* e.preventDefault(); */
    if (!editActivity.id) return;

    const valueEditActivity = {
      title: activity,
      activity_group_id: editActivity?.id,
    };

    /* const { data: updatedTitle }: any = await updateActivity(valueEditActivity); */
    const updatedTodoList = await updateActivity(valueEditActivity);
    setTodoList((prev: any) => {
      return { ...prev, ...updatedTodoList };
    });
    handleCancelEditActivity();
    setActivity("");
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
    handleCloseModal();
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
    handleCloseModal();
  };

  const handleEditTodo = (todo: any) => {
    setTitle(todo.title);
    setPriority(todo.priority);
    setEditTodo(todo);
    handleOpenModal();
  };

  const handleCancelEditTodo = () => {
    setEditTodo({} as TodosResponse);
    setTitle("");
  };

  const handleDeleteTodo = async (index: number) => {
    if (!index) return;
    await deleteTodo(index);
    handleGetTodoList(todoId);
    handleCloseModal();
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

  useEffect(() => {
    const sortedCards = useSortCards(cards, activeDropdown);
    setSortedCards(sortedCards);
  }, [activeDropdown, cards]);

  const backArrow = "<";

  return (
    <React.Fragment>
      <Header />
      <div
        className="flex justify-around mx-[14%] items-baseline mt-5"
        ref={ref}
      >
        <h1 className="text-xl xs:text-sm xss:text-sm font-bold">
          <Link to="/" className="font-bold  ml-4 mr-1">
            {backArrow}
          </Link>
          {editActivity.id ? null : (
            <a className="text-md">{todoList?.title}</a>
          )}
          {editActivity.id ? (
            <input
              id="deck-title"
              value={activity}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setActivity(e.target.value);
              }}
            />
          ) : null}
          <a
            onClick={handleEditActivity.bind(this, todoList)}
            className="ml-2 text-md cursor-pointer hover:text-blue-400"
          >
            Edit
          </a>
        </h1>

        <div className="flex gap-2">
          <div className="relative">
            <div
              className="rounded-full text-sm text-gray-600 bg-gray-100 p-2 hover:cursor-pointer"
              onClick={() => setSortClick(!sortClick)}
            >
              Sort
            </div>
            {sortClick ? (
              <Sort
                setSortClick={setSortClick}
                setActiveDropdown={setActiveDropdown}
              />
            ) : null}
          </div>

          <button
            onClick={
              editTodo?.id
                ? handleUpdateActivity
                : () => {
                    handleOpenModal();
                    setModalType("add-update");
                  }
            }
            className="bg-blue-400 rounded-full px-4 text-white text-sm"
          >
            + Tambah
          </button>
        </div>
      </div>

      {isModalOpen && modalType === "add-update" && (
        <ModalCreateAndUpdate
          handleClose={handleCloseModal}
          title={title}
          editTodo={editTodo}
          priority={priority}
          setPriority={setPriority}
          setTitle={setTitle}
          handleCreateTodo={handleCreateTodo}
          handleUpdateTodo={handleUpdateTodo}
        />
      )}

      {isModalOpen && modalType === "delete" && (
        <ModalDelete
          selectedIndex={selectedIndex}
          handleDeleteTodo={handleDeleteTodo}
          handleClose={handleCloseModal}
        />
      )}

      <div className="mt-5">
        {isLoading ? (
          <Loader />
        ) : (
          <ul className="w-[60%] mx-auto">
            {sortedCards?.map((card: any, index) => (
              <li
                key={index}
                className="rounded-xl border border-gray-50 shadow-md shadow-gray-400 px-5 py-4 flex justify-between mr-auto mb-5"
              >
                <div className="flex flex-wrap gap-2">
                  <input
                    type="checkbox"
                    checked={card.is_active === 0}
                    onClick={handleCheckbox.bind(this, card.id)}
                    readOnly
                  />
                  <p>{card.title}</p>
                  <a
                    onClick={handleEditTodo.bind(this, card)}
                    className="mr-2 cursor-pointer hover:text-blue-600 font-bold"
                  >
                    Edit
                  </a>
                </div>

                <button
                  className="hover:text-blue-600"
                  onClick={() => {
                    handleOpenModal();
                    setSelectedIndex(card.id);
                    setModalType("delete");
                  }}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </React.Fragment>
  );
};

export default TodosComponent;
