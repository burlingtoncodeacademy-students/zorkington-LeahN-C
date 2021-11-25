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

//creating the class "Room"
class Room {
  constuctor(name, description, inventory, connectsTo) {
    this.name = name;
    this.description = description;
    this.inventory = inventory;
    this.connectsTo = connectsTo;
  }
}

//the different rooms
let beach = new Room("beach", "You walk on beach", "sign", ["study"]);
let study = new Room(
  "study",
  "You walk into study",
  ("bookshelf", "desk"),
  ["beach", "kitchen"]
);
let livingRoom = new Room(
  "livingRoom",
  "livingRoom has a couch",
  ("TV", "remote"),
  ["study", "bedroom"]
);

//beach = beach;
//study = study;
//livingRoom = livingRoom;

let roomLookUp = {
  beach: "beach",
  study: "study",
  livingRoom: "livingRoom",
};

//console.log(typeof canChangeTo)

let rooms = {
  beach: { canChangeTo: ["study"] },
  study: { canChangeTo: ["beach", "kitchen", "livingRoom"] },
  livingRoom: { canChangeTo: ["study", "bedroom"] },
};

let currentRoom = "beach"

async function enterRoom(newRoom) {
  newRoom = await ask("Where would you like to go? ");
  let validTransitions = rooms[currentRoom].canChangeTo;
  if (validTransitions.includes(newRoom)) {
    currentRoom = newRoom;
    let roomState = roomLookUp[currentRoom];
    console.log(roomState.description);
  } else {
    console.log(
      "Sorry, you cannot go from " + currentRoom + " to " + newRoom + ". "
    );
    enterRoom()
  }
}

enterRoom();
