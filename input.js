export class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];
    window.addEventListener('keydown', (e) => {
      if (
        (e.key === 'ArrowDown' ||
          e.key === 'ArrowUp' ||
          e.key === 'ArrowLeft' ||
          e.key === 'ArrowRight' ||
          e.key === 'w' ||
          e.key === 'a' ||
          e.key === 's' ||
          e.key === 'd') &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key);
        // console.log(this.keys);
      } else if (e.key == 'y') this.game.debug = !this.game.debug;
      else if (e.key === 'Enter' && this.game.gameOver == true) {
        this.restartGame();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (
        e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'w' ||
        e.key === 'a' ||
        e.key === 's' ||
        e.key === 'd'
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
  restartGame() {
    this.game.enemies = [];
    this.game.particles = [];
    this.game.fires = [];
    this.game.knifes = [];
    this.game.dollFlag = true;
    this.game.restart();
  }
}
