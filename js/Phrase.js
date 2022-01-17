/*OOP Game App
 * Phrase.js */
class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  /**
   * Display phrase on game board
   */
  addPhraseToDisplay() {
    const ul = document.querySelector('#phrase ul');

    for (var i = 0; i < this.phrase.length; i++) {
      const li = document.createElement('li');
      var letter = this.phrase[i];
      //console.log(letter);
      var textNode = '';

      if (letter === ` `) {
        li.className = 'space';
        textNode = document.createTextNode(letter);
        li.appendChild(textNode);
      } else {
        li.className = `hide letter ${letter}`;
        textNode = document.createTextNode(letter);
        li.appendChild(textNode);
      }
      ul.appendChild(li);
    }
  }

  /**
   * Checks if passed letter is on phrase
   * @param (string) letter - Letter to check
   */
  checkLetter(letter) {
    if (this.phrase.includes(letter)) return true;
    return false;
  }

  /**
   * Displays passed letter on screen after a match is found
   * @param (string) letter - Letter to display
   */
  showMatchedLetter(letter) {
    const allMatchedLetters = document.querySelectorAll(`.${letter}`);
    allMatchedLetters.forEach((matchedLetter) => {
      if (matchedLetter.className.includes('hide')) {
        matchedLetter.className = `show letter ${letter}`;
      }
    });
  }
}
