const readlineSync = require('readline-sync');
const fs = require('fs');
// const { check } = require('prettier');
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
// //fs.readFile(`./topisc/${topics[topicNumber]}`
let rightAnswers = 0;
let wrongAnswers = 0;
for (let j = 0; j <= topics.length - 1; j++) {
  const topicNumber = readlineSync.keyInSelect(topics, 'Wich topic?');
  const checkTopic = new Topic(topicNumber);
  for (let i = 0; i <= checkTopic.questions.length - 1; i++) {
    const questionAsked = readlineSync.question(`${checkTopic.questions[i].question}\n`);
    if (questionAsked === checkTopic.questions[i].answer) {
      console.log('You are right');
      rightAnswers += 1;
    } else {
      console.log('wrong');
      wrongAnswers += 1;
    }
  }
  console.log(`You are done. Right Answers: ${rightAnswers}. Wrong answers: ${wrongAnswers}`);
}

// console.log(checkTopic);

// function getCards(topicNumber) {
//   const cards = fs.readFile(`./topisc/${topics[topicNumber]}`);
//   return cards;
// }

// console.log(checkTopic);
// class Model {
//   constructor() {

//   }
// }
// // comment
// module.exports = Model;
