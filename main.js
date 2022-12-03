import { InputHandler } from './input.js';
import { Player } from './player.js';
import { knife } from './particles.js';
import { Background } from './background.js';

window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 600;
  canvas.height = 600;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 50;
      this.input = new InputHandler(this);
      this.player = new Player(this);
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
      this.knifes = [];
      this.kunaiTimer = 0;
      this.maxKunai = 4;
      this.kunaiInterval = 100;
      this.maxSpeed = 2;
      this.gameSpeed = 0;
      this.background = new Background(this);
    }
    update(deltatime) {
      this.background.update();
      this.player.update(this.input.keys, deltatime);

      //kunaiThrowing
      if (
        this.player.currentState == this.player.states[11] ||
        this.player.currentState == this.player.states[9]
      ) {
        if (this.input.keys.includes('d')) {
          if (this.kunaiTimer > this.kunaiInterval) {
            this.knifes.push(new knife(this));
            this.kunaiTimer = 0;
          } else {
            this.kunaiTimer += deltatime;
          }
        }
      }

      this.knifes.forEach((kunai, index) => {
        kunai.update();
        if (kunai.markedForDeletion) this.knifes.splice(index, 1);
      });
      if (this.knifes.length > this.maxKunai) {
        this.knifes = this.knifes.slice(0, this.maxKunai);
      }
    }

    draw(context) {
      context.clearRect(0, 0, this.width, this.height);
      this.background.draw(context);
      this.knifes.forEach((kunai) => {
        kunai.draw(context);
      });

      this.player.draw(context);
      //kunaithrowing
      // console.log(this.knifes);
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
