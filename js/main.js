const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const USERS_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const USERS_NAME = [
  'Артём',
  'Никита',
  'Евгений',
  'Вероника',
  'Аня',
  'Матвей',
  'Алина'
];

const DESCRIPT_IMAGE = [
  'Происходит действие',
  'Отдых на пляже',
  'Сижу и кушаю',
  'Даже не знаю'
];

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createUsersComment = () => ({
  id: getRandomInteger(1, 1000),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(USERS_MESSAGE),
  nameUser: getRandomArrayElement(USERS_NAME),
});

const arrayRandomComments = Array.from({ length: getRandomInteger(0, 30) }, createUsersComment);

const createUsers = () => ({
  idUser: getRandomInteger(1, 25),
  url: `photos/${getRandomInteger(1, 25)}.jpg`,
  description: getRandomArrayElement(DESCRIPT_IMAGE),
  likes: getRandomInteger(15, 200),
  comments: arrayRandomComments
});

const GeneratedArrayUsers = Array.from({ length: 25 }, createUsers);

GeneratedArrayUsers.slice();
