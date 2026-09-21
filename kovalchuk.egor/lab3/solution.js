export function moveZerosToEnd(arr) {
  const result = [];
  let zerosCount = 0;

  for (const item of arr) {
    if (item === 0) {
      zerosCount += 1;
    } else {
      result.push(item);
    }
  }

  for (let i = 0; i < zerosCount; i += 1) {
    result.push(0);
  }

  return result;
}
