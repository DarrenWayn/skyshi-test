import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import createActivity from "../../api/activity/createActivity";
import deleteActivity from "../../api/activity/deleteActivity";
import getActivityList from "../../api/activity/getActivityList";
import dayjs from "dayjs";
import { TActivity } from "../../models/activity";
import Header from "../header";
import { ModalContext } from "../../contexts/modal";
import ModalDelete from "../modal/modaldelete";
import useClickOutside from "../../hooks/clickOutside";
import emptyItem from "../../assets/images/empty-item.png";

function Activity() {
  const [activityList, setActivityList] = useState<TActivity[]>([]);
  const [modalText, setModalText] = useState("Activity berhasil dihapus");
  const [modalType, setModalType] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  );
  const [selectedTitle, setSelectedTitle] = useState<string | undefined>(
    undefined
  );
  const ref = useRef<HTMLDivElement>(null);
  const { isModalOpen, handleOpenModal, handleCloseModal } =
    useContext(ModalContext);

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
    handleCloseModal();
    setModalText("Activity berhasil dihapus");
  };

  const handleClickOutside = useCallback(() => {
    handleCloseModal();
  }, [activityList]);

  useClickOutside({ ref, callback: handleClickOutside });

  useEffect(() => {
    (async () => {
      const getLists = await getActivityList();
      setActivityList(getLists.data);
    })();
  }, []);

  return (
    <React.Fragment>
      <Header />
      <div className="flex justify-around mx-[12%] items-baseline" ref={ref}>
        <h1 className="text-xl font-bold" data-cy="activity-title">
          Activity
        </h1>
        <form onSubmit={handleCreateActivity}>
          <button
            className="bg-blue-400 rounded-full p-2 px-4 text-white text-sm"
            data-cy="activity-add-button"
          >
            + Tambah
          </button>
        </form>
        <div data-cy="modal-information" className="absolute w-full top-28">
          {isModalOpen && modalType === "delete" && (
            <ModalDelete
              data-cy="modal-delete"
              text={modalText}
              handleDeleteActivity={handleDeleteActivity}
              selectedIndex={selectedIndex}
              selectedTitle={selectedTitle}
              handleClose={handleCloseModal}
              activity={true}
            />
          )}
        </div>
      </div>
      <ul className="grid grid-cols-activity xss:grid-row xss:w-[80%] gap-4 w-[50%]  my-0 mx-auto mb-5">
        {activityList?.length < 1 && (
          <div className="cursor-pointer" data-cy="activity-empty-state">
            <img src={emptyItem} alt="empty" onClick={handleCreateActivity} />
          </div>
        )}

        {activityList.map((activity: any) => (
          <li
            key={activity.id}
            className="rounded-xl border border-gray-50 shadow-md shadow-gray-400 px-5 pt-4"
            data-cy="activity-item"
          >
            <Link
              to={`detail/${activity.id}`}
              className="flex flex-row text-black pb-[6rem] font-bold"
              data-cy="activity-title"
            >
              {activity?.title}
            </Link>
            <div className="flex justify-between pb-3">
              <span className="text-gray-400" data-cy="activity-item-date">
                {dayjs(activity?.created_at)
                  .locale("id")
                  .format("DD MMMM YYYY")}
              </span>
              <button
                onClick={() => {
                  handleOpenModal();
                  setModalType("delete");
                  setSelectedIndex(activity.id);
                  setSelectedTitle(activity.title);
                }}
                data-cy="activity-item-delete-button"
              >
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
