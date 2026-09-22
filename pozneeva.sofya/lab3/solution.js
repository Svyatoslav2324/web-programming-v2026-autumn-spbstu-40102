export function findEquilibriumIndex(arr) {
  let sum = 0;

  for (const number of arr) {
    sum += number;
  }
  let leftSum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum -= arr[i];

    if (leftSum === sum) {
      return i;
    }

    leftSum += arr[i];
  }
  if (sum === 0) {
    return -1;
  }
}
