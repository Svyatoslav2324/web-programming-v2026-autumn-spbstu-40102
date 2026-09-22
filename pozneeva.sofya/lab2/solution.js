export function isIsogram(str) {
  str = str.toLowerCase().replaceAll('-', '');
  const set = new Set();
  for (const lit of str) {
    if (set.has(lit)) {
      return false;
    }
    set.add(lit);
  }
  return true;
}
