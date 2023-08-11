export const percentage = (partialValue, totalValue) => {
  return parseFloat(((100 * partialValue) / totalValue).toFixed(2));
}