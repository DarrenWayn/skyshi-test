import { ActivityResponse } from "../../models/activity";
import customAxios from "../api";

const deleteActivity = async (
  activityId: number
): Promise<ActivityResponse> => {
  try {
    const res = await customAxios.delete(`/activity-groups/${activityId}`);
    return res?.data;
  } catch (err) {
    throw err;
  }
};

export default deleteActivity;
