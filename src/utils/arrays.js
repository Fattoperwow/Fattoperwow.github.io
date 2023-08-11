export const sort = (array, dir, field) => {
  return array.sort((a, b) =>
    a[field] > b[field]
      ? dir === "asc"
        ? 1
        : -1
      : b[field] > a[field]
      ? dir === "asc"
        ? -1
        : 1
      : 0
  );
};
