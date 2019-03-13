const library = [
  ["B", "O", "N", "J", "O", "U", "R"],
  ["B", "E", "C", "O", "D", "E"],
  ["A", "M", "O", "U", "R"],
  ["L", "U", "M", "I", "E", "R", "E"],
  ["A", "U", "S", "T", "R", "A", "L", "O", "P", "I", "T", "H", "E", "Q", "U", "E", "S"],
  ["S", "U", "S", "H", "I", "S"],
  ["A", "P", "P", "R", "E", "N", "D", "R", "E"]
];

// Create the word to find in an Array ransomy choosen in the library variable
let secretWord = library[Math.floor(Math.random() * Math.floor(library.length))];

// good answers
let goodAnswers = [];
// bad answers
let badAnswers = ["", "", "", "", "", "", "", ""];
// Errors count
let errors = 0;
// Life count
let life = 8;

// Write the life score in the HTML
document.getElementById("lifeScore").innerHTML = life;


// ----------- draw PENDU -----------
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let midleCanvas = 250;

//----- floor -----
ctx.beginPath();
ctx.lineWidth = 13;
ctx.strokeStyle = "white";
ctx.moveTo(450, 470);
ctx.lineTo(0, 470);
ctx.stroke();

// Create dash in html relativly to the secretWord's length
console.log(secretWord.length);

for (let i = 0; i < secretWord.length; i++) {
  console.log(secretWord.length);
  let myDiv = document.createElement("DIV");
  myDiv.className = "item dash";
  let dash = document.getElementById("dash");
  dash.appendChild(myDiv);
}

// Create empty div above the dash (relaivly to the secretWord's length)
for (let i = 0; i < secretWord.length; i++) {
  let myDiv = document.createElement("DIV");
  myDiv.className = "word-div item";
  myDiv.id = `word-${i}`;
  let word = document.getElementById("word-div");
  word.appendChild(myDiv);
}

for (let i = 0; i < badAnswers.length; i++) {
  let myDiv = document.createElement("DIV");
  myDiv.className = "bad item";
  myDiv.id = `bad-${i}`;
  let bad = document.getElementById("bad");
  bad.appendChild(myDiv);
}

