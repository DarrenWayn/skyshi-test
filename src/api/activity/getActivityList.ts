import { ActivityResponse } from "../../models/activity";
import customAxios from "../api";

const getActivityList = async (): Promise<ActivityResponse> => {
  try {
    const res = await customAxios.get<ActivityResponse>(
      "/activity-groups?email=dwayn.dev@gmail.com"
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export default getActivityList;
