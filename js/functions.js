const checkLengthStr = (str, maxlength) => str.length <= maxlength;

const palindrom = (str) => {
  str = str.toLowerCase().replaceAll(' ', '');
  const reversedStr = str.split('').reverse().join('');
  return str === reversedStr;
};

checkLengthStr('проверяемая строка', 18);
checkLengthStr('проверяемая строка', 10);
palindrom('Лёша на полке клопа нашёл ');
