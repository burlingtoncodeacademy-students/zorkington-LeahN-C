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

/* --------------- Lookup Table ------------- */
//
////creating the class "Room"
//class Room {
//  constuctor(name, description, inventory, connectsTo) {
//    this.name = name;
//    this.description = description;
//    this.inventory = inventory;
//    this.connectsTo = connectsTo;
//  }
//}
//
////the different rooms
//let beach = new Room('beach', /*description*/ 'sign', ['study']);
//let study = new Room('study', /*description*/ ('bookshelf', 'desk'), ['beach', 'kitchen']);
//

//Call the function
start();

//ASYNC FUNCTION to tell user about the scene and allow user to input text
async function start() {
  // -------------- welcome message ---------------
  const welcomeMessage = `\nYou are standing in the sand on a beach. You look around and the only thing you see is a door in front of you with a keypad on the handle. When you look more closely, you see that on the door is a handwritten sign. \nWhat would you like to do? `;
  //assigning "answer" to user's response to welcome message
  let answer = await ask(welcomeMessage);
  //assigning answer to answer to make a string
  answer = answer;
  // ------------- READ THE SIGN -----------
  while (
    answer !== answer.includes("read sign") ||
    answer !== answer.includes("read")
  ) {
    //if user's answer DOES include "read sign", read the sign
    if (answer.includes("read sign") || answer.includes("read")) {
      console.log(
        "\nThe sign reads... \n'Through this door are truths and lies. \nWhich will you choose? Which will be your demise? \nIf you dare to enter now, your choice will be your final vow... \nThe code, one two three four five six, will give you access but may be a trick... \nEnter at your own risk.'"
      );
      //and then ask user what they'd like to do next
      answer = await ask("What would you like to do? ");
      //reassign the new answer to answer
      answer = answer;
      // ---------- ENTER THE CODE -----------
      while (
        answer !== answer.includes("enter code") ||
        answer !== answer.includes("enter") ||
        answer !== answer.includes("keypad")
      ) {
        //if the user's answer DOES include "enter code"...
        if (
          answer.includes("enter code") ||
          answer.includes("enter") ||
          answer.includes("keypad")
        ) {
          console.log("\nYou look at the numbers on the keypad. ");
          //ask user for the code
          answer = await ask(
            "Which numbers would you like to enter into the keypad? "
          );
          answer = answer;
          // ------------ INPUT CODE -----------
          while (answer !== answer.includes("123456")) {
            //if it is correct...
            if (answer === "123456") {
              //print this message
              console.log(
                "\nYou press the numbers 1, 2, 3, 4, 5, and 6. \nYou hear a click, and the door opens... \n\nYou step into the room and see a bookshelf and a desk. "
              );
              //and then ask user what they'd like to do next
              answer = await ask("What would you like to do? ");
              answer = answer;
              // ---------------- NEXT ROOM -------------
            }
            //otherwise, print this message and tell them to try again
            else {
              console.log(
                "\nYou enter the numbers " +
                  answer +
                  ", but the door does not unlock. "
              );
              answer = await ask("Which numbers would you like to enter? ");
            }
          }
        }
        //if the user tries to open the door, it is LOCKED
        else if (answer.includes("open")) {
          console.log(
            "\nThe door is locked, there is a keypad on the door handle. "
          );
          answer = await ask("What would you like to do? ");
        }
        //otherwise, print "I dont know how to..."
        else {
          console.log("\nSorry, I do not know how to " + answer + ". ");
          answer = await ask("What would you like to do? ");
        }
      }
    }
    //if user's answer includes the word "take", tell user it would be selfish to take the sign
    else if (answer.includes("take")) {
      console.log("\nThat would be selfish, other people may need it, too. ");
      answer = await ask("What would you like to do? ");
    }
    //otherwise, tell user "I don't know how to..."
    else {
      console.log("\nSorry, I do not know how to " + answer + ". ");
      answer = await ask("What would you like to do? ");
    }
  }
  console.log("Now write your code to make this work!");
  process.exit();
}







//Starting place...
//??
//async function with console.log to tell user about the scene.
//option for user to look left, right, up, down, forward, behind.
//object or scenery each direction.
//async function for if user enters a command that game does not recognize.

//Message reads:
//" "??
//await ask to ask user to look around and choose where to go.
//create "i" or "inventory" with...??

//Option to go to starting room...
//create a lookup table for the rooms.
//tell user the code to open the door to the starting room.

//The code to the door is:
//await ask to have user input a code.
//while loop if they input correct code vs incorrect code.

//Obstacles in first room are:
//descriptions for rooms in lookup table.
//await ask user where they want to look.

//Door to the second room can be opened by:

//The second room is has...

//The obstacles in the second room are:
