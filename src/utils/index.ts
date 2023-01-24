const ProperDate = (transformThis: string) => {
  let dateString = transformThis;
  let date = new Date(dateString);
  let formattedDate = date.toLocaleTimeString("id-ID");
  return formattedDate;
};

export default ProperDate;
