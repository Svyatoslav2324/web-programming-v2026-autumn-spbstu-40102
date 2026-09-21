export function findMostFrequent(arr) {
  const frequency = {};
  let maxElement;
  let maxCount = 0;
  for (const item of arr) {
    frequency[item] = (frequency[item] || 0) + 1;
    if (frequency[item] > maxCount) {
      maxElement = item;
      maxCount = frequency[item];
    }
  }

  return maxElement;
}
