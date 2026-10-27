// Тест-кейсы поля «Дата рождения». Сегодня в тестах всегда 27.10.2026,
// чтобы граничные значения возраста (ровно 18 лет) не «уплывали».
const TODAY = new Date(2026, 9, 27);

const ERR_FORMAT = 'Введите дату цифрами в формате ДД.ММ.ГГГГ, например 31.12.2020';
const ERR_NO_DATE = 'Такой даты не существует';
const ERR_FUTURE = 'Дата рождения не может быть в будущем';

const SITE = { url: 'site.html' };
const LIBRARY = { url: 'https://pl.spb.ru/' };
const WAR = { url: 'https://ru.wikipedia.org/wiki/Первая_мировая_война' };

const classes = [
  { id: 'К1', name: 'Дата цифрами через точку: Д(Д).М(М).ГГГГ', type: 'Валидный' },
  { id: 'К2', name: 'Пустое значение', type: 'Невалидный' },
  { id: 'К3', name: 'Буквы в значении', type: 'Невалидный' },
  { id: 'К4', name: 'Разделитель не точка или его нет', type: 'Невалидный' },
  { id: 'К5', name: 'Неверное количество цифр в дне, месяце или годе', type: 'Невалидный' },
  { id: 'К6', name: 'Неверный порядок частей даты', type: 'Невалидный' },
  { id: 'К7', name: 'Спецсимволы, знаки, попытки инъекций', type: 'Невалидный' },
  { id: 'К8', name: 'Несуществующая календарная дата', type: 'Невалидный' },
  { id: 'К9', name: 'Год рождения < 1900', type: 'Валидный' },
  { id: 'К10', name: 'Возраст ≥ 18 лет (01.01.1900 – 27.10.2008)', type: 'Валидный' },
  { id: 'К11', name: 'Возраст < 18 лет (28.10.2008 – 27.10.2026)', type: 'Валидный' },
  { id: 'К12', name: 'Дата в будущем (> 27.10.2026)', type: 'Невалидный' },
];

