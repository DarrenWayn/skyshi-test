import { TResponseActivity } from "../../models/activity";
import customAxios from "../api";

const updateActivity = async (
  valueEditActivity: any
): Promise<TResponseActivity> => {
  try {
    const { activity_group_id } = valueEditActivity;
    const res = await customAxios.patch(
      `/activity-groups/${activity_group_id}`,
      valueEditActivity
    );
    return res?.data;
  } catch (err) {
    throw err;
  }
};

export default updateActivity;
