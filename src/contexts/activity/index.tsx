import React, { useState, createContext, useEffect } from "react";
import createActivity from "../../api/activity/createActivity";
import deleteActivity from "../../api/activity/deleteActivity";
import getActivityList from "../../api/activity/getActivityList";
import updateActivity from "../../api/activity/updateActivity";
import { TActivity } from "../../models/activity";
import { Todos, TodosResponse } from "../../models/todos";

export const ActivityContext = createContext({} as any);

const ActivityContextProiver = (props: any) => {
  const [activityList, setActivityList] = useState<TActivity[]>([]);
  const [activity, setActivity] = useState<string>("");
  const [editActivity, setEditActivity] = useState<TodosResponse>({} as any);

  const [todoList, setTodoList] = useState<Todos | undefined>();

  const handleCreateActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title: "New Activity",
      email: "dwayn.dev@gmail.com",
    };
    const activities: any = await createActivity(data);
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
    if (!editActivity.id) return;

    const valueEditActivity = {
      title: activity,
      activity_group_id: editActivity?.id,
    };

    const { data: title }: any = await updateActivity(valueEditActivity);
    setTodoList(title);
    setActivity("");
    handleCancelEditActivity();
  };

  const handleEditActivity = (activity: any) => {
    setActivity(activity.title);
    setEditActivity(activity);
  };

  const handleCancelEditActivity = () => {
    setEditActivity({} as TodosResponse);
    setActivity("");
  };

  useEffect(() => {
    (async () => {
      const getLists = await getActivityList();
      setActivityList(getLists.data);
    })();
  }, []);

  return (
    <ActivityContext.Provider
      value={{
        handleCreateActivity,
        handleDeleteActivity,
        handleUpdateActivity,
        handleEditActivity,
        handleCancelEditActivity,
        todoList,
        activityList,
        activity,
        setActivity,
        editActivity,
      }}
    >
      {props.children}
    </ActivityContext.Provider>
  );
};

export default ActivityContextProiver;
