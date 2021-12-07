const readline = require("readline");
const rlInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rlInterface.question(questionText, resolve);
  });
}

let inventory = [];

class Item {
  constructor(name, description, action, takeable) {
    this.name = name;
    this.desc = description;
    this.takeable = takeable || false;
    this.action = action || "nothing happens";
  }

  take() {
    if (this.takeable) {
      inventory.push(this.name);
      return `you picked up ${this.name}`;
    } else {
      return "you can't take that";
    }
  }

  use() {
    if (this.name === "desk" && inventory.includes("smallkey")) {
      return "you can open the drawer, inside is a large key";
    } else {
      return this.action;
    }
  }
}

let desk = new Item(
  "desk",
  "a small writing desk. \n there is a single drawer",
  "the desk is locked",
  undefined
);

let rug = new Item(
  "rug",
  "a faded rug",
  "you lift the rug\nunderneath is a small key"
);

let clock = new Item(
  "clock",
  `the clock keeps ticking away\nthere is no way to open it`
);

let smallkey = new Item(
  "smallkey",
  "a small key",
  "this looks like it would fit the lock on the desk...",
  true
);

let largekey = new Item(
  "largekey",
  "a large key",
  "this looks like it would fit the lock on the door...",
  true
);

let lookUpTable = {
  desk: desk,
  rug: rug,
  clock: clock,
  smallkey: smallkey,
  "small key": smallkey,
  largekey: largekey,
};

async function play() {
  let userAction = await ask("What would you like to do?");

  let inputArray = userAction.toLowerCase().split(" ");

  let action = inputArray[0];

  let target = inputArray.slice(1).join(" ");

  if (action === "use") {
    console.log(lookUpTable[target].use());
  } else if (action === "take") {
    if (lookUpTable[target] instanceof Item) {
      console.log(lookUpTable[target].take());
    } else {
      console.log(lookUpTable[target] instanceof Item);
      console.log("That's not an item :(");
    }
  } else if (action === "examine") {
    console.log(lookUpTable[target].desc);
  } else if (action === "leave") {
    if (inventory.includes("largekey")) {
      console.log("you are free!!");
      process.exit();
    } else if (inventory.includes("smallkey")) {
      console.log("this small key does not fit the door...");
    } else {
      console.log("the door is locked");
    }
  } else {
    console.log("invalid input, try again!");
  }

  return play();
}

console.log(
  "Welcome brave traveler to your DOOOOOOM!\nYou find yourself trapped in a small room, to your left is a small desk\nin the middle of the floor is a faded rug\nto your right is a grandfather clock\n directly across from you is the door out"
);

play();