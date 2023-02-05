import { filters } from "../../constants";

const Sort = ({ setSortClick, setActiveDropdown, activeDropdown }: any) => {
  return (
    <div data-cy="sort-parent" className="flex absolute justify-around">
      <ul className="absolute left-0 right-0 rounded-xl hover:cursor-pointer  bg-gray-100 w-48">
        {filters?.map((filter) => (
          <li
            className="p-2 hover:bg-gray-200"
            key={filter.id}
            value={filter.value}
            onClick={() =>
              setActiveDropdown(filter.value) || setSortClick(false)
            }
            data-cy={activeDropdown && "sort-selection-selected"}
          >
            <div data-cy="sort-selection">
              {" "}
              <span data-cy="sort-selection-title">{filter.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sort;
