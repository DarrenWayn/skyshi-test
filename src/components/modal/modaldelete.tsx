const ModalDelete = ({
  handleClose,
  handleDeleteTodo,
  selectedIndex,
  selectedTitle,
}: any) => (
  <div
    className="flex flex-col gap-1 mt-5 py-16 px-10 absolute w-full top-28
      bg-white rounded-xl shadow-lg border border-gray-200"
    data-cy="todo-modal-delete"
  >
    <button onClick={handleClose} className="absolute left-[97%] top-2">
      X
    </button>
    <p className="text-center mb-5" data-cy="modal-delete-title">
      Are you sure you want to delete this "{selectedTitle}" ?
    </p>

    <div className="flex justify-center gap-5">
      <button
        className="bg-blue-400 rounded-full px-4 py-2 text-white text-sm cursor-pointer"
        data-cy="modal-delete-cancel-button"
        onClick={handleClose}
      >
        Batal
      </button>
      <button
        className="bg-red-400 rounded-full px-4 py-2 text-white text-sm cursor-pointer"
        data-cy="modal-delete-confirm-button"
        onClick={() => handleDeleteTodo(selectedIndex)}
      >
        Hapus
      </button>
    </div>
  </div>
);

export default ModalDelete;
