function checkLengthStr(str, maxlength) {
  return str.length <= maxlength;
}

function palindrom(str) {
  str= str.toLowerCase().replaceAll(' ', '');
  const reversedStr = str.split('').reverse().join('');
  return(str === reversedStr);
}

console.log(checkLengthStr('Привет', 6));
console.log(checkLengthStr('проверяемая строка', 18));
console.log(checkLengthStr('проверяемая строка', 10));

console.log(palindrom('Лёша на полке клопа нашёл '));
