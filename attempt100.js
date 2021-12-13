//DONE //Game that allows moving between locations freely - no locked doors
//DONE //Can pick up items and examine items
//DONE //Need to create 'if' blocks and run functions for when user interacts with the items (eg "enter numbers 123456")
//DONE //If "123456", then study === unlocked (location.locked === false)
//DONE //Create function to drop items (inverse of take function) -- use .push to push from player inventory to room inventory and vise versa
//DONE //Continue using "if" logic inside while loop (eg else if (actionsLookupTable.examine.includes(actions))
//DONE //Need process.exit() at end of while loop inside async function with "YAY YOU GOT OUT"

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

//Function to clean up user's input so the computer recognizes each word
function cleanWords(userInput) {
  let cleanUp = userInput.toString().trim().toLowerCase();
  return cleanUp;
}

/* ----------------------------- Functions Functions -------------------------- */

//Function to change between rooms
function changeRooms(newLocation) {
  //Referring to valid transitions shown in the "Location Changes" section
  let validTransitions = locations[currentLocation].canMoveTo;
  //If the transition is valid...
  if (validTransitions.includes(newLocation)) {
    //Then the player moves to the next room 
    currentLocation = newLocation;
    //The current state is the current location
    let currentState = roomsLookupTable[currentLocation];
    console.log(currentState.description);
  } //If the new location is locked, player cannot enter
  else if (newLocation.locked === true) {
      console.log("The door is locked. ") 
  } //And if it is not a valid transition, the player cannot move directly there
  else {
    console.log(
      "You cannot move directly from the " +
        currentLocation +
        " to the " +
        newLocation +
        ". "
    );
  }
  //The player is in the current location
  player.location = roomsLookupTable[currentLocation];
}

//Function to take items
function takeItems(takeableItem) {
  //Assigning canTake to items from the lookup table
  let canTake = itemsLookupTable[takeableItem];
//If the item is takeable and the player is in a room with the takeable item...
  if (
    canTake.takeable === true &&
    player.location.inventory.includes(takeableItem)
  ) {
    //The item is added to the end of the player's inventory list
    player.location.inventory.splice(
      player.location.inventory.indexOf(takeableItem),
      1
    );
    player.inventory.push(takeableItem);
    //Computer prints that player has the item
    console.log("You now have the " + takeableItem + " in your inventory. ");
    //And prints the item's description
    console.log(canTake.description);
  } //Otherwise, tells user they can't take the untakeable item
  else {
    console.log("You cannot take that. ");
  }
}

//Function to drop items
function dropItems(inventoryItem) {
  //If the player has an item in inventory
  if (player.inventory.includes(inventoryItem)) {
    //Drop the item into the current room
    player.inventory.splice(player.inventory.indexOf(inventoryItem));
    player.location.inventory.push(inventoryItem);
    console.log("You dropped the " + inventoryItem + " from your inventory. ");
  } //If the item doesn't belong in the current room, tell player to drop in the right room
  else {
    console.log("Please put that back where you found it. ");
  }
}

//Function to examine items
function examineItems(examinableItem) {
  //If the item is from the lookup table
  let lookAt = itemsLookupTable[examinableItem];
  //Print the description
  console.log(lookAt.description);
}

/* ------------------------------- Player Info -------------------------------- */

//Player starts with no inventory
let player = {
  inventory: [],
  location: null,
};

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

