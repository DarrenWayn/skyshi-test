import { TActivity } from "@models/activity";
import { useState, createContext } from "react";

export const ActivityContext = createContext({} as any);

const ActivityContextProvider = (props: any) => {
  const [activityList, setActivityList] = useState<TActivity[]>([]);
  const [activity, setActivity] = useState<string>("");
  const [editActivity, setEditActivity] = useState({} as any);

  return (
    <ActivityContext.Provider
      value={{
        activity,
        setActivity,
        activityList,
        setActivityList,
        editActivity,
        setEditActivity,
      }}
    >
      {props.children}
    </ActivityContext.Provider>
  );
};

export default ActivityContextProvider;
