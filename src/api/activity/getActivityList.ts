import { TResponseActivity } from "@models/activity";
import customAxios from "../api";

const getActivityList = async (): Promise<TResponseActivity> => {
  try {
    const res = await customAxios.get(
      "/activity-groups?email=dwayn.dev@gmail.com"
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export default getActivityList;
