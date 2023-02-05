import React from "react";
import { options } from "../../constants";

type Modal = {
  title: string;
  setTitle: any;
  priority: any;
  setPriority: any;
  handleCreateTodo: any;
  handleClose: any;
};

const ModalCreate = ({
  title,
  setTitle,
  priority,
  setPriority,
  handleCreateTodo,
  handleClose,
}: Modal) => {
  return (
    <div
      className="flex flex-col gap-1 mt-5 pt-16 pb-28 px-10 absolute w-full top-28
      bg-white rounded-xl shadow-lg border border-gray-200"
      data-cy="modal-add-priority-item"
    >
      <button onClick={handleClose} className="absolute left-[95%] top-3">
        X
      </button>

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
          <option key={option.id} value={option.value} defaultValue={priority}>
            {option?.color} | {option?.label}
          </option>
        ))}
      </select>
      <button
        className="absolute left-[78%] top-[75%] bg-blue-400 rounded-full px-4 py-2 text-white text-sm xs:text-xs w-[20%] cursor-pointer"
        onClick={handleCreateTodo}
        disabled={title.length === 0}
      >
        Tambah
      </button>
    </div>
  );
};

export default ModalCreate;
