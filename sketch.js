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
  let syllables = RiTa.getSyllables(s);
  console.log(syllables);

  let newLine = "";
  words.forEach((word, i) => {
    if (isPunctuation(word)) {
      let rWord = new RiString(word);
      console.log(rWord.analyze());
      let rhyme = findRhyme(word)
      newLine += `${rhyme ? rhyme : 'oh'} `;
    }
  })
  createP(newLine);
}

function findRhyme(word) {
  let syllables = RiTa.getSyllables(word).split('/')
  console.log(syllables);
  let rhyme = RiTa.rhymes(word).find((rhyme) => {
    return syllables.length === RiTa.getSyllables(rhyme).split('/').length
  });
  return rhyme
}

function isPunctuation(word) {
  let punc = ['.', ',', ';', ':']
  return punc.indexOf(word) === -1
}

// todo rhyme last word in the line
// preserve line's sylabic structure
