import { ActivityResponse } from "../../models/activity";
import customAxios from "../api";

const createActivity = async (data: any): Promise<ActivityResponse> => {
  try {
    const res = await customAxios.post("/activity-groups", data);
    return res?.data;
  } catch (err) {
    throw err;
  }
};

export default createActivity;
