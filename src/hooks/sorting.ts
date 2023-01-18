import { TTodos } from "../models/todos";

export default function useSortCards(cards: TTodos[], activeDropdown: string) {
  const sortAlphabetAscending = (a: TTodos, b: TTodos) => {
    if (a.title > b.title) {
      return 1;
    } else if (a.title < b.title) {
      return -1;
    } else {
      return 0;
    }
  };

  const sortAlphabetDescending = (a: TTodos, b: TTodos) => {
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
      sortedItems.sort((a: TTodos, b: TTodos) => b.id - a.id);
      break;
    case "terlama":
      sortedItems.sort((a: TTodos, b: TTodos) => a.id - b.id);
      break;
    case "ascending":
      sortedItems.sort(sortAlphabetAscending);
      break;
    case "descending":
      sortedItems.sort(sortAlphabetDescending);
      break;
    case "belum-selesai":
      sortedItems.sort((a: TTodos, b: TTodos) => b.is_active - a.is_active);
      break;
  }
  return sortedItems;
}