// kind: «Класс» — представитель класса, «Граница» — граничное значение
const cases = [
  { cls: 'К1', kind: 'Класс', input: '15.05.1990', expected: SITE, note: 'Формат ДД.ММ.ГГГГ' },
  { cls: 'К1', kind: 'Класс', input: '1.1.2000', expected: SITE, note: 'День и месяц одной цифрой' },
  { cls: 'К1', kind: 'Класс', input: '01.1.2000', expected: SITE, note: 'Смешанный формат' },
  { cls: 'К1', kind: 'Класс', input: '  15.05.1990  ', expected: SITE, note: 'Пробелы по краям обрезаются' },
  { cls: 'К1', kind: 'Класс', input: '31.12.2020', expected: LIBRARY, note: 'Значение из плейсхолдера' },

  { cls: 'К2', kind: 'Класс', input: '', expected: { error: ERR_FORMAT }, note: 'Пустое поле' },
  { cls: 'К2', kind: 'Класс', input: '     ', expected: { error: ERR_FORMAT }, note: 'Только пробелы' },

  { cls: 'К3', kind: 'Класс', input: 'abc', expected: { error: ERR_FORMAT }, note: 'Латиница' },
  { cls: 'К3', kind: 'Класс', input: '15 мая 1990', expected: { error: ERR_FORMAT }, note: 'Месяц словом' },
  { cls: 'К3', kind: 'Класс', input: '15.05.1990г', expected: { error: ERR_FORMAT }, note: 'Буква после даты' },
  { cls: 'К3', kind: 'Класс', input: 'O1.O1.2OOO', expected: { error: ERR_FORMAT }, note: 'Буква O вместо нуля' },

  { cls: 'К4', kind: 'Класс', input: '15/05/1990', expected: { error: ERR_FORMAT }, note: 'Слэш' },
  { cls: 'К4', kind: 'Класс', input: '15-05-1990', expected: { error: ERR_FORMAT }, note: 'Дефис' },
  { cls: 'К4', kind: 'Класс', input: '15,05,1990', expected: { error: ERR_FORMAT }, note: 'Запятая' },
  { cls: 'К4', kind: 'Класс', input: '15 05 1990', expected: { error: ERR_FORMAT }, note: 'Пробел' },
  { cls: 'К4', kind: 'Класс', input: '15051990', expected: { error: ERR_FORMAT }, note: 'Без разделителя' },
  { cls: 'К4', kind: 'Класс', input: '15..05.1990', expected: { error: ERR_FORMAT }, note: 'Двойная точка' },

  { cls: 'К5', kind: 'Граница', input: '001.01.2000', expected: { error: ERR_FORMAT }, note: 'В дне 3 цифры' },
  { cls: 'К5', kind: 'Граница', input: '01.001.2000', expected: { error: ERR_FORMAT }, note: 'В месяце 3 цифры' },
  { cls: 'К5', kind: 'Граница', input: '01.01.200', expected: { error: ERR_FORMAT }, note: 'В годе 3 цифры' },
  { cls: 'К5', kind: 'Граница', input: '01.01.20000', expected: { error: ERR_FORMAT }, note: 'В годе 5 цифр' },
  { cls: 'К5', kind: 'Класс', input: '01.01.90', expected: { error: ERR_FORMAT }, note: 'Год двумя цифрами' },

  { cls: 'К6', kind: 'Класс', input: '1990.05.15', expected: { error: ERR_FORMAT }, note: 'ГГГГ.ММ.ДД' },

  { cls: 'К7', kind: 'Класс', input: '-1.01.2000', expected: { error: ERR_FORMAT }, note: 'Отрицательный день' },
  { cls: 'К7', kind: 'Класс', input: '+1.01.2000', expected: { error: ERR_FORMAT }, note: 'Знак плюс' },
  { cls: 'К7', kind: 'Класс', input: '<script>alert(1)</script>', expected: { error: ERR_FORMAT }, note: 'XSS' },
  { cls: 'К7', kind: 'Класс', input: "' OR 1=1 --", expected: { error: ERR_FORMAT }, note: 'SQL-инъекция' },
  { cls: 'К7', kind: 'Класс', input: '1'.repeat(1000), expected: { error: ERR_FORMAT }, note: 'Очень длинная строка (1000 символов)' },

  { cls: 'К8', kind: 'Граница', input: '00.01.2000', expected: { error: ERR_NO_DATE }, note: 'День 0' },
  { cls: 'К8', kind: 'Граница', input: '01.01.2000', expected: SITE, note: 'День 1 (мин.)' },
  { cls: 'К8', kind: 'Граница', input: '31.01.2000', expected: SITE, note: 'День 31 (макс.)' },
  { cls: 'К8', kind: 'Граница', input: '32.01.2000', expected: { error: ERR_NO_DATE }, note: 'День 32' },
  { cls: 'К8', kind: 'Граница', input: '15.00.2000', expected: { error: ERR_NO_DATE }, note: 'Месяц 0' },
  { cls: 'К8', kind: 'Граница', input: '15.12.2000', expected: SITE, note: 'Месяц 12 (макс.)' },
  { cls: 'К8', kind: 'Граница', input: '15.13.2000', expected: { error: ERR_NO_DATE }, note: 'Месяц 13' },
  { cls: 'К8', kind: 'Граница', input: '30.04.2000', expected: SITE, note: 'Последний день апреля' },
  { cls: 'К8', kind: 'Граница', input: '31.04.2000', expected: { error: ERR_NO_DATE }, note: 'В апреле 30 дней' },
  { cls: 'К8', kind: 'Граница', input: '28.02.2007', expected: SITE, note: 'Последний день февраля, невисокосный год' },
  { cls: 'К8', kind: 'Граница', input: '29.02.2007', expected: { error: ERR_NO_DATE }, note: '29 февраля, невисокосный год' },
  { cls: 'К8', kind: 'Граница', input: '29.02.2008', expected: SITE, note: '29 февраля, високосный год' },
  { cls: 'К8', kind: 'Граница', input: '30.02.2008', expected: { error: ERR_NO_DATE }, note: '30 февраля, високосный год' },
  { cls: 'К8', kind: 'Граница', input: '29.02.1900', expected: { error: ERR_NO_DATE }, note: '1900 — не високосный (кратен 100)' },
  { cls: 'К8', kind: 'Граница', input: '29.02.2000', expected: SITE, note: '2000 — високосный (кратен 400)' },

  { cls: 'К9', kind: 'Класс', input: '15.06.1850', expected: WAR, note: 'Середина класса' },
  { cls: 'К9', kind: 'Класс', input: '01.01.0050', expected: WAR, note: 'Год из двух значащих цифр' },
  { cls: 'К9', kind: 'Граница', input: '31.12.1899', expected: WAR, note: 'Последний день до 1900' },

  { cls: 'К10', kind: 'Граница', input: '01.01.1900', expected: SITE, note: 'Первый день 1900 года' },
  { cls: 'К10', kind: 'Класс', input: '10.03.1975', expected: SITE, note: 'Середина класса' },
  { cls: 'К10', kind: 'Граница', input: '26.10.2008', expected: SITE, note: '18 лет и 1 день' },
  { cls: 'К10', kind: 'Граница', input: '27.10.2008', expected: SITE, note: 'Ровно 18 лет сегодня' },

  { cls: 'К11', kind: 'Граница', input: '28.10.2008', expected: LIBRARY, note: '18 лет исполнится завтра' },
  { cls: 'К11', kind: 'Класс', input: '01.06.2015', expected: LIBRARY, note: 'Середина класса' },
  { cls: 'К11', kind: 'Граница', input: '27.10.2026', expected: LIBRARY, note: 'Родился сегодня' },

  { cls: 'К12', kind: 'Граница', input: '28.10.2026', expected: { error: ERR_FUTURE }, note: 'Завтра' },
  { cls: 'К12', kind: 'Класс', input: '01.01.2100', expected: { error: ERR_FUTURE }, note: 'Далёкое будущее' },
];

function describeResult(result) {
  if (result.error) return `Ошибка: «${result.error}»`;
  if (result.url === SITE.url) return 'Открывается сайт (site.html)';
  if (result.url === LIBRARY.url) return 'Переход на сайт библиотеки Маяковского';
  if (result.url === WAR.url) return 'Переход на статью Википедии о Первой мировой войне';
  return `Переход на ${result.url}`;
}

module.exports = { TODAY, classes, cases, describeResult };
