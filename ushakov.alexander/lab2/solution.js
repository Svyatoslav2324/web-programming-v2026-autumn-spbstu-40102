export function isPerfectNumber(num) {
  if (num <= 1) {
    return false;
  }
  let divisorsSum = 1;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      divisorsSum += i;
      if (i !== num / i) {
        divisorsSum += num / i;
      }
    }
  }
  return divisorsSum === num;
}
