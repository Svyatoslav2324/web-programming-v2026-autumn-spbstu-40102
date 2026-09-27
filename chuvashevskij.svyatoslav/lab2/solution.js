// Экспортируйте отсюда функцию с именем из контракта вашего варианта.
export function analyzeString(str) {
  let letters = 0;
  let digits = 0;
  let spaces = 0;
  let other = 0;

  for (const char of str) {
    if (/[a-zA-Zа-яА-ЯёЁ]/.test(char)) {
      letters++;
    } else if (/\d/.test(char)) {
      digits++;
    } else if (/\s/.test(char)) {
      spaces++;
    } else {
      other++;
    }
  }

  return {
    letters,
    digits,
    spaces,
    other,
  };
}
