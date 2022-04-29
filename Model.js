const readlineSync = require('readline-sync');
const fs = require('fs');

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

  let rightAnswers = 0;
  let wrongAnswers = 0;
  for (let j = 0; j <= topics.length - 1; j += 1) {
    const topicNumber = readlineSync.keyInSelect(topics, 'Wich topic?');
    if (topicNumber === -1) { console.log('Ok,bye quitter 🪰'); return; }
    const checkTopic = new Topic(topicNumber);
    for (let i = 0; i <= checkTopic.questions.length - 1; i += 1) {
      const questionAsked = readlineSync.question(`${checkTopic.questions[i].question}\n`);
      if (questionAsked === checkTopic.questions[i].answer) {
        console.log('You are right');
        rightAnswers += 1;
      } else {
        console.log('wrong!! ' + `Right answer is ${checkTopic.questions[i].answer}`);
        wrongAnswers += 1;
      }
    }
    console.log(`You are done. Right Answers: ${rightAnswers}. Wrong answers: ${wrongAnswers}`);
    rightAnswers = 0;
    wrongAnswers = 0;
  }
}

module.exports = runCode;
