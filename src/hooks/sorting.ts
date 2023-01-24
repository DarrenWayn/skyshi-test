import { Todos } from "../models/todos";

export default function useSortCards(cards: Todos[], activeDropdown: string) {
  const sortAlphabetAscending = (a: Todos, b: Todos) => {
    if (a.title > b.title) {
      return 1;
    } else if (a.title < b.title) {
      return -1;
    } else {
      return 0;
    }
  };

  const sortAlphabetDescending = (a: Todos, b: Todos) => {
    if (a.title < b.title) {
      return 1;
    } else if (a.title > b.title) {
      return -1;
    } else {
      return 0;
    }
  };

  let sortedItems = [...cards];

  switch (activeDropdown) {
    case "terbaru":
      sortedItems.sort((a: Todos, b: Todos) => b.id - a.id);
      break;
    case "terlama":
      sortedItems.sort((a: Todos, b: Todos) => a.id - b.id);
      break;
    case "ascending":
      sortedItems.sort(sortAlphabetAscending);
      break;
    case "descending":
      sortedItems.sort(sortAlphabetDescending);
      break;
    case "belum-selesai":
      sortedItems.sort((a: Todos, b: Todos) => b.is_active - a.is_active);
      break;
  }
  return sortedItems;
}
