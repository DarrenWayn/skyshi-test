const options = [
  /* { */
  /*   id: 1, */
  /*   value: "choose-priority", */
  /*   label: "Choose Priority", */
  /* }, */
  {
    id: 1,
    value: "very-high",
    label: "Very High",
    color: "red",
  },
  {
    id: 2,
    value: "high",
    label: "High",
    color: "orange",
  },
  {
    id: 3,
    value: "normal",
    label: "Medium",
    color: "green",
  },
  {
    id: 4,
    value: "low",
    label: "Low",
    color: "blue",
  },
  {
    id: 5,
    value: "very-low",
    label: "Very Low",
    color: "purple",
  },
];

const filters = [
  { value: "terbaru", label: "Terbaru", id: 1 },
  { value: "terlama", label: "Terlama", id: 2 },
  { value: "ascending", label: "A-Z", id: 3 },
  { value: "descending", label: "Z-A", id: 4 },
  { value: "belum-selesai", label: "Belum Selesai", id: 5 },
];

export { options, filters };
