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
          e.key === 'd' ||
          e.key === 'Shift') &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key);
        console.log(this.keys);
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
        e.key === 'd' ||
        e.key === 'Shift'
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
