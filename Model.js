const readlineSync = require('readline-sync');
const fs = require('fs');
const color = require('cli-color');

const topics = fs.readdirSync('./topics');

class Topic {
  constructor(topicNumber) {
    this.topicName = topics[topicNumber - 1];
    this.questions = getCards(topicNumber);
  }
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
  const topicNumber = readlineSync.keyInSelect(arrTop, color.blue('Выбери тему?'));
  const checkTopic = new Topic(topicNumber);
  for (let i = 0; i <= checkTopic.questions.length - 1; i += 1) {
    const questionAsked = readlineSync.question(color.yellow(`${checkTopic.questions[i].question}\n`));
    if (questionAsked === checkTopic.questions[i].answer) {
      console.log(color.green('Верно! :)'));
      rightAnswers += 1;
    } else {
      console.log(color.red('Неправильно :('));
      wrongAnswers += 1;
    }
  }
  console.log(color.blue('Ваши ответы: ') + color.green(`Правильные: ${rightAnswers}`) + color.red(` Неправильные: ${wrongAnswers}`));
  rightAnswers = 0;
  wrongAnswers = 0;
}

// console.log(checkTopic);
// class Model {
//   constructor() {

//   }
// }

// module.exports = Model;