const beach = new Room(
  "beach",
  "\nYou are standing in the sand on a beach. You look around and the only thing you see is a door in front of you with a keypad on the handle. \nWhen you look more closely, you see that on the door is a handwritten sign. \nWhat would you like to do? \n",
  [], true
);
const study = new Room(
  "study",
  "\nYou press the numbers 1, 2, 3, 4, 5, and 6. \nYou hear a click, and the door opens... \n\nYou step into a room and see a bookshelf. \nWhat would you like to do? \n",
  ["key"], true
);
const livingroom = new Room(
  "livingroom",
  "\nYou use the key to open the door. As you walk into the next room, you notice a TV and a coffee dresser. \nWhen you look at the coffee dresser, you see a TV remote. \nWhat would you like to do? \n",
  ["remote"], true
);
const bedroom = new Room(
  "bedroom",
  "\nYou use the remote to press the buttons 'up', 'down', 'left', and 'right', and the door swings open. \nYou walk into the next room and see a bed with a dresser next to it. \nYou notice something on the dresser. \nWhat would you like to do? \n",
  ["button"], true
);
const bathroom = new Room(
  "bathroom",
  "\nYou walk in and find yourself in a bathroom. The toilet looks nasty, you have no interest in going over there. \nOn the mirror, you see something written... \nWhat would you like to do? \n",
  ["mirror"], true
);
const diningroom = new Room(
  "diningroom",
  "\nYou say the word 'Maple', and the next door opens. You run out of the bathroom, glad to be away from the smell. \nThe next room has a long dining table and pictures all over the walls. \nYou notice something glistening on one picture. \nWhat would you like to do? \n",
  ["picture"], true
);
const kitchen = new Room(
  "kitchen",
  "\nAs you walk into the next room, you immediately notice light shining in from the many windows. \nYou look out the window and see the beach, where you first started. \nYou walk over to the sink and decide to fill a glass of water. You are very thirsty from walking around this house. \nAs you are drinking your water, you notice a lever next to the door. \nWhat would you like to do? \n",
  ["lever"], true
);
const outside = new Room(
  "outside",
  "\nCONGRATULATIONS! You managed to unlock all of the doors and get back outside! \nNow you can chill on the beach for the rest of the day. ",
  [], true
);

outside.locked = true;

/* ----------------------------- Location Changes ----------------------------- */

//Locations and where they can move
const locations = {
  beach: { canMoveTo: ["study"] },
  study: { canMoveTo: ["kitchen", "livingroom", "beach"] },
  livingroom: { canMoveTo: ["study", "bedroom"] },
  bedroom: { canMoveTo: ["livingroom", "bathroom"] },
  bathroom: { canMoveTo: ["bedroom", "diningroom"] },
  diningroom: { canMoveTo: ["bathroom", "kitchen"] },
  kitchen: { canMoveTo: ["diningroom", "study", "outside"] },
  outside: { canMoveTo: ["kitchen"] },
};

//Player's starting location
let currentLocation = "beach";

/* --------------------------- Item Class Constructor ------------------------- */

class Item {
  constructor(name, description, takeable) {
    this.name = name;
    this.description = description;
    this.takeable = takeable;
  }
}

/* ---------------------------- Item Descriptions ----------------------------- */

const sign = new Item(
  "sign",
  "\nThe sign reads... \n'Through this door are truths and lies. \nWhich will you choose? Which will be your demise? \nIf you dare to enter now, your choice will be your final vow... \nThe code, one two three four five six, will give you access but may be a trick... \nEnter at your own risk.' \nYou look down at the keypad on the door handle... \nWhich numbers would you like to enter? \n",
  false
);

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
  "\nYou pick up the remote and turn on the TV. \nThe TV comes on and there are four arrows on the screen-- up down left and right. You look down at the arrows on the remote. \nWhich arrows would you like to press? (Pay attention to the order). \n",
  true
);
const dresser = new Item("dresser", "\nWhen you look more closely, you see that there is a button on the dresser. \nWhat would you like to do? \n", false)
const button = new Item(
  "button",
  "\nWhen you press the button, the next door slowly opens. ",
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
  "\nYou pull the lever, and the door opens to the jungle! \nYou can now move freely between rooms or leave to go outside. \nAt any time, to choose a room where you'd like to go, type 'go to' and then the room where you'd like to go. \nYour options are study, livingroom, bedroom, bathroom, diningroom and kitchen. Keep in mind you can only move between connecting rooms. \nTo end the game, type 'go outside'. \n",
  true
);

/* ------------------------------- Lookup Tables ------------------------------ */

//Lookup table to reference rooms
let roomsLookupTable = {
  beach: beach,
  study: study,
  livingroom: livingroom,
  bedroom: bedroom,
  bathroom: bathroom,
  diningroom: diningroom,
  kitchen: kitchen,
  outside: outside,
};

