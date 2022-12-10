import { InputHandler } from './input.js';
import { Player } from './player.js';
import { Clouds_1, Clouds_2, Clouds_3, knife } from './particles.js';
import { Background } from './background.js';
import { BatEnemy, Skeleton, DollEnemy, EggEnemy } from './enemies.js';

window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 600;
  canvas.height = 600;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.dollFlag = true;
      this.groundMargin = 50;
      this.input = new InputHandler(this);
      this.player = new Player(this);
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
      this.knifes = [];
      this.clouds = [];
      this.enemies = [];
      this.kunaiTimer = 0;
      this.enemyTimer = 0;
      this.cloudTimer = 0;
      this.enemyInterval = 1000;
      this.kunaiInterval = 100;
      this.cloudInterval = 2000;
      this.maxKunai = 4;
      this.maxClouds = 12;
      this.maxSpeed = 2;
      this.gameSpeed = 0;
      this.background = new Background(this);
    }
    update(deltatime) {
      this.background.update();
      this.player.update(this.input.keys, deltatime);

      //Enemies Handled here
      if (this.enemyTimer > this.enemyInterval) {
        this.dollFlag = true;
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltatime;
      }
      this.enemies.forEach((enemy, index) => {
        enemy.update();
        if (enemy.markedForDeletion) this.enemies.splice(enemy, index);
      });

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

      //Clouds
      if (this.cloudTimer > this.cloudInterval) {
        this.clouds.push(new Clouds_1(this));
        this.clouds.push(new Clouds_2(this));
        this.clouds.push(new Clouds_3(this));
        this.cloudTimer = 0;
      } else {
        this.cloudTimer += deltatime;
      }
      this.clouds.forEach((cloud, index) => {
        cloud.update();
        if (cloud.markedForDeletion) this.clouds.splice(index, 1);
      });
      if (this.clouds.length > this.maxClouds) {
        this.clouds = this.clouds.slice(0, this.maxClouds);
      }
      console.log(this.clouds);
    }

    draw(context) {
      context.clearRect(0, 0, this.width, this.height);
      this.background.draw(context);
      this.knifes.forEach((kunai) => {
        kunai.draw(context);
      });

      this.player.draw(context);
      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });
      //Drawing Clouds
      this.clouds.forEach((cloud, index) => {
        cloud.draw(context);
      });
    }
    addEnemy() {
      if (this.gameSpeed > 0 && Math.random() < 0.5)
        this.enemies.push(new Skeleton(this));

      if (this.gameSpeed > 0 && Math.random() > 0.5)
        this.enemies.push(new EggEnemy(this));

      if (this.gameSpeed > 0 && Math.random() > 0.5)
        this.enemies.push(new BatEnemy(this));

      // if (
      //   this.gameSpeed > 0 &&
      //   Math.floor(Math.random() * 10) === 7
      //   // this.dollFlag
      // )
      //   this.enemies.push(new DollEnemy(this));

      console.log(this.enemies);
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
