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

//class Room

//Locations and where they can move
let locations = {
  beach: { canMoveTo: ["study"] },
  study: { canMoveTo: ["beach", "kitchen", "livingRoom"] },
  livingRoom: { canMoveTo: ["study", "bedroom"] },
  bedroom: { canMoveTo: ["livingRoom", "bathroom"] },
};

//Descriptions of each of the locations
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

//Where we are now
let currentLocation = "beach";

//Function to move from one state to another
async function moveLocation(newLocation) {
  console.log(descriptions[currentLocation])
  let answer = await ask("What would you like to do? ");
  let locationAnswer = await ask("You are at " + currentLocation + ". Where would you like to go? ")
  let validMoves = locations[currentLocation].canMoveTo;
  if (validMoves.includes(newLocation)) {
    console.log("Moving from " + currentLocation + " to " + newLocation + ". ");
    console.log(descriptions[newLocation]);
    currentLocation = newLocation;
    moveLocation();
  } else {
    console.log(
      "You cannot move directly from " +
        currentLocation +
        " to " +
        newLocation +
        ". Please try again. "
    );
    moveLocation();
  }
}

moveLocation();
