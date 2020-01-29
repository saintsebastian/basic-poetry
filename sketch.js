let lexicon;

let input;
let button;

function setup() {
  noCanvas();
  lexicon = new RiLexicon();

  input = createInput("Do not go quietly into the gentle night.");
  input.changed(processRita);
  input.size(300);

  button = createButton("Add line");
  button.mousePressed(processRita);
}

function processRita() {
  let s = input.value();
  let rs = new RiString(s);
  let words = rs.words();
  console.log(words);

  let newLine = "";
  for (word of words) {
    newLine += `${word} `;
  }

  createP(newLine);
}

// todo rhyme last word in the line
// preserve line's sylabic structure
