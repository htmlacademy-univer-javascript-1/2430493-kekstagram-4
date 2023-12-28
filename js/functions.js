const checkLengthStr = (str, maxlength) => str.length <= maxlength;

const isPalindrom = (str) => {
  str = str.toLowerCase().replaceAll(' ', '');
  const reversedStr = str.split('').reverse().join('');
  return str === reversedStr;
};

checkLengthStr('проверяемая строка', 18);
checkLengthStr('проверяемая строка', 10);
isPalindrom('Лёша на полке клопа нашёл ');
