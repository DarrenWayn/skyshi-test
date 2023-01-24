import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import createActivity from "../../api/activity/createActivity";
import deleteActivity from "../../api/activity/deleteActivity";
import getActivityList from "../../api/activity/getActivityList";
import { TActivity } from "../../models/activity";
import ProperDate from "../../utils";

function Activity() {
  const [activityList, setActivityList] = useState<TActivity[]>([]);

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

  useEffect(() => {
    (async () => {
      const getLists = await getActivityList();
      setActivityList(getLists.data);
    })();
  }, []);

  return (
    <React.Fragment>
      <header className="bg-blue-400 py-4 pb-5">
        <h1 className="ml-[27%] text-xl text-white font-bold">
          TO DO LIST APP
        </h1>
      </header>
      <div className="flex justify-around mx-[10%] items-baseline ">
        <h1 className="text-2xl font-bold ">Activity</h1>
        <form onSubmit={handleCreateActivity}>
          <button className="bg-blue-400 rounded-2xl p-2 px-5 text-white">
            + Tambah
          </button>
        </form>
      </div>
      <ul className="grid grid-cols-activity gap-4 w-[50%] my-0 mx-auto">
        {activityList.map((activity: any) => (
          <li
            key={activity.id}
            className="rounded-xl border border-gray-50 shadow-md shadow-gray-400 px-5 pt-4"
          >
            <Link
              to={`detail/${activity.id}`}
              className="flex flex-row text-black pb-[6rem]"
            >
              {activity?.title}
            </Link>
            <div className="flex justify-between pb-3">
              {ProperDate(activity?.created_at)}
              <button onClick={() => handleDeleteActivity(activity.id)}>
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export default Activity;
