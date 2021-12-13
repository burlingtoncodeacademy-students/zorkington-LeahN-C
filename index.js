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

/* ---------------------------- Functions for Actions ------------------------- */

//Function for adding to inventory
function pickUp(thisItem) {
  let canHave = items[thisItem];
  if (!canHave) {
    console.log("You cannot take that. ");
  } else if (
    canHave.includes.takeable === true &&
    player.location.inventory.includes(thisItem)
  ) {
    player.inventory.push(thisItem);
    console.log("You pick up " + thisItem + ". ");
  } else {
    console.log("That is selfish, you cannot take that. ");
  }
}

//Function for checking things out
function lookAt(thisThing) {
  let checkOut = items[thisThing];
  if (player.location.inventory.includes(thisThing)) {
    console.log(checkOut.description);
  } else {
    console.log("That is not possible. ");
  }
}

/* ------------------------- Function for Changing Rooms ---------------------- */

function changeRooms(newLocation) {
  let canMoveTo = locations[currentLocation].canChangeTo;
  if (
    canMoveTo.includes(newLocation) &&
    locations[newLocation].locked === true
  ) {
    if (
      player.inventory.includes("key") ||
      player.inventory.includes("remote") ||
      player.inventory.includes("red button") ||
      player.inventory.includes("mirror") ||
      player.inventory.includes("picture") ||
      player.inventory.includes("lever")
    ) {
      outside.locked = false;
      currentLocation = newLocation;
      player.location = currentLocation;
      let locationRightNow = locations[currentLocation];
      console.log(locationRightNow);
    }
  } else {
    console.log("The door is locked. ");
  }
}

/* ----------------------------- Location Changes ----------------------------- */

//Locations and where they can move
const locations = {
  study: { canMoveTo: ["kitchen", "livingRoom", "outside"] },
  livingRoom: { canMoveTo: ["study", "bedroom"] },
  bedroom: { canMoveTo: ["livingRoom", "bathroom"] },
  bathroom: { canMoveTo: ["bedroom", "diningRoom"] },
  diningRoom: { canMoveTo: ["bathroom", "kitchen"] },
  kitchen: { canMoveTo: ["diningRoom", "study"] },
  outside: { canMoveTo: ["study"] },
};

//Player's starting location
let currentLocation = locations["outside"];

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
    this.takeable = takeable;
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
  "\nYou pull the lever, and the door opens to the jungle! \nYou can now move between rooms or leave to go outside. To choose a room where you'd live to go, type 'change rooms'. \nYou may also write 'go outside' to end the game. \n",
  true
);

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

/* ------------------------------- Player Info -------------------------------- */

let player = {
  inventory: [],
  location: null,
};

/* ---------------------------- Other Assignments ----------------------------- */

let cannotDo = "\nI do not know how to ";

let cannotTake = "\nThat's selfish. You cannot take that. ";

/* ----------------------------- Async Functions ------------------------------ */

intro();

//Intro function to start the game
async function intro() {
  const introMessage =
    "\nYou are standing in the sand on a beach. You look around and the only thing you see is a door in front of you with a keypad on the handle. \nWhen you look more closely, you see that on the door is a handwritten sign. \nWhat would you like to do? \n";
  let answer = await ask(introMessage);
  if (answer.includes("read")) {
    onTheBeach();
  } else if (answer.includes("take")) {
    console.log(cannotTake + answer + ". Please try again. ");
    intro();
  } else {
    console.log(cannotDo + answer + ". Please try again. ");
    intro();
  }
}

//Function to get into the first room
async function onTheBeach() {
  const sign =
    "\nThe sign reads... \n'Through this door are truths and lies. \nWhich will you choose? Which will be your demise? \nIf you dare to enter now, your choice will be your final vow... \nThe code, one two three four five six, will give you access but may be a trick... \nEnter at your own risk.' \nYou look down at the keypad on the door handle... \nWhich numbers would you like to enter? \n";
  answer = await ask(sign);
  if (answer.includes("123456")) {
    inTheStudy();
  } else {
    console.log(cannotDo + answer + ". Please try again. ");
    onTheBeach();
  }
}

//Function for looking at bookshelf
async function inTheStudy() {
  currentLocation = study;
  answer = await ask(study.description);
  if (answer.includes("bookshelf")) {
    useKey();
  } else if (answer.includes("take")) {
    console.log(cannotTake);
    inTheStudy();
  } else {
    console.log(cannotDo + answer + ". Please try again. ");
    inTheStudy();
  }
}

//Function for using the key to open the door
async function useKey() {
  currentLocation = study;
  answer = await ask(bookshelf.description);
  if (answer.includes("key") || actions.take.includes(answer)) {
    answer = await ask(key.description);
    if (answer.includes("open") || answer.includes("unlock")) {
    inTheLivingRoom();
    } else {
      console.log(cannotDo + answer + ". Please try again. ");
      useKey();
    }
  } else {
    console.log(cannotDo + answer + ". Please try again. ");
    useKey();
  }
}

//Function for entering the living room
async function inTheLivingRoom() {
  currentLocation = livingRoom;
  answer = await ask(livingRoom.description);
  if (answer.includes("remote")) {
    useRemote();
  } else {
    console.log(cannotDo + answer + ". Please try again. ");
    inTheLivingRoom();
  }
}

