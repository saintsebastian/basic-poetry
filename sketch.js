let lexicon;

let input;
let dumbButton;
let smarterButton;

function setup() {
  noCanvas();
  lexicon = new RiLexicon();

  input = createInput("Do not go quietly into the gentle night.");
  input.size(300);

  dumbButton = createButton("Add silly line");
  dumbButton.mousePressed(addLine);

  smarterButton = createButton("Add coherent line");
  smarterButton.mousePressed(generateSentence);
}

function addLine() {
  let s = input.value();
  let rs = new RiString(s);
  let words = rs.words();
  let syllables = RiTa.getSyllables(s);

  let newLine = "";
  words.forEach((word, i) => {
    if (isPunctuation(word)) {
      let rWord = new RiString(word);
      console.log(rWord.analyze());
      let rhyme = findRhyme(word)
      newLine += `${rhyme ? rhyme : 'o'} `;
    }
  })
  createP(s);
  createP(newLine);
}

function findRhyme(word) {
  let syllables = RiTa.getSyllables(word).split('/')
  let rhymes = RiTa.rhymes(word)
  let matchingRhymes = RiTa.rhymes(word).filter((rhyme) => {
    return syllables.length === RiTa.getSyllables(rhyme).split('/').length
  });
  if (matchingRhymes.length) {
    rhymes = matchingRhymes
  }
  console.log(rhymes)
  let rhyme = rhymes[Math.floor(Math.random()*rhymes.length)];
  return rhyme
}

function isPunctuation(word) {
  let punc = ['.', ',', ';', ':', '?', '!']
  return punc.indexOf(word) === -1
}

function generateSentence() {
  let fs = require('fs')
  let s = input.value();
  // let rm = new RiMarkov(3);
  // rm.loadText(theText);
  // let theText = fs.readFileSync('test')
  // rm.loadText(theText);

  createP(s);
  createP(newLine);
}
