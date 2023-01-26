import React from "react";
import { options } from "../../constants";

type Modal = {
  editTodo: any;
  title: string;
  setTitle: any;
  priority: any;
  setPriority: any;
  handleCreateTodo: any;
  handleUpdateTodo: any;
  handleClose: any;
  isTodo: boolean;
};

const Modal = ({
  editTodo,
  title,
  setTitle,
  priority,
  setPriority,
  handleCreateTodo,
  handleUpdateTodo,
  handleClose,
  isTodo = false,
}: Modal) => (
  <div className="relative mx-60  py-[10px] bg-white rounded-xl shadow-lg border border-gray-200">
    <button onClick={handleClose} className="absolute left-[95%] top-[3%]">
      X
    </button>

    {isTodo ? (
      <form
        onSubmit={editTodo?.id ? handleUpdateTodo : handleCreateTodo}
        className="flex flex-col  gap-1 mt-5 my-0 px-5 pt-2 pb-32 "
      >
        <input
          value={title}
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
          placeholder="  Tambahkan nama Activity"
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
              {option?.color} | {option?.label}
            </option>
          ))}
        </select>
        <button
          className="absolute left-[78%] top-[75%] bg-blue-400 rounded-full px-4 py-2 text-white text-sm w-[20%] cursor-pointer"
          onClick={handleCreateTodo}
          disabled={title.length === 0}
        >
          Simpan
        </button>
      </form>
    ) : null}
  </div>
);

export default Modal;
