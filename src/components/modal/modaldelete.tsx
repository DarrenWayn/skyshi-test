const ModalDelete = ({
  handleClose,
  handleDeleteTodo,
  selectedIndex,
  selectedTitle,
}: any) => (
  <div
    className="flex flex-col gap-1 mt-5 my-0 pt-10 pb-32 px-10 absolute mx-40 w-[70%]
      bg-white rounded-xl shadow-lg border border-gray-200"
  >
    <button onClick={handleClose} className="absolute left-[97%] top-3">
      X
    </button>
    <p className="text-center mb-5">
      Are you sure you want to delete this "{selectedTitle}" ?
    </p>

    <div className="flex justify-center gap-5">
      <button
        className="bg-blue-400 rounded-full px-4 py-2 text-white text-sm cursor-pointer"
        onClick={handleClose}
      >
        Batal
      </button>
      <button
        className="bg-red-400 rounded-full px-4 py-2 text-white text-sm cursor-pointer"
        onClick={() => handleDeleteTodo(selectedIndex)}
      >
        Hapus
      </button>
    </div>
  </div>
);

export default ModalDelete;
