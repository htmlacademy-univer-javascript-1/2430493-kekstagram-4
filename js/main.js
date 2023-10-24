const URL = [];
const PHOTOS_ID = [];
const COMMENTS_ID = [];
const NUMBER_OF_POSTS = 25;
const MINIMUM_NUMBER_OF_COMMENTS = 1;
const MAXIMUM_NUMBER_OF_COMMENTS = 30;
const MINIMUM_NUMBER_OF_LIKES = 15;
const MAXIMUM_NUMBER_OF_LIKES = 200;

const TEXT_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Андрей',
  'Никита',
  'Александр',
  'Алина',
  'Вероника',
  'Татьяна'
];
const DESCRIPTIONS = [
  'Тут должна была быть ваша реклама.',
  'Настроение — сложная штука. То оно есть, а то его нет.',
  'Я просто выгляжу как лось, а в душе я бабочка.',
  'Вот так всегда: для кого-то балласт, а для кого-то сокровище.',
  'От твоего взгляда моё сердце дрожит, как пустой холодильник.'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getUniqNumberFromRange = (min, max, array) => {
  let currentValue = getRandomInteger(min, max);
  if (array.length >= (max - min + 1)) {
    return null;
  }
  while (array.includes(currentValue)) {
    currentValue = getRandomInteger(min, max);
  }
  array.push(currentValue);
  return currentValue;
};

const getComments = () => {
  const comments = [];
  const numberOfComments = getRandomInteger(MINIMUM_NUMBER_OF_COMMENTS, MAXIMUM_NUMBER_OF_COMMENTS);
  for (let i=0; i < numberOfComments; i++){
    comments.push({
      id: getUniqNumberFromRange(1, 100000, COMMENTS_ID),
      avatar:`img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: TEXT_MESSAGE[getRandomInteger(0, 5)],
      name: NAMES[getRandomInteger(0, 5)]
    });
  }
  return comments;
};

function getPost(){
  return {
    id: getUniqNumberFromRange(1, 25, PHOTOS_ID),
    url: `photos/${getUniqNumberFromRange(1, 25, URL)}.jpg`,
    description: DESCRIPTIONS[getRandomInteger(0, 4)],
    likes: getRandomInteger(MINIMUM_NUMBER_OF_LIKES, MAXIMUM_NUMBER_OF_LIKES),
    comments: getComments()
  };
}

const posts = Array.from({length: NUMBER_OF_POSTS}, getPost);
