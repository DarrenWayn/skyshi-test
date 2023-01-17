import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ActivityContext } from "../../contexts/activity";

function Activity() {
  const { activityList, handleCreateActivity, handleDeleteActivity } =
    useContext(ActivityContext);

  return (
    <React.Fragment>
      <h1>Activity</h1>
      <ul className="decks">
        {activityList.map((activity: any) => (
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
