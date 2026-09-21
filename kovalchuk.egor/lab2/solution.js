function pluralize(value, forms) {
  const absValue = Math.abs(value);
  const mod10 = absValue % 10;
  const mod100 = absValue % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return forms[0];
  }
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return forms[1];
  }
  return forms[2];
}

const UNITS = [
  {seconds: 60, forms: ['секунда', 'секунды', 'секунд']},
  {seconds: 3600, divisor: 60, forms: ['минута', 'минуты', 'минут']},
  {seconds: 86400, divisor: 3600, forms: ['час', 'часа', 'часов']},
  {seconds: 2592000, divisor: 86400, forms: ['день', 'дня', 'дней']},
  {seconds: 31536000, divisor: 2592000, forms: ['месяц', 'месяца', 'месяцев']},
  {seconds: Infinity, divisor: 31536000, forms: ['год', 'года', 'лет']},
];

export function timeAgo(date, now = new Date()) {
  const target = date instanceof Date ? date : new Date(date);
  const reference = now instanceof Date ? now : new Date(now);

  if (Number.isNaN(target.getTime())) {
    throw new TypeError('timeAgo: некорректная дата');
  }

  const diffMs = reference.getTime() - target.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);

  if (diffSeconds < 5) {
    return 'только что';
  }

  if (diffMs < 0) {
    return 'только что';
  }

  if (diffSeconds < UNITS[0].seconds) {
    return `${diffSeconds} ${pluralize(diffSeconds, UNITS[0].forms)} назад`;
  }

  for (let i = 1; i < UNITS.length; i += 1) {
    const unit = UNITS[i];
    if (diffSeconds < unit.seconds) {
      const value = Math.floor(diffSeconds / unit.divisor);
      return `${value} ${pluralize(value, unit.forms)} назад`;
    }
  }

  const lastUnit = UNITS[UNITS.length - 1];
  const value = Math.floor(diffSeconds / lastUnit.divisor);
  return `${value} ${pluralize(value, lastUnit.forms)} назад`;
}
