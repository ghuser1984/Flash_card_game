const fs = require('fs');
const readLineSync = require('readline-sync');

class Model {
  constructor() {
    this.topics = fs.readdirSync('./topics');
  }
}
const model = new Model();
const indexTopic = readLineSync.keyInSelect(model.topics);
console.log(model.topics[indexTopic]);

function Topic(index) {
  const topic = fs.readFileSync(`./topics/${index}`);
  console.log(topic.toString());
}
Topic(model.topics[indexTopic]);



module.exports = Model;
