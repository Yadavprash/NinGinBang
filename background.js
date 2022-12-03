class Layer {
  constructor(game, width, height, speedModifier, image) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.image = image;
    this.x = 0;
    this.y = 0;
    this.imgx = 0;
    this.imgy = 0;
  }
  update() {
    if (this.x < -this.game.width) this.x = 0;
    else this.x -= this.game.gameSpeed * this.speedModifier;
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.imgx,
      this.imgy,
      this.width,
      this.height,
      this.x,
      this.y,
      this.game.width,
      this.game.height
    );
    context.drawImage(
      this.image,
      this.imgx,
      this.imgy,
      this.width,
      this.height,
      this.x + this.game.width,
      this.y,
      this.game.width,
      this.game.height
    );
  }
}
export class Background {
  constructor(game) {
    this.game = game;
    this.width = 464;
    this.height = 397;
    this.layerImage1 = document.getElementById('background_1');
    this.layerImage2 = document.getElementById('background_2');
    this.layerImage3 = document.getElementById('background_3');
    this.layerImage4 = document.getElementById('background_4');
    this.layerImage5 = document.getElementById('background_5');
    this.layerImage6 = document.getElementById('background_6');
    this.layerImage7 = document.getElementById('background_7');
    this.layerImage8 = document.getElementById('background_8');
    this.layerImage9 = document.getElementById('background_9');
    this.layerImage10 = document.getElementById('background_10');
    this.layerImage11 = document.getElementById('background_11');
    this.layerImage12 = document.getElementById('background_12');
    this.layer1 = new Layer(
      this.game,
      this.width,
      this.height,
      0,
      this.layerImage1
    );
    this.layer2 = new Layer(
      this.game,
      this.width,
      this.height,
      0.1,
      this.layerImage2
    );
    this.layer3 = new Layer(
      this.game,
      this.width,
      this.height,
      0.2,
      this.layerImage3
    );
    this.layer4 = new Layer(
      this.game,
      this.width,
      this.height,
      0.3,
      this.layerImage4
    );
    this.layer5 = new Layer(
      this.game,
      this.width,
      this.height,
      0.4,
      this.layerImage5
    );
    this.layer6 = new Layer(
      this.game,
      this.width,
      this.height,
      0.5,
      this.layerImage6
    );
    this.layer7 = new Layer(
      this.game,
      this.width,
      this.height,
      0.6,
      this.layerImage7
    );
    this.layer8 = new Layer(
      this.game,
      this.width,
      this.height,
      0.8,
      this.layerImage8
    );
    this.layer9 = new Layer(
      this.game,
      this.width,
      this.height,
      0.9,
      this.layerImage9
    );
    this.layer10 = new Layer(
      this.game,
      this.width,
      this.height,
      1,
      this.layerImage10
    );
    this.layer11 = new Layer(
      this.game,
      this.width,
      this.height,
      0.5,
      this.layerImage11
    );
    this.layer12 = new Layer(
      this.game,
      this.width,
      this.height,
      0.2,
      this.layerImage12
    );
    this.backgroundLayers = [
      this.layer1,
      this.layer2,
      this.layer3,
      this.layer4,
      this.layer5,
      this.layer6,
      this.layer7,
      this.layer8,
      this.layer9,
      this.layer10,
      this.layer11,
      this.layer12,
    ];
  }
  update() {
    this.backgroundLayers.forEach((layer) => {
      layer.update();
    });
  }
  draw(context) {
    this.backgroundLayers.forEach((layer) => {
      layer.draw(context);
    });
  }
}
