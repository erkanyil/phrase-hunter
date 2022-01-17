/* OOP Game App
 * Game.js */
class Game {
  constructor() {
    this.missed = 0;
    this.phrases = this.createPhrases();
    this.activePhrase = 'null';
  }

  /**
   * Creates phrases for use in game
   * @return {array} An array of phrases that could be used in the game
   */
  createPhrases() {
    return [
      new Phrase('Hello World'),
      new Phrase('Life is beatiful'),
      new Phrase('Home sweet home'),
      new Phrase('Information is power'),
      new Phrase('Passcode is Mercury'),
    ];
  }
  /**
   * Selects random phrase from phrases property
   * @return {Object} Phrase object chosen to be used
   */
  getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[randomIndex];
  }

  /**
   * Begins game by selecting a random phrase and displaying it to user
   */
  startGame() {
    const overlay = document.querySelector('#overlay');
    overlay.style.display = 'none';

    this.activePhrase = this.getRandomPhrase();
    const gamePhrase = new Phrase(this.activePhrase.phrase);
    gamePhrase.addPhraseToDisplay();
  }

  /**
   * Handles onscreen keyboard button clicks
   * @param (HTMLButtonElement) button - The clicked button element
   */
  handleInteraction(button) {
    if (button.target.className == 'key') {
      const buttonValue = button.target.innerHTML;
      button.target.disabled = true;
      if (this.activePhrase.checkLetter(buttonValue)) {
        button.target.className = 'chosen';
        this.activePhrase.showMatchedLetter(buttonValue);
        if (this.checkForWin()) this.gameOver(true);
      } else {
        button.target.className = 'wrong';
        this.removeLife();
      }
      console.log(button.target);
    }
  }

  /**
   * Checks for winning move
   * @return (boolean) True if game has been won, false if game wasn't won
   */
  checkForWin() {
    const anyHideClassLi = document.querySelectorAll(`.hide`);
    return anyHideClassLi.length === 0;
  }

  /**
   * Increase the value of the missed property
   * Removes a life from the scoreboard
   * Checks if player has remaining lives and ends game if player is out
   */
  removeLife() {
    const triesImgs = document.querySelectorAll('#scoreboard img'); // 5
    if (this.missed < triesImgs.length - 1) {
      triesImgs[this.missed].src = 'images/lostHeart.png';
      this.missed++;
    } else this.gameOver(false);
  }

  /**
   * Display game over message
   * @param (boolean) gameWon - Whether or not the user won the game
   */
  gameOver(gameWon) {
    const overlayDiv = document.querySelector('#overlay');
    const messageH1 = overlayDiv.querySelector('#game-over-message');
    var message = '';
    var currentClass = '';

    console.log('Game Over');

    overlayDiv.style.display = '';
    if (gameWon) {
      message = 'You won the game!';
      currentClass = 'win';
    } else {
      message = 'You lost the game!';
      currentClass = 'lose';
    }

    messageH1.innerHTML = message;
    overlayDiv.className = currentClass;
  }

  /** Reset the game after Win / Lost state */
  resetGame() {
    const phraseUl = document.querySelector('#phrase ul');
    const qwertyKeys = document.querySelectorAll('#qwerty button');
    const triesImgs = document.querySelectorAll('#scoreboard img');

    phraseUl.innerHTML = '';
    qwertyKeys.forEach((key) => {
      key.className = 'key';
      key.disabled = false;
    });

    triesImgs.forEach((img) => {
      img.src = 'images/liveHeart.png';
    });
  }
}
