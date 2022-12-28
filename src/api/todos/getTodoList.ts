import { TTodosResponse } from "../../models/todos";
import customAxios from "../api";

const getTodoList = async (todoId: any): Promise<TTodosResponse[]> => {
  try {
    const res = await customAxios.get(`/activity-groups/${todoId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export default getTodoList;
