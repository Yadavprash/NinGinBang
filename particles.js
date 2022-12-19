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
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }
    context.strokeRect(this.x, this.y + 5, this.width - 5, this.height - 10);
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

class Particles {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.markedForDeletion = false;
  }
  update() {
    this.x -= this.speedX + this.game.gameSpeed * 1.5;
    this.y -= this.speedY;
    this.size *= 0.98;
    if (this.size < 0.5) this.markedForDeletion = true;
  }
}
export class Trail extends Particles {
  constructor(game, x, y) {
    super();
    this.game = game;
    this.size = Math.random() * 10 + 30;
    this.x = x + this.game.player.playerWidth / 2;
    this.y = y + this.game.player.playerHeight / 2;
    this.speedX = Math.random();
    this.speedY = Math.random();
    this.color = 'rgba(199,36,177,0.5)';
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.size, Math.PI * 0.65, Math.PI * 1.5);
    context.fillStyle = this.color;
    context.fill();
  }
}
export class Krail extends Particles {
  constructor(game, x, y) {
    super();
    this.game = game;
    this.size = Math.random() * 5 + 5;
    this.x = x;
    this.y = y + 5;
    this.speedX = Math.random();
    this.speedY = Math.random();
    this.color = 'rgba(210,39,48,0.5)';
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }
}
export class Fire {
  constructor(game, x, y) {
    this.game = game;
    this.image = document.getElementById('fire');
    this.width = 100;
    this.height = 90;
    this.size = Math.random() * 50 + 50;
    this.x = x;
    this.y = y;
    this.speedX = Math.random() * 1.5 - 0.5;
    this.speedY = 2.5;
    this.markedForDeletion = false;
    this.angle = 2;
    this.va = Math.random() * 0.2 + 0.1;
    this.rotate = 0;
  }
  update() {
    this.angle += this.va;
    this.x += this.speedX + Math.cos(this.angle * 5);
    this.y += this.speedY;
    if (this.y > this.game.width - this.game.groundMargin) {
      this.markedForDeletion = true;
    }
    // console.log(this.game.fires);

    //handle collision
    if (
      this.x > this.game.player.x &&
      this.x < this.game.player.x + this.game.player.playerWidth &&
      this.y > this.game.player.y &&
      this.y < this.game.player.y + this.game.player.playerHeight
    ) {
      this.game.player.damageFlag = true;
    }
  }
  draw(context) {
    context.save();
    context.translate(this.x + this.width / 2, this.y + this.height / 2);
    context.rotate(this.angle);
    context.drawImage(
      this.image,
      -this.size * 0.2,
      -this.size * 0.5,
      this.size,
      this.size
    );
    context.restore();
  }
}
