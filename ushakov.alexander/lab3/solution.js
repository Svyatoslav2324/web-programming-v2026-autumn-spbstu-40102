export function intersection(arr1, arr2) {
  const result = new Set();
  for (const item of arr1) {
    if (arr2.includes(item)) {
      result.add(item);
    }
  }
  return [...result];
}