// Function called with the button
const launch = () => {

  // ----------- CREATE GOOD ANSWER'S ARRAY if the array is empty ----------
  if (goodAnswers.length < 2) {
    for (let i = 0; i < secretWord.length; i++) {
      goodAnswers.push(" ");
    }
  }

  // ---------- GAME OVER ----------
  const gameOver = () => {

    // delet html's content of the good asnwers's div
    const wordDiv = document.getElementById("word-div");
    const itemsWord = document.querySelectorAll('.word-div');
    console.log(itemsWord);
    for (let i = 0; i < itemsWord.length; i++) {
      wordDiv.removeChild(itemsWord[i]);
    }

    // delet html's content of the bad asnwers's div
    const dashDiv = document.getElementById("dash");
    const itemsDash = document.querySelectorAll('.dash');

    for (let i = 0; i < itemsDash.length; i++) {
      dashDiv.removeChild(itemsDash[i]);
    }

    // assign the word to find to the Array ransomy choosen in the library variable
    secretWord = library[Math.floor(Math.random() * Math.floor(library.length))];

    // reset bad answer's array
    badAnswers = ["", "", "", "", "", "", "", ""];

    // delete bad answer on html's content
    for (let i = 0; i < badAnswers.length; i++) {
      document.getElementById(`bad-${i}`).innerHTML = " "
    }
    for (let i = 0; i < secretWord.length; i++) {
      goodAnswers.push(" ");
    }

    // reset error's count
    errors = 0;
    // reset life's count
    life = 8;
    // reset isEqual count
    isEqual = 0;

    // write the default life's count
    document.getElementById("lifeScore").innerHTML = life;

    // reset canvas and draw the floor
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.lineWidth = 13;
    ctx.strokeStyle = "white";
    ctx.moveTo(450, 470);
    ctx.lineTo(0, 470);
    ctx.stroke();
  }



  // If win ->
  const win = () => {
    const myBody = document.getElementById("myBody");
    const all = document.getElementById("all");
    myBody.removeChild(all);
    let myOne = document.createElement("H1");
    let Succes = document.createTextNode("Succes !");
    myOne.appendChild(Succes);
    document.body.appendChild(myOne);
    let myButtonOne = document.createElement("BUTTON");
    let myTexteButton = document.createTextNode("Restart");
    myButtonOne.appendChild(myTexteButton);
    document.body.appendChild(myButtonOne);

    myButtonOne.setAttribute("onclick", "document.location.reload(true)")

  }

  let errorsLocal = 0;
  // allow user to enter a letter, if he enter more than one letter, ask him to enter ONE letter
  let userLetter = prompt("Veuillez insérer une lettre");
  userLetter = userLetter.toUpperCase();
  while (userLetter.length != 1) {
    userLetter = prompt("Veuillez insérer UNE SEULE lettre.");
    userLetter = userLetter.toUpperCase();
  }
  console.log(secretWord);
  // Write the find's letter in the html div if it's a good answer. else, add one to the errors's global variable and push the bad letter the badAswers's array.
  for (let i = 0; i < secretWord.length; i++) {
    if (userLetter === secretWord[i]) {
      goodAnswers[i] = userLetter;
      document.getElementById(`word-${i}`).innerHTML = goodAnswers[i];
    } else {
      errorsLocal++;
    }
  }
  if (errorsLocal === secretWord.length) {
    badAnswers[errors] = userLetter;
    document.getElementById(`bad-${errors}`).innerHTML = userLetter;
    errors++;
    life--;

  }

  //  At each itteration add 1 to isEqual if there are more good answer then the laster itteration of the function
  // If all the letters are goods, alert GG
  let isEqual = 0;
  for (let i = 0; i < secretWord.length; i++) {
    if (goodAnswers[i] === secretWord[i]) {
      isEqual++;
    }
  }
  if (isEqual === secretWord.length) {
    alert("gg");
    win();
  }
  if (isEqual !== secretWord.length) {
    document.getElementById("lifeScore").innerHTML = life;
  }

  console.log(badAnswers);
  // ---------- Drawing ----------
  switch (errors) {
    case 1:
      // ---------  POUTRE 1 --------
      ctx.beginPath();
      ctx.lineWidth = 13;
      ctx.strokeStyle = "white";
      ctx.moveTo(400, 470);
      ctx.lineTo(400, 70);
      ctx.lineTo(midleCanvas - 3, 70);
      ctx.stroke();
      break;
    case 2:
      // ---------  POUTRE 2 --------
      ctx.beginPath();
      ctx.lineWidth = 5;
      ctx.moveTo(midleCanvas, 70);
      ctx.lineTo(midleCanvas, 135);
      ctx.stroke();
      break;
    case 3:
      // ----- HEAD -----
      ctx.beginPath();
      ctx.lineWidth = 5;
      ctx.arc(midleCanvas, 175, 40, 0, 2 * Math.PI);
      ctx.stroke();
      break;
    case 4:
      // ----- BODY -----
      ctx.beginPath();
      ctx.moveTo(midleCanvas, 217);
      ctx.lineTo(midleCanvas, 370);
      ctx.stroke();
      break;
      // ---------- ARMS ----------
    case 5:
      // --- LEFT ARM ---
      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.moveTo(midleCanvas, 240);
      ctx.lineTo(midleCanvas - 50, 292);
      ctx.stroke();
      break;
    case 6:
      // --- RIGHT ARM ---
      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.moveTo(midleCanvas, 240);
      ctx.lineTo(midleCanvas + 50, 292);
      ctx.stroke();
      break;
      // ---------- LEGS  -----------
    case 7:
      // --- LEFT LEGS ---
      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.moveTo(midleCanvas, 368);
      ctx.lineTo(midleCanvas - 50, 420);
      ctx.stroke();
      break;
    case 8:
      // --- RIGHT LEGS ---
      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.moveTo(midleCanvas, 368);
      ctx.lineTo(midleCanvas + 50, 420);
      ctx.stroke();
      alert("GAME OVER !");
      gameOver();
      break;
  }
}