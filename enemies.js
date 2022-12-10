class Enemy {
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.markedForDeletion = false;
  }
  update(deltatime) {
    if (this.x < -this.width) this.markedForDeletion = true;
  }
  draw(context) {
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
    this.height = 111;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.maxFrame = 38;
    this.image = document.getElementById('eggEnemy');
  }
  update(deltatime) {
    super.update(deltatime);
    this.x -= this.game.gameSpeed;
  }
}
export class DollEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.width = 110;
    this.height = 150;
    this.x = this.game.width;
    this.y = 0;
    this.maxFrame = 30;
    this.vx = 2;
    this.image = document.getElementById('dollEnemy');
  }
  update(deltatime) {
    super.update(deltatime);
    this.x -= this.vx;
    if (this.x < 0 || this.x > this.game.width) this.vx *= -1;
    this.game.dollFlag = false;
  }
}
export class BatEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.width = 77;
    this.height = 70;
    this.x = this.game.width;
    this.y = this.game.height / 2;
    this.maxFrame = 10;
    this.image = document.getElementById('batEnemy');
    this.angle = 0;
  }
  update(deltatime) {
    super.update(deltatime);
    this.x -= this.game.gameSpeed;
  }
}
