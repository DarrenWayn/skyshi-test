import React, { useState, useEffect } from "react";
import createActivity from "../../api/activity/createActivity";
import deleteActivity from "../../api/activity/deleteActivity";
import getActivityList from "../../api/activity/getActivityList";
import { TActivity } from "../../models/activity";
import { Link } from "react-router-dom";

function Activity() {
  const [activityList, setActivityList] = useState<TActivity[]>([]);

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

  useEffect(() => {
    (async () => {
      const getLists = await getActivityList();
      setActivityList(getLists.data);
    })();
  }, []);

  return (
    <React.Fragment>
      <h1>Activity</h1>
      <ul className="decks">
        {activityList.map((activity) => (
          <li key={activity.id}>
            <Link to={`detail/${activity.id}`}>{activity?.title}</Link>
            <button onClick={() => handleDeleteActivity(activity.id)}>X</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleCreateActivity}>
        <button>Create activity</button>
      </form>
    </React.Fragment>
  );
}

export default Activity;