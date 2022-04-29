const readlineSync = require('readline-sync');
const fs = require('fs');
const color = require('cli-color');
// const randomAnswerRight = require('./test.js');
// const randomAnswerWrong = require('./test.js');

const topics = fs.readdirSync('./topics');

function runCode() {
  const topics = fs.readdirSync('./topics');

  class Topic {
    constructor(topicNumber) {
      this.topicName = topics[topicNumber - 1];
      this.questions = getCards(topicNumber);
    }
  }

  function getPrettyName(text) {
    return text.replace('.txt', '').split('_').join(' ');
  }

  function getCards(topicNumber) {
    let questions1 = fs.readFileSync(`./topics/${topics[topicNumber]}`, 'utf-8');
    questions1 = questions1.split('\n\n').map((a) => a.split('\n')).map((a) => a.filter((el) => el)).map((arr) => toObj(arr));
    return questions1;
  }
  function toObj(arr) {
    const [question, answer] = arr;
    return {
      question,
      answer,
    };
  }
  const arrTop = [];
  for (let i = 0; i < topics.length; i++) {
    arrTop.push(topics[i].slice(0, -4));
  }
  let rightAnswers = 0;
  let wrongAnswers = 0;
  for (let j = 0; j <= topics.length - 1; j += 1) {
    const topicNumber = readlineSync.keyInSelect(arrTop, color.blue('Выбери тему:'));
    if (topicNumber === -1) { console.log('Ok,bye quitter 🪰'); return; }
    const checkTopic = new Topic(topicNumber);
    for (let i = 0; i <= checkTopic.questions.length - 1; i += 1) {
      const questionAsked = readlineSync.question(color.yellow(`${checkTopic.questions[i].question}\n`));
      if (questionAsked === checkTopic.questions[i].answer) {
        console.log(color.green(`${randomAnswerRight()}\n`));
        rightAnswers += 1;
      } else {
        console.log(color.red(`${randomAnswerWrong()}; \nПравильный ответ: ${checkTopic.questions[i].answer}\n`));
        wrongAnswers += 1;
      }
    }
    console.log(color.blue('Ну, ты закончил. Молодец, наверное ') + color.green(`Правильно: ${rightAnswers}`) + color.red(` Неправильно: ${wrongAnswers}`));
    // console.log(color.`Ну, ты закончил. Правильных ответов: ${rightAnswers}. Неправильных ответов: ${wrongAnswers}`);
    rightAnswers = 0;
    wrongAnswers = 0;
  }
}

module.exports = runCode;
function randomAnswerRight() {
  const arr = ['Красота! Это правильный ответ', 'Е бой', 'ооо, повезло повезло...', 'Москва, метро Люблино, работаем!', 'Ты силён... Но не так силён, как семья.'];
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}
// console.log(randomAnswerRight());

function randomAnswerWrong() {
  const arr = ['LOH!', 'LOH V KVADRATE!', 'Может не стоит продолжать?', 'Чел, ты...', 'Суета..'];
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}
