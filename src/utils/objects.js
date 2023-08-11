// Transform an object into an array
export const toArray = (object) => {
  if (!object || Object.keys(object).length === 0) {
    return []
  } else {
    return Object.values(object);
  }
}