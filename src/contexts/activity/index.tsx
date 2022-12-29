import { TActivity } from "@models/activity/index";
import { TTodos } from "@models/todos/index";
import * as React from "react";
import createActivity from "@api/activity/createActivity";
import deleteActivity from "@api/activity/deleteActivity";
import getActivityList from "@api/activity/getActivityList";
import updateActivity from "@api/activity/updateActivity";

export const ActivityContext = React.createContext({} as any);

const ActivityContextProvider = (props: any) => {
  const [activityList, setActivityList] = React.useState<TActivity[]>([]);
  const [activity, setActivity] = React.useState<string>("");
  const [editActivity, setEditActivity] = React.useState({} as any);

  const [todoList, setTodoList] = React.useState<TTodos | undefined>();

  const handleCreateActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title: "New Activity",
      email: "dwayn.dev@gmail.com",
    };
    const activities = await createActivity(data);
    setActivityList([...activityList, activities]);
  };

  const handleDeleteActivity = async (activityId: number) => {
    await deleteActivity(activityId);
    setActivityList(
      activityList.filter((activity) => activity.id !== activityId)
    );
  };

  const handleUpdateActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editActivity?.id) return;

    const valueEditActivity = {
      title: activity,
      activity_group_id: editActivity?.id,
    };

    const { data: title } = await updateActivity(valueEditActivity);
    setTodoList(title);
    setActivity("");
    window.location.reload();
  };

  const handleEditActivity = (activity: any) => {
    setActivity(activity.title);
    setEditActivity(activity);
  };

  React.useEffect(() => {
    (async () => {
      const getLists = await getActivityList();
      setActivityList(getLists.data);
    })();
  }, []);

  return (
    <ActivityContext.Provider
      value={{
        activityList,
        todoList,
        handleCreateActivity,
        handleDeleteActivity,
        handleUpdateActivity,
        handleEditActivity,
      }}
    >
      {props.children}
    </ActivityContext.Provider>
  );
};

export default ActivityContextProvider;
