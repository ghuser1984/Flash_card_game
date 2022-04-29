// const fs = require('fs');
// const readlineSync = require('readline-sync');122

// const animals = ['Lion', 'Elephant', 'Crocodile', 'Giraffe', 'Hippo'];
// const index = readlineSync.keyInSelect(animals, 'Which animal?');

// console.log(`Ok, ${animals[index]} goes to your room.`);

// readlineSync.promptCLLoop({
//   add(target, into) {
//     console.log(`${target} is added into ${into}.`);
//     // Do something...
//   },
//   remove(target) {
//     console.log(`${target} is removed.`);
//     // Do something...
//   },
//   bye() { return true; },
// });
// console.log('Exited');

function randomAnswerRight() {
  const arr = ['Красота! Это правильный ответ', 'Е бой', 'ооо, повезло повезло...', 'Москва, метро Люблино, работаем!', 'Ты силён... Но не так силён, как семья.'];
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}
console.log(randomAnswerRight());

function randomAnswerWrong() {
  const arr = ['LOH!', 'LOH V KVADRATE!', 'Может не стоит продолжать?', 'Чел, ты...', 'Суета..'];
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}
console.log(randomAnswerWrong());

module.exports = randomAnswerRight, randomAnswerWrong;
