/* --------------------- Boiler Plate -------------------- */

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

/* -------------------------- Room Class Constructor -------------------------- */

class Room {
  constructor(name, description, inventory) {
    this.name = name;
    this.description = description;
    this.inventory = inventory;
    this.locked = false;
  }
}

/* ---------------------------- Room Descriptions ----------------------------- */

const study = new Room(
  "the study",
  "\nYou press the numbers 1, 2, 3, 4, 5, and 6. \nYou hear a click, and the door opens... \n\nYou step into a room and see a bookshelf. \nWhat would you like to do? \n",
  ["key"]
);
const livingRoom = new Room(
  "the living room",
  "\nYou use the key to open the door. As you walk into the next room, you notice a TV and a coffee table. \nWhen you look at the coffee table, you see a TV remote. \nWhat would you like to do? \n",
  ["remote"]
);
const bedroom = new Room(
  "the bedroom",
  "\nYou use the remote to press the buttons 'up', 'down', 'left', and 'right', and the door swings open. \nYou walk into the next room and see a bed with a bedside table. \nYou notice something on the bedside table. \nWhat would you like to do? \n",
  ["red button"]
);
const bathroom = new Room(
  "the bathroom",
  "\nWhen you press the red button, the next door slowly opens. \nYou walk in and find yourself in a bathroom. The toilet looks nasty, you have no interest in going over there. \nOn the mirror, you see something written... \nWhat would you like to do? \n",
  ["mirror"]
);
const diningRoom = new Room(
  "the dining room",
  "\nYou say the word 'Maple', and the next door opens. You run out of the bathroom, glad to be away from the smell. \nThe next room has a long dining table and pictures all over the walls. \nYou notice something glistening on one of the pictures. \nWhat would you like to do? \n",
  ["picture"]
);
const kitchen = new Room(
  "the kitchen",
  "\nAs you walk into the next room, you immediately notice light shining in from the many windows. \nYou look out the window and see the beach, where you first started. \nYou walk over to the sink and decide to fill a glass of water. You are very thirsty from walking around this house. \nAs you are drinking your water, you notice a lever next to the door. \nWhat would you like to do? \n",
  ["lever"]
);
const outside = new Room(
  "outside",
  "\nCONGRATULATIONS! You managed to unlock all of the doors and get back outside! \nNow you can chill on the beach for the rest of the day. ",
  []
);

outside.locked = true;

/* --------------------------- Item Class Constructor ------------------------- */

class Item {
  constructor(name, description, takeable) {
    this.name = name;
    this.description = description;
    this.takeable = takeable || false;
  }
}

/* ---------------------------- Item Descriptions ----------------------------- */

const bookshelf = new Item(
  "bookshelf",
  "\nYou walk over to the bookshelf and see an open book laying there. \nOn the page, there is a note that reads, 'Each door in this house is locked. You must find a way to unlock all of the doors in order to win the game. Good luck!' \nYou flip through the rest of the pages in the book, and a key falls out! \nWhat would you like to do? \n",
  false
);
const key = new Item(
  "key",
  "\nYou pick up the key. It looks like it will fit the next door. \nWhat would you like to do? \n",
  true
);
const remote = new Item(
  "remote",
  "\nYou pick up the remote and turn on the TV. \nThe TV comes on and there are four arrows on the screen-- up, down, left and right. You look down at the arrows on the remote. \nWhich arrows would you like to press? (Pay attention to the order). \n",
  true
);
const redButton = new Item(
  "red button",
  "\nWhen you look more closely, you see that there is a red button on the bedside table. \nWhat would you like to do? \n",
  false
);
const mirror = new Item(
  "mirror",
  "\nYou see some scratches on the mirror, and notice in the scratches is a message. \nThe message reads 'password Maple'. \nAs you look around the room, you hear a voice on a speaker. \nThe voice says, 'What is the secret password?' \nWhat would you like to answer? \n",
  true
);
const picture = new Item(
  "picture",
  "\nYou inspect the picture and notice a light reflecting off of the glass. \nYou follow the light with your eyes and find a diamond ring on the floor near the next door. \nYou pick up the diamond. It is very heavy. You decide to try it on, and as you slip it on your finger, the next door opens. \n",
  true
);
const lever = new Item(
  "lever",
  "\nYou pull the lever, and the door opens! \nYou walk in and find yourself back in the first room you entered. The door to the outside is still open. \n\nYou can now roam freely throughout the house by writing 'go to' and then the name of the room where you'd like to go. \nYou may also write 'go outside' to end the game. \n",
  true
);

/* ----------------------------- Location Changes ----------------------------- */

//Locations and where they can move
const locations = {
  study: { canMoveTo: ["the kitchen", "the living room", "outside"] },
  livingRoom: { canMoveTo: ["the study", "the bedroom"] },
  bedroom: { canMoveTo: ["the living room", "the bathroom"] },
  bathroom: { canMoveTo: ["the bedroom", "the dining room"] },
  diningRoom: { canMoveTo: ["the bathroom", "the kitchen"] },
  kitchen: { canMoveTo: ["the dining room", "the study"] },
  outside: { canMoveTo: ["the study"] },
};

/* ------------------------------- Lookup Tables ------------------------------ */

//Lookup table to reference rooms
let rooms = {
  "the study": study,
  "the living room": livingRoom,
  "the bedroom": bedroom,
  "the bathroom": bathroom,
  "the dining room": diningRoom,
  "the kitchen": kitchen,
  outside: outside,
};

//Lookup table to reference items
let items = {
  bookshelf: bookshelf,
  key: key,
  remote: remote,
  "red button": redButton,
  mirror: mirror,
  picture: picture,
  lever: lever,
};

//Lookup table to reference actions
let actions = {
  take: ["take", "pick up", "grab", "get"],
  examine: [
    "examine",
    "look at",
    "view",
    "inspect",
    "read",
    "touch",
    "use",
    "push",
    "pull",
    "press",
    "type",
    "open",
    "unlock",
  ],
  move: ["go to", "go", "move", "move to", "walk", "enter"],
};



/* ---------------------------- Functions for Actions ------------------------- */

//function canTake() {
//  if (Item[this.takeable] === true) {
//    console.log("You now have " + this.name + " in your inventory. ");
//  } else {
//    console.log("You cannot take that. ");
//  }
//}

//Function for adding to inventory
//function pickUp(thisItem) {
//    let canHave = items[thisItem];
//    if (!canHave) {
//      console.log("You cannot take that. ");
//    } else if (
//      canHave.includes.takeable === true &&
//      player.location.inventory.includes(thisItem)
//    ) {
//      player.inventory.push(thisItem);
//      console.log("You pick up " + thisItem + ". ");
//    } else {
//      console.log("That is selfish, you cannot take that. ");
//    }
//  }
//
//  pickUp(key)