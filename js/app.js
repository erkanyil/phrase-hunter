/*OOP Game App
 * app.js */

const logPhrase = (phrase) => {
  console.log(`Phrase - phrase: `, phrase.phrase);
};

var game;

/* Reset | Starts the game with the Start Game button */
document.querySelector('#btn__reset').addEventListener('click', () => {
  game = new Game();
  game.resetGame();
  game.startGame();
});

/* On screen keyboard keys are checked whether it is in the phrase. */
document
  .querySelector('#qwerty')
  .addEventListener('click', (button) => game.handleInteraction(button));
