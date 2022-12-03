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
