const options = [
  {
    id: 1,
    value: "choose-priority",
    label: "Choose Priority",
  },
  {
    id: 2,
    value: "very-high",
    label: "Very High",
    color: "red",
  },
  {
    id: 3,
    value: "high",
    label: "High",
    color: "orange",
  },
  {
    id: 4,
    value: "normal",
    label: "Medium",
    color: "green",
  },
  {
    id: 5,
    value: "low",
    label: "Low",
    color: "blue",
  },
  {
    id: 6,
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
