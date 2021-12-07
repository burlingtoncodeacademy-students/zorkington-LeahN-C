const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

let descriptions = {
  beach:
    "\nYou are standing in the sand on a beach. You look around and the only thing you see is a door in front of you with a keypad on the handle. When you look more closely, you see that on the door is a handwritten sign. ",
  study:
    "\nYou press the numbers 1, 2, 3, 4, 5, and 6. \nYou hear a click, and the door opens... \n\nYou step into the room and see a bookshelf and a desk. ",
  livingRoom:
    "\nYou pick up the key from the bookshelf and use it to open the next door. \nAs you walk into the next room, you notice a TV and a coffee table. \nWhen you look at the coffee table, you see a TV remote. ",
  bedroom:
    "\nYou use the remote to press the buttons 'up', 'down', 'right', 'left', and the door swings open. \nYou walk into the room and see a bed with a bedside table. ",
};

//Call the function`
start();

//ASYNC FUNCTION to tell user about the scene and allow user to input text
async function start() {
  // -------------- welcome message ---------------
  const welcomeMessage = `\nYou are standing in the sand on a beach. You look around and the only thing you see is a door in front of you with a keypad on the handle. When you look more closely, you see that on the door is a handwritten sign. \nWhat would you like to do? `;
  //assigning "answer" to user's response to welcome message
  let answer = await ask(welcomeMessage);
  //assigning answer to answer to make a string
  answer = answer;
  if (answer.includes("read")) {
    console.log(descriptions[beach]);
  }
}
