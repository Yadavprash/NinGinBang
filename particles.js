export class knife {
  constructor(game) {
    this.width = 40;
    this.height = 8;
    this.game = game;
    this.kunaiSpeed = 3.5;
    this.image = document.getElementById('kunai');
    this.x = this.game.player.x + this.game.player.playerWidth / 2;
    this.y = this.game.player.y + this.game.player.playerHeight / 2.5;
    this.markedForDeletion = false;
  }
  update() {
    this.x += this.kunaiSpeed;
    if (this.x > this.game.width) this.markedForDeletion = true;
  }
  draw(context) {
    context.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
class Clouds {
  constructor(game) {
    this.game = game;
    this.x = this.game.width;
    this.y = 0;
    this.width = 219;
    this.height = 219;
    this.markedForDeletion = false;
  }
  update() {
    this.x -= this.speed;
    if (this.x < -this.width) this.markedForDeletion = true;
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
export class Clouds_1 extends Clouds {
  constructor(game) {
    super(game);
    this.image = document.getElementById('cloud_1');
    this.y = -this.width / 2;
    this.speed = 0.4;
  }
}
export class Clouds_2 extends Clouds {
  constructor(game) {
    super(game);
    this.image = document.getElementById('cloud_2');
    this.speed = 0.7;
    this.y = -this.width / 6;
  }
}
export class Clouds_3 extends Clouds {
  constructor(game) {
    super(game);
    this.image = document.getElementById('cloud_3');
    this.speed = 0.7;
    this.y = -this.width / 3;
  }
}
