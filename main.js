import { InputHandler } from './input.js';
import { Player } from './player.js';

window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 600;
  canvas.height = 600;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
    }
    update(deltatime) {
      this.player.update(this.input.keys, deltatime);
    }

    draw(context) {
      context.clearRect(0, 0, this.width, this.height);
      this.player.draw(context);
    }
  }
  const game = new Game(canvas.width, canvas.height);

  let lastTime = 0;
  function animate(timestamp) {
    const deltatime = timestamp - lastTime;
    lastTime = timestamp;
    game.update(deltatime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate(0);
});
