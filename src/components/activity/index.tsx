import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import createActivity from "../../api/activity/createActivity";
import deleteActivity from "../../api/activity/deleteActivity";
import getActivityList from "../../api/activity/getActivityList";
import { TActivity } from "../../models/activity";
import ProperDate from "../../utils";
import Header from "../header";

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
      <Header />
      <div className="flex justify-around mx-[12%] items-baseline ">
        <h1 className="text-2xl font-bold ">Activity</h1>
        <form onSubmit={handleCreateActivity}>
          <button className="bg-blue-400 rounded-full p-2 px-4 text-white text-sm">
            + Tambah
          </button>
        </form>
      </div>
      <ul className="grid grid-cols-activity xss:grid-row xss:w-[80%] gap-4 w-[50%]  my-0 mx-auto mb-5">
        {activityList.map((activity: any) => (
          <li
            key={activity.id}
            className="rounded-xl border border-gray-50 shadow-md shadow-gray-400 px-5 pt-4"
          >
            <Link
              to={`detail/${activity.id}`}
              className="flex flex-row text-black pb-[6rem] font-bold"
            >
              {activity?.title}
            </Link>
            <div className="flex justify-between pb-3">
              <p className="text-gray-400">
                {ProperDate(activity?.created_at)}
              </p>
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
