import { filters } from "../../constants";

const Sort = ({ setSortClick, setActiveDropdown }: any) => {
  return (
    <div className="flex justify-around">
      <div />
      <ul className="absolute right-44 rounded-xl hover:cursor-pointer  bg-gray-100 w-48">
        {filters?.map((filter) => (
          <li
            className="p-2 hover:bg-gray-200"
            key={filter.id}
            value={filter.value}
            onClick={() =>
              setActiveDropdown(filter.value) || setSortClick(false)
            }
          >
            {filter.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sort;
