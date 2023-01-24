import { TodosResponse } from "../../models/todos";
import customAxios from "../api";

const createTodo = async (data: any): Promise<TodosResponse> => {
  try {
    const res = await customAxios.post("/todo-items", data);
    return res?.data;
  } catch (err) {
    throw err;
  }
};

export default createTodo;
