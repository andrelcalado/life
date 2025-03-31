export const datetimeToDate = (datetime) => {
  const date = new Date(datetime);
  return date.toISOString().split('T')[0];
}

export const datetimeToString = (datetime) => {
  const date = new Date(datetime);
  return date.toLocaleDateString();
}