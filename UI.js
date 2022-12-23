/**@type{HTMLCanvasElement}*/
export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 25;
    this.fontFamily = 'monospace';
    this.health = document.getElementById('health');
  }
  update() {
    this.health.value = this.game.player.lifetime;
  }
  draw(context) {
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColour = 'white';
    context.shadowBlur = 0;
    context.font = this.fontSize + 'px ' + this.fontFamily;
    context.textAlign = 'left';
    context.fillStyle = this.game.fontColour;

    //Score
    context.fillStyle = 'white';
    context.fillText('Score: ' + this.game.score, 20, 50);
    context.fillStyle = this.game.fontColour;
    context.fillText('Score: ' + this.game.score, 21, 52);

    //Timer
    context.fillStyle = 'white';
    context.fillText(
      'Time: ' + (this.game.gameTime * 0.001).toFixed(1),
      20,
      80
    );
    context.fillStyle = this.game.fontColour;
    context.fillText(
      'Time: ' + (this.game.gameTime * 0.001).toFixed(1),
      21,
      82
    );
    context.fillStyle = 'white';
    context.fillText('HP:', 20, 110);
    context.fillStyle = this.game.fontColour;
    context.fillText('HP:', 21, 112);
    context.restore();

    //gameOverMessage
    context.fillStyle = 'green';
    if (this.game.gameOver) {
      context.textAlign = 'center';
      context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
      context.fillText(
        'Ohh Yeah!',
        this.game.width * 0.5,
        this.game.height * 0.5 - 20
      );
      context.fillStyle = 'purple';
      context.fillText(
        'Ohh Yeah!',
        this.game.width * 0.5 + 1,
        this.game.height * 0.5 - 20 + 2
      );
      context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
      context.fillText(
        'Shinobi to the End, You were amazing out there!',
        this.game.width * 0.5,
        this.game.height * 0.5 + 20
      );
      context.fillStyle = 'red';
      context.font = this.fontSize * 0.6 + 'px ' + this.fontFamily;
      context.fillText(
        'BELEIVE THAT! Press ENTER to continue',
        this.game.width * 0.5,
        this.game.height * 0.5 + 60
      );
      context.restore();
    }
  }
}
