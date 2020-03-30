const rita = require('rita');
const fs = require('fs');

const input = document.querySelector('input')

//Silly generation
const silly = document.querySelector('#silly');

silly.addEventListener('click', event => {
  let s = input.value
  let rs = new RiString(s);
  let words = rs.words();
  let syllables = RiTa.getSyllables(s);

  let newLine = "";
  words.forEach((word, i) => {
    if (isPunctuation(word)) {
      let rWord = new RiString(word);
      let rhyme = findRhyme(word)
      newLine += `${rhyme ? rhyme : 'o'} `;
    }
  })
  console.log(newLine)
})

function findRhyme(word) {
  let syllables = RiTa.getSyllables(word).split('/')
  let rhymes = RiTa.rhymes(word)
  let matchingRhymes = RiTa.rhymes(word).filter((rhyme) => {
    return syllables.length === RiTa.getSyllables(rhyme).split('/').length
  });
  if (matchingRhymes.length) {
    rhymes = matchingRhymes
  }
  let rhyme = rhymes[Math.floor(Math.random()*rhymes.length)];
  return rhyme
}

function isPunctuation(word) {
  let punc = ['.', ',', ';', ':', '?', '!']
  return punc.indexOf(word) === -1
}

//Smart generation
const smart = document.querySelector('#smart');

smart.addEventListener('click', event => {
  let s = input.value;
  debugger
  let theText = fs.readFileSync('sample.txt')

  let rm = new RiMarkov(3);
  rm.loadText(theText);

  let sentences = rm.generateSentence(3)
  console.log(sentences)
})
