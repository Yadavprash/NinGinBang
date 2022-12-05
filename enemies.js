class Enemy {
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.markedForDeletion = false;
  }
  update(deltatime) {
    if (this.x < 0) this.markedForDeletion = true;
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
