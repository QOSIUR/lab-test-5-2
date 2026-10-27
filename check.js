const SITE_URL = 'site.html';
const LIBRARY_URL = 'https://pl.spb.ru/';
const WAR_URL = 'https://ru.wikipedia.org/wiki/Первая_мировая_война';

// Возвращает { error } или { url } — куда отправить пользователя
function resolveBirthDate(input, today) {
  const match = /^\s*(\d{1,2})\.(\d{1,2})\.(\d{4})\s*$/.exec(input);
  if (!match) {
    return { error: 'Введите дату цифрами в формате ДД.ММ.ГГГГ, например 31.12.2020' };
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  // setFullYear вместо new Date(y, m, d): тот превращает годы 0–99 в 1900–1999
  const date = new Date(0);
  date.setFullYear(year, month - 1, day);
  date.setHours(0, 0, 0, 0);
  // Несуществующие даты сдвигаются (31.02 -> 03.03), так ловим их
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return { error: 'Такой даты не существует' };
  }

  const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (date > now) {
    return { error: 'Дата рождения не может быть в будущем' };
  }

  if (year < 1900) {
    return { url: WAR_URL };
  }

  let age = now.getFullYear() - year;
  const hadBirthdayThisYear =
    now.getMonth() > month - 1 || (now.getMonth() === month - 1 && now.getDate() >= day);
  if (!hadBirthdayThisYear) {
    age--;
  }

  return { url: age >= 18 ? SITE_URL : LIBRARY_URL };
}

if (typeof module !== 'undefined') {
  module.exports = { resolveBirthDate, SITE_URL, LIBRARY_URL, WAR_URL };
}
