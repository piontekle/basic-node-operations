const fs = require('fs');

function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];

  switch (command) {
    case "echo":
      commandLibrary.echo(userInputArray.slice(1).join(' '));
      break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1));
      break;
    case "tail":
      commandLibrary.tail(userInputArray.slice(1));
      break;
    case "reverse":
      commandLibrary.reverse(userInputArray.slice(1));
      break;
    default:
      done("Sorry, command not found");
  }
}

const commandLibrary = {
  "echo" : function(userInput) {
    done(userInput);
  },
  "cat" : function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      done(data);
    });
  },
  "head" : function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      var toPrint = data.toString().split('\n');
      //where n=10;
      done(toPrint.slice(0, 11).join('\n'));
    });
  },
  "tail" : function (fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      var toPrint = data.toString().split('\n');
      done(toPrint.slice(-10).join('\n'));
    });
  },
  "reverse" : (inputArray) => {
    const reversed = [];
    inputArray.forEach( word => {
      reversed.push(word.split('').reverse().join(''));
    })
    done(reversed.join(' '));
  }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
