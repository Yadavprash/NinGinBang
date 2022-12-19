import { Fire } from './particles.js';

class Enemy {
  constructor(game) {
    this.game = game;
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 45;
    this.x = this.width;
    this.markedForDeletion = false;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
  }
  update(deltatime) {
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltatime;
    }
    if (this.x < -this.width) this.markedForDeletion = true;

    // console.log(this.x);
    //Sword Collision
    if (
      this.game.input.keys.includes('a') &&
      this.game.player.x >= this.x - 100 &&
      this.game.player.x <= this.x + this.width &&
      this.y >= this.game.player.y &&
      this.y <= this.game.player.y + this.game.player.playerHeight
    ) {
      this.markedForDeletion = true;
    }
  }
  draw(context) {
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export class Skeleton extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.width = 84.529;
    this.height = 153 / 2;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.maxFrame = 16;
    this.image = document.getElementById('skeletonIdle');
  }
  update(deltatime) {
    super.update(deltatime);
    this.x -= this.game.gameSpeed;
  }
}
export class EggEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.width = 110.589;
    this.lives = 2;
    this.height = 111;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.maxFrame = 38;
    this.image = document.getElementById('eggEnemy');
  }
  update(deltatime) {
    super.update(deltatime);
    this.x -= this.game.gameSpeed;

    //kunai collision

    this.game.knifes.forEach((kunai) => {
      if (
        kunai.x > this.x &&
        kunai.x < this.x + this.width &&
        kunai.y > this.y &&
        kunai.y < this.y + this.height
      ) {
        kunai.markedForDeletion = true;
        this.lives--;
      }
      if (this.lives == 0) this.markedForDeletion = true;
    });
  }
}
export class DollEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.lives = 4;
    this.width = 110;
    this.height = 150;
    this.x = Math.random() * (this.game.width / 2);
    this.y = 0;
    this.yMax = this.height;
    this.xMax = this.width;
    this.maxFrame = 29;
    this.vx = Math.random() * 0.6 - 0.2;
    this.vy = 0.4;
    this.image = document.getElementById('dollEnemy');
  }
  update(deltatime) {
    super.update(deltatime);
    this.y += this.vy;
    this.x += this.vy;
    if (this.x > this.game.width + this.width) this.markedForDeletion = true;
    if (this.y > this.yMax || this.y < 0) this.vy *= -1;
    if (this.x > this.xMax || this.x < -this.xMax) this.vx *= -1;

    this.game.fires.push(
      new Fire(this.game, this.x + this.width / 6, this.y + this.height / 6)
    );
    this.game.knifes.forEach((kunai) => {
      if (
        kunai.x > this.x &&
        kunai.y > this.y + 10 &&
        kunai.y < this.y + this.height - 10
      ) {
        kunai.markedForDeletion = true;
        this.lives--;
      }
      if (this.lives == 0) this.markedForDeletion = true;
    });
  }
}
export class BatEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.width = 70.81;
    this.height = 70;
    this.x = Math.floor(Math.random() * 200) + this.game.width;
    this.y = this.game.height / 2 - this.height;
    this.maxFrame = 10;
    this.image = document.getElementById('batEnemy');
    this.angle = 0;
    this.angleSpeed = Math.random() * 0.2;
    this.curve = Math.random() * 2;
  }
  update(deltatime) {
    super.update(deltatime);
    this.x -= 2.5;
    this.y += this.curve * Math.sin(this.angle);
    this.angle += this.angleSpeed;

    this.game.knifes.forEach((kunai) => {
      if (
        kunai.x > this.x &&
        kunai.y > this.y + 10 &&
        kunai.y < this.y + this.height - 10
      ) {
        this.markedForDeletion = true;
        kunai.markedForDeletion = true;
      }
    });
  }
}