//Lookup table to reference items
let itemsLookupTable = {
  sign: sign,
  bookshelf: bookshelf,
  key: key,
  remote: remote,
  dresser: dresser,
  button: button,
  mirror: mirror,
  picture: picture,
  lever: lever,
};

//Lookup table to reference actions
let actionsLookupTable = {
  take: ["take", "pick", "grab", "get"],
  drop: ["drop", "put"],
  examine: [
    "examine",
    "look",
    "view",
    "inspect",
    "read",
    "touch",
  ],
  use: ["push",
    "pull",
    "press",
    "type",
    "open",
    "unlock",],
  move: ["move", "go", "walk"],
};

/* ----------------------------- Async Functions ------------------------------ */

gameStart();

//Function to run the whole game
async function gameStart() {
  //Starting with the beach description
  console.log(beach.description);
  //Player starts on the beach
  player.location = beach;
  //While the player is not outside...
  while (player.location !== outside) {
    //This is the user's input
    let initialInput = await ask(">");
    //This is the user's input being cleaned in the "cleanWords" function at the top
    let cleanOutput = cleanWords(initialInput);
    //This is the clean array once it's been split up
    let cleanInputArray = cleanOutput.split(" ");
    //Computer can now recognize actions at the beginning of the user's input...
    let actions = cleanInputArray[0];
    //And items at the end of the user's input
    let useableItems = cleanInputArray[cleanInputArray.length - 1];
    //If the action word is included in the "move" actions from the lookup table...
    if (actionsLookupTable.move.includes(actions)) {
      //Then the input can be run through the "changeRooms" function at the top
      changeRooms(useableItems);
    } //If the action word is included in the "take" actions...
    else if (actionsLookupTable.take.includes(actions)) {
      //Run input through the "takeItems" function
      takeItems(useableItems);
    } //If the action word is included in the "examine" actions...
    else if (actionsLookupTable.examine.includes(actions)) {
      //Run the input through the "examineItems" function
      examineItems(useableItems);
    } //If the item exists
    else if (actionsLookupTable.drop.includes(actions)) {
      //Run it through the "dropItems" function
      dropItems(useableItems);
    } //If the input includes this string
    else if (initialInput.includes("123456")) {
      //The study is unlocked
        study.locked === false;
        //Move to the study
        changeRooms("study");
    } //If the input includes this string
    else if (initialInput.includes("door")) {
      //The livingroom is unlocked
        livingroom.locked === false;
        //Move to the livingroom
        changeRooms("livingroom");
    } //If the input includes any of these strings
    else if (initialInput.includes("up, down, left, right") || initialInput.includes("up down left and right") || initialInput.includes("up down left right")) {
        //The bedroom is unlocked
      bedroom.locked === false;
      //Move to the bedroom
        changeRooms("bedroom");
    } //If input includes this string
    else if (initialInput.includes("dresser")) {
      //Print "dresser" description
        console.log(dresser.description)
    } //If input includes this string
    else if (initialInput.includes("button")) {
      //Print "button" description
        console.log(button.description);
        //The bathroom is unlocked
        bathroom.locked === false;
        //Move to the bathroom
        changeRooms("bathroom");
    } //If input includes either of these strings
    else if (initialInput.includes("maple") || initialInput.includes("Maple")) {
      //The diningroom is unlocked
        diningroom.locked === false;
        //Move to the diningroom
        changeRooms("diningroom");
    } //If input includes this string
    else if (initialInput.includes("picture")) {
      //The kitchen is unlocked
        kitchen.locked === false;
        //Print the "kitchen" description
        console.log(kitchen.description);
        //Move to the kitchen
        changeRooms("kitchen");
    } //If the input includes this string
    else if (initialInput.includes("lever")) {
      //The outside door is unlocked
        outside.locked === false;
        //Print the "lever" description
        console.log(lever.description);
    } //If the input includes this string
    else if (initialInput.includes("go outside")) {
      //End the game!
        process.exit();
    } //Otherwise, tell user can't do what they're asking
    else {
        console.log("I don't know how to " + initialInput + ". ")
    }
  } 
}
