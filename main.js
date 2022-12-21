/**@type{HTMLCanvasElement}*/
import { InputHandler } from './input.js';
import { Player } from './player.js';
import { Clouds_1, Clouds_2, Clouds_3, knife, Krail } from './particles.js';
import { Background } from './background.js';
import { BatEnemy, Skeleton, DollEnemy, EggEnemy } from './enemies.js';
import { Trail } from './particles.js';
import { UI } from './UI.js';

window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 600;
  canvas.height = 600;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.particles = [];
      this.fires = [];
      this.enemies = [];
      this.knifes = [];
      this.clouds = [];
      this.groundMargin = 50;
      this.input = new InputHandler(this);
      this.player = new Player(this);
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
      this.kunaiTimer = 0;
      this.enemyTimer = 0;
      this.cloudTimer = 0;
      this.enemyInterval = 3000;
      this.kunaiInterval = 100;
      this.cloudInterval = 2000;
      this.maxFire = 2;
      this.maxEnemies = 15;
      this.maxKunai = 4;
      this.maxClouds = 12;
      this.maxSpeed = 4;
      this.maxParticles = 400;
      this.gameSpeed = 0;
      this.background = new Background(this);
      this.debug = false;
      this.dollFlag = true;

      //GameStuff
      this.UI = new UI(this);
      this.gameOver = false;
      this.gameTime = 0;
      this.fontColour = 'black';
      this.score = 0;
    }
    restart() {
      this.gameOver = false;
      this.player.damageFlag = false;
      this.player.lifetime = 500;
      this.gameTime = 0;
      this.score = 0;
      animate(0);
    }
    update(deltatime) {
      this.background.update(deltatime);
      this.player.update(this.input.keys, deltatime);
      this.gameTime += deltatime;
      // console.log(this.gameTime);

      //Enemies Handled here
      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltatime;
      }
      this.enemies.forEach((enemy, index) => {
        enemy.update(deltatime);
        // console.log(this.enemies);
        if (enemy.markedForDeletion) this.enemies.splice(index, 1);
      });
      if (this.enemies.length > this.maxEnemies) {
        this.enemies = this.enemies.slice(0, this.maxEnemies);
      }

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
        this.particles.push(new Krail(this, kunai.x, kunai.y));
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
        cloud.update(deltatime);
        if (cloud.markedForDeletion) this.clouds.splice(index, 1);
      });
      if (this.clouds.length > this.maxClouds) {
        this.clouds = this.clouds.slice(0, this.maxClouds);
      }
      // console.log(this.clouds);

      //Handle Particles
      if (this.gameSpeed > 0) {
        this.particles.push(new Trail(this, this.player.x, this.player.y));
        // console.log(this.particles);
      }
      this.particles.forEach((particle, index) => {
        particle.update();
        if (particle.markedForDeletion) this.particles.splice(index, 1);
      });
      if (this.particles.length > this.maxParticles) {
        this.particles = this.particles.slice(0, this.maxParticles);
      }

      //Handle hits
      this.fires.forEach((fire, index) => {
        fire.update();
        if (fire.markedForDeletion) this.fires.splice(index, 1);
      });
      if (this.fires.length > this.maxFire) {
        this.fires = this.fires.slice(0, this.maxFire);
      }

      //UI
      this.UI.update();
    }

    draw(context) {
      context.strokeStyle = 'red';
      context.clearRect(0, 0, this.width, this.height);
      this.background.draw(context);
      this.knifes.forEach((kunai) => {
        kunai.draw(context);
      });
      this.particles.forEach((particle, index) => {
        particle.draw(context);
      });
      this.player.draw(context);
      this.fires.forEach((fire, index) => {
        fire.draw(context);
      });
      //Drawing Clouds
      this.clouds.forEach((cloud, index) => {
        cloud.draw(context);
      });

      //UI
      this.UI.draw(context);
      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });
    }
    addEnemy() {
      if (this.gameSpeed > 0 && Math.random() < 0.5)
        this.enemies.push(new Skeleton(this));
      else this.enemies.push(new EggEnemy(this));

      if (Math.random() > 0.5) {
        for (let i = 0; i < Math.floor(Math.random() * 6); i++) {
          this.enemies.push(new BatEnemy(this));
        }
      }

      if (
        this.dollFlag &&
        this.gameSpeed > 0 &&
        Math.floor(Math.random() * 7) === 5
      ) {
        this.enemies.push(new DollEnemy(this));
        this.dollFlag = false;
      }
    }
  }
  const game = new Game(canvas.width, canvas.height);
  const slider = document.getElementById('slider');
  slider.value = game.maxSpeed;
  showGameSpeed.innerHTML = game.maxSpeed;
  slider.addEventListener('change', (e) => {
    game.maxSpeed = e.target.value;
    showGameSpeed.innerHTML = e.target.value;
  });

  let lastTime = 0;
  function animate(timestamp) {
    const deltatime = timestamp - lastTime;
    lastTime = timestamp;
    game.update(deltatime);
    game.draw(ctx);
    if (!game.gameOver) requestAnimationFrame(animate);
  }

  animate(0);
});
