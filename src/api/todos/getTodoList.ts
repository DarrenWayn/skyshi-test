import { TodosResponse } from "../../models/todos";
import customAxios from "../api";

const getTodoList = async (todoId: any): Promise<TodosResponse[]> => {
  try {
    const res = await customAxios.get(`/activity-groups/${todoId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export default getTodoList;
