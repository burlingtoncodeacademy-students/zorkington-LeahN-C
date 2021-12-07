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

/* ------------------------ Room Class Constructor ------------------------ */

//Room class
class Room {
  constructor(name, description, inventory, canMoveTo) {
    this.name = name;
    this.description = description;
    this.inventory = inventory;
    this.canMoveTo = canMoveTo;
    this.locked = false;
  }

  go() {
    if (this.locked) {
      return "The door is locked. ";
    } else {
      return this.description;
    }
  }

  move() {
    if (this.canMoveTo) {
      return "You move from " + currentLocation + "to " + this.canMoveTo + ". ";
    } else {
      return (
        "You cannot move directly from " +
        currentLocation +
        " to " +
        answer +
        ". "
      );
    }
  }
}

//Rooms
const study = new Room(
  "Study",
  "\nYou press the numbers 1, 2, 3, 4, 5, and 6. \nYou hear a click, and the door opens... \n\nYou step into a room and see a bookshelf. ",
  ["key"],
  ["Beach", "Living Room", "Kitchen", "Outside"]
);
const livingRoom = new Room(
  "Living room",
  "\nYou use the key to open the door. As you walk into the next room, you notice a TV and a coffee table. \nWhen you look at the coffee table, you see a TV remote. ",
  ["remote"],
  ["Study", "Bedroom"]
);
const bedroom = new Room(
  "Bedroom",
  "\nYou use the remote to press the buttons 'up', 'down', 'left', and 'right', and the door swings open. \nYou walk into the next room and see a bed with a bedside table. \nYou notice something on the bedside table. ",
  [],
  ["Living Room", "Bathroom"]
);
const bathroom = new Room(
  "Bathroom",
  "\nWhen you press the red button, the next door slowly opens. \nYou walk in and find yourself in a bathroom. The toilet looks nasty, you have no interest in going over there. \nOn the mirror, you see something written... ",
  [],
  ["Bedroom", "Dining Room"]
);
const diningRoom = new Room(
  "Dining room",
  "\nYou say the word 'Maple', and the next door opens. You run out of the bathroom, glad to be away from the smell. \nThe next room has a long dining table and pictures all over the walls. \nYou notice something glistening on one of the pictures. ",
  [],
  ["Bathroom", "Kitchen"]
);
const kitchen = new Room(
  "Kitchen",
  "\nAs you walk into the next room, you immediately notice light shining in from the many windows. \nYou look out the window and see the beach, where you first started. \nYou walk over to the sink and decide to fill a glass of water. You are very thirsty from walking around this house. \nAs you are drinking your water, you notice a lever next to the door. ",
  [],
  ["Dining Room", "Study"]
);
const outside = new Room(
  "Outside",
  "\nCONGRATULATIONS! You managed to unlock all of the doors and get back outside! \nNow you can chill on the beach for the rest of the day. ",
  [],
  []
);

/* ------------------------- Item Class Constructor ---------------------- */

//Item class
class Item {
  constructor(name, description, takeable, action) {
    this.name = name;
    this.description = description;
    this.takeable = takeable || false;
    this.action = action || "nothing happens";
  }

  take() {
    if (this.takeable) {
      inventory.push(this.name);
      return `You picked up ${this.name}. `;
    } else {
      return "You can't take that. ";
    }
  }

  useBookshelf() {
    if (this.name.includes("bookshelf") && player.location === "the study") {
      return bookshelf;
    } else {
      return cannotDo;
    }
  }

  useBedsideTable() {
    if (
      this.name.includes("bedside table") &&
      player.location === "the bedroom"
    ) {
      return bedsideTable;
    } else {
      return cannotDo;
    }
  }

  useMirror() {
    if (this.name.includes("mirror") && player.location === "the bathroom") {
      return mirror;
    } else {
      return cannotDo;
    }
  }

  usePicture() {
    if (
      this.name.includes("picture") &&
      player.location === "the dining room"
    ) {
      return picture;
    } else {
      return cannotDo;
    }
  }

  useLever() {
    if (this.name.includes("lever") && player.location === "the kitchen") {
      return lever;
    } else {
      return cannotDo;
    }
  }

  examine() {
    if (player.location.includes(this.name)) {
      return this.description;
    } else {
      return "There is nothing to see here. ";
    }
  }
}

//Items
//const sign = new Item(
//  "Sign",
//  "\nThe sign reads... \n'Through this door are truths and lies. \nWhich will you choose? Which will be your demise? \nIf you dare to enter now, your choice will be your final vow... \nThe code, one two three four five six, will give you access but may be a trick... \nEnter at your own risk.' \nYou look down at the keypad on the door handle... \n\nWhich numbers would you like to enter? "
//);
const bookshelf = new Item(
  "Bookshelf",
  "\nYou walk over to the bookshelf and see an open book laying there. \nOn the page, there is a note that reads, 'Each door in this house is locked. You must find a way to unlock all of the doors in order to win the game. Good luck!' \nYou flip through the rest of the pages in the book, and a key falls out! ",
  false,
  ["examine"]
);
const key = new Item("Key", "\nYou pick up the key. ", true, ["take"]);
const remote = new Item(
  "Remote",
  "\nYou pick up the remote and turn on the TV. \nThe TV comes on and there are four arrows on the screen-- up, down, left and right. You look down at the arrows on the remote. ",
  true,
  ["take"]
);
const bedsideTable = new Item(
  "Bedside Table",
  "\nWhen you look more closely, you see that there is a red button on the bedside table. ",
  false,
  ["examine"]
);
const mirror = new Item(
  "Mirror",
  "\nYou see some scratches on the mirror, and notice in the scratches is a message. \nThe message reads 'password Maple'. \nAs you look around the room, you hear a voice on a speaker. \nThe voice says, 'What is the secret password?' ",
  false,
  ["examine"]
);
const picture = new Item(
  "Picture",
  "\nYou inspect the picture and notice a light reflecting off of the glass. \nYou follow the light with your eyes and find a diamond ring on the floor near the next door. \nYou pick up the diamond. It is very heavy. You decide to try it on, and as you slip it on your finger, the next door opens. ",
  false,
  ["examine"]
);
const lever = new Item(
  "Lever",
  "\nYou pull the lever, and the door opens! \nYou walk in and find yourself back in the first room you entered. The door to the outside is still open. \n\nYou can now roam freely throughout the house by writing 'go to' and then the name of the room where you'd like to go. \nYou may also write 'go outside' to end the game. ",
  false,
  ["use"]
);

