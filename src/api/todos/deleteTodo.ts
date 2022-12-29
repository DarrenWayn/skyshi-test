import { TTodosResponse } from "../../models/todos";
import customAxios from "../api";

const deleteTodo = async (index: number): Promise<TTodosResponse> => {
  try {
    const res = await customAxios.delete(`/todo-items/${index}`);
    return res?.data;
  } catch (err) {
    throw err;
  }
};

export default deleteTodo;
