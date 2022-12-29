import { TTodosResponse } from "@models/todos";
import customAxios from "../api";

const updateTodo = async (valueEdit: any): Promise<TTodosResponse> => {
  try {
    const { id } = valueEdit;
    const res = await customAxios.patch(`/todo-items/${id}`, valueEdit);
    return res?.data;
  } catch (err) {
    throw err;
  }
};

export default updateTodo;