/* ------------------------------ Lookup Tables --------------------------- */

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
  "bedside table": bedsideTable,
  mirror: mirror,
  picture: picture,
  lever: lever,
};

//Lookup table to reference actions
let actions = {
  take: ["take", "pick up", "grab", "get"],
  use: ["use", "push", "pull", "press", "type"],
  go: ["enter", "open", "unlock"],
  move: ["go to", "go", "move", "move to", "walk"],
  examine: ["examine", "look at", "inspect", "read", "touch"],
};

/* ------------------------------ Player Info ------------------------------- */

//Player as an object
let player = {
  inventory: [],
  location: null,
};

/* --------------------------- Location Changes ----------------------------- */

//Locations and where they can move
const locations = {
  study: { canMoveTo: ["the kitchen", "the the living room", "outside"] },
  livingRoom: { canMoveTo: ["the study", "the bedroom"] },
  bedroom: { canMoveTo: ["the living room", "the bathroom"] },
  bathroom: { canMoveTo: ["the bedroom", "the dining room"] },
  diningRoom: { canMoveTo: ["the bathroom", "the kitchen"] },
  kitchen: { canMoveTo: ["the dining room", "the study"] },
  outside: { canMoveTo: ["the study"] },
};

/* --------------------------- Other Assignments ---------------------------- */

//Starting with empty string inventory
let inventory = [];

//Place where user starts
let currentLocation = locations[outside];

let doWhat = "What would you like to do? ";

let cannotDo = "\nI do not know how to ";

let cannotTake = "\nThat's selfish. You cannot take ";

/* ---------------------------- Functions for Actions ------------------------- */

//function take(thisItem) {
//  let canHave = items[thisItem];
//  if (!canHave) {
//    console.log("There is not " + answer + " to take . ")
//  } else if (canHave.takeable === true && player.location.inventory.includes(thisItem)) {
//    console.log("You now have " + thisItem + ". ")
//  } else {
//    console.log("You cannot take " + answer + ". ")
//  }
//}
//
//function use(thisThing) {
//  let canUse = items[thisThing];
//  if (!canUse) {
//    console.log("It is not possible to " + answer + ". ")
//  } else if (canUse.)
//}
//
//go
//
//move
//
//examine

/* ------------------------- Function for Changing Rooms ---------------------- */

//function enterRoom(newRoom)

/* ----------------------------- Async Functions ------------------------------ */

intro();

//Intro function to start the game
async function intro() {
  const introMessage =
    "\nYou are standing in the sand on a beach. You look around and the only thing you see is a door in front of you with a keypad on the handle. \nWhen you look more closely, you see that on the door is a handwritten sign. \nWhat would you like to do? ";
  let answer = await ask(introMessage);
  if (answer.includes("read")) {
      start();
    } else if (answer.includes("take")) {
      console.log(cannotTake + answer + ". ");
      intro();
    } else {
      console.log(cannotDo + answer + ". ");
      intro();
    }
  }

  async function start() {
    const sign =
      "\nThe sign reads... \n'Through this door are truths and lies. \nWhich will you choose? Which will be your demise? \nIf you dare to enter now, your choice will be your final vow... \nThe code, one two three four five six, will give you access but may be a trick... \nEnter at your own risk.' \nYou look down at the keypad on the door handle... \n\nWhich numbers would you like to enter? ";
    answer = await ask(sign);
    if (answer.includes("123456")) {
      theStudy();
    } else {
      console.log(cannotDo);
      start();
    }
  }

  async function theStudy() {
    console.log(study.description);
    answer = await ask(doWhat)
  }
  
  //while (player.location !== outside) {
  //    if (actions.take.includes(answer)) {
  //      take(act);
  //    } else if (actions.use.includes(answer)) {
  //      use(act);
  //    } else if (actions.go.includes(answer)) {
  //      use(act);
  //    } else if (actions.move.includes(answer)) {
  //      use(act);
  //    } else if (actions.examine.includes(answer)) {
  //      use(act);
  //    } else {
  //      console.log(cannotDo);
  //    }
  //  }
  
      //async function start() {
      //  answer = await ask(sign);
      //  while (player.location !== "outside") {
      //    if (answer.includes("123456")) {
      //      studyRoom()
      //    } else {
      //      console.log(cannotDo + answer);
      //      answer = await ask(doWhat);
      //    }
      //  }
      //}
      //
      //  //Function once game has started
      //  async function studyRoom() {
      //    player.location = "study";
      //    answer = await ask(study);
      //    while (player.location !== outside) {
      //      answer = await ask(doWhat);
      //      if (answer === "inventory") {
      //        if (inventory === 0) {
      //          console.log("You do not have anything in your inventory. ")
      //        } else {
      //          console.log(inventory.item)
      //        }
      //      }
      //    } //else if (actions)
      //  }