//Function for using the remote to open the door
async function useRemote() {
  currentLocation = livingRoom;
  answer = await ask(remote.description);
  if (answer.includes("up, down, left, right") || answer.includes("up down left right")) {
    inTheBedroom();
  } else {
    console.log(cannotDo + answer + ". Please try again. ");
    useRemote();
  }
}

async function inTheBedroom() {
  currentLocation = bedroom;
  answer = await ask(bedroom.description);
  if (answer.includes("bedside table")) {
    useRedButton();
  } else if (answer.includes("take")) {
    console.log(cannotTake);
    inTheBedroom();
  } else {
    console.log(cannotDo + answer + ". Please try again. ");
    inTheBedroom();
  }
}

async function useRedButton() {
  currentLocation = bedroom;
  answer = await ask(redButton.description);
  if (answer.includes("red button") || answer.includes("press") || answer.include("push")) {
    inTheBathroom();
  } else {
    console.log(cannotDo + answer + ". Please try again. ");
    useRedButton();
  }
}

async function inTheBathroom() {
  currentLocation = bathroom;
  answer = await ask(bathroom.description);
  if (answer.includes("mirror")) {
    useMirror();
  } else {
    console.log(cannotDo + answer + ". Please try again. ");
    inTheBathroom();
  }
}

async function useMirror() {
  currentLocation = bathroom;
  answer = await ask(mirror.description);
  if (answer.includes("Maple") || answer.includes("maple")) {
    inTheDiningRoom();
  } else {
    console.log(cannotDo + answer + ". Please try again. ");
    useMirror();
  }
}

async function inTheDiningRoom() {
  currentLocation = diningRoom;
  answer = await ask(diningRoom.description);
  if (answer.includes("picture")) {
    inTheKitchen();
  } else {
    console.log(cannotDo + answer + ". Please try again. ");
    inTheDiningRoom();
  }
}

async function inTheKitchen() {
  currentLocation = kitchen;
  console.log(picture.description)
  answer = await ask(kitchen.description);
  if (answer.includes("lever")) {
    useLever();
  } else {
    console.log(cannotDo + answer + ". Please try again. ");
    inTheKitchen();
  }
}

async function useLever() {
  currentLocation = kitchen;
  answer = await ask(lever.description);
  if (answer.includes("go outside")) {
    process.exit();
  } else if (answer.includes("change rooms")) {
    changeRooms();
  } else {
    console.log(cannotDo + answer + ". Please try again. ");
    useLever();
  }
}

async function changeRooms(newLocation) {
  currentLocation = study;
  newLocation = await ask("\nWhere would you like to go? \nYour options are the Study, the Living Room, the Bedroom, the Bathroom, the Dining Room and the Kitchen. ") 
  let validMoves = locations[currentLocation].canMoveTo;
  if (validMoves.includes(newLocation)) {
    console.log("Moving from " + currentLocation + " to " + newLocation + ". ");
    currentLocation = newLocation;
    changeRooms();
  } else {
    console.log(
      "You cannot move directly from " +
        currentLocation +
        " to " +
        newLocation +
        ". Please try again. "
    );
  }
}

//Function once player is in the first room
async function start() {
  answer = await ask(bookshelf.description);
  player.location = rooms[study];
  currentLocation = player.location;
  while (player.location !== outside) {
    //if (answer === "inventory" || answer === "i") {
    //  if (player.location.inventory.length === 0) {
    //    console.log("You do not have anything in your inventory. ")
    //  } else {
    //    player.location.inventory.forEach
    //  }

    if (Room.description) {
      player.location = rooms[Room];
    }
    else if (
      answer.includes(actions.take) &&
      answer.includes(player.location.inventory)
    ) {
      answer = player.location.inventory;
      pickUp(answer);
    } else if (
      answer.includes(actions.examine) &&
      answer.includes(player.location.inventory)
    ) {
      lookAt(player.location.inventory);
    } else if (answer.includes(actions.move) && answer.includes(rooms)) {
      changeRooms(player.location);
    } else {
      await ask(cannotDo + answer + ". Press 'enter' to try again. ");
      start();
    }
  }
  process.exit();
}


////Function for "the study"
//async function theStudy() {
//  currentLocation = locations[study]
//  answer = await ask(study.description);
//  if (answer.includes(actions(examine)) && answer.includes("bookshelf")) {
//    await ask(bookshelf.description);
//    while (answer !== answer.includes(actions.take) && answer.inclues("key")) {
//    if (answer.includes(actions.take) && answer.includes("key")) {
//      inventory = [key];
//      answer = await ask(key);
//      if (answer.includes(actions[go]) && answer.includes("key")) {
//        theLivingRoom();
//      } else {
//        await ask(cannotDo + answer + ". Try again. ");
//      }
//    } else {
//      await ask(cannotDo + answer + ". Try again. ")
//    }
//  }
// } else {
//    console.log(cannotDo + answer + ". ");
//    theStudy();
//  }
//  }
//
//async function theLivingRoom() {
//
//}

//Function for "the living room"

//Function for "the bedroom"

//Function for "the bathroom"

//Function for "the dining room"

//Function for "the kitchen"
