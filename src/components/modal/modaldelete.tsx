import React from "react";

const ModalDelete = ({ handleClose, handleDelete }: any) => {
  return (
    <div
      className="flex flex-col gap-1 mt-5 my-0 pt-10 pb-32 px-10 absolute mx-56 w-[59%]
      bg-white rounded-xl shadow-lg border border-gray-200"
    >
      <button onClick={handleClose} className="absolute left-[95%] top-3">
        X
      </button>

      <button onClick={handleDelete}>X</button>
    </div>
  );
};

export default ModalDelete;
