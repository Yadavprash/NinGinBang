import { knife } from './particles.js';
import {
  Attacking,
  Climbing,
  Dying,
  Falling,
  Flying,
  JumpAttacking,
  Jumping,
  JumpThrowing,
  Running,
  Sliding,
  Standing,
  Throwing,
} from './playerStates.js';

export class Player {
  constructor(game) {
    this.game = game;
    this.ninjaBoy = document.getElementById('ninjaBoy');
    this.playerWidth = 134;
    this.playerHeight = 124;
    this.x = 30;
    this.y = this.game.height - this.playerHeight - this.game.groundMargin;
    this.frameX = 0;
    this.frameY = 1;
    this.frameTimer = 0;
    this.fps = 45;
    this.frameInterval = 1000 / this.fps;
    this.gravity = 0.3;
    this.vy = 0;
    this.maxFrame = 9;
    this.stateEnd = false;
    this.updraft = 0.03;
    this.stateTimer = 0;
    this.maxStateTime = 1000;
    this.states = [
      new Standing(this.game),
      new Running(this.game),
      new Jumping(this.game),
      new Attacking(this.game),
      new Climbing(this.game),
      new Dying(this.game),
      new Flying(this.game),
      new JumpAttacking(this.game),
      new Sliding(this.game),
      new Throwing(this.game),
      new Falling(this.game),
      new JumpThrowing(this.game),
    ];
  }
  update(input, deltatime) {
    // console.log(this.game.groundMargin);
    this.currentState.handleInput(input);
    //Framing according to deltatime
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX >= this.maxFrame) {
        this.frameX = 0;
      }
      this.frameX++;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltatime;
      this.stateEnd = false;
    }
    //State timer condition
    if (this.stateTimer > this.maxStateTime) {
      if (
        this.currentState == this.states[3] ||
        this.currentState == this.states[8] ||
        this.currentState == this.states[7] ||
        this.currentState == this.states[9] ||
        this.currentState == this.states[11]
      )
        this.stateEnd = true;
      this.stateTimer = 0;
    } else {
      this.stateTimer += deltatime;
      this.stateEnd = false;
    }

    //Boundary check conditions
    if (this.y >= this.game.height - this.playerHeight)
      this.y = this.game.height - this.playerHeight;
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.playerWidth)
      this.x = this.game.width - this.playerWidth;

    //Jumping mechanism
    if (this.currentState == this.states[2]) {
      this.y -= this.vy;
      if (!this.onGround()) {
        this.vy -= this.gravity;
      }
    }
    //flying mechanism
    if (this.currentState == this.states[6]) {
      this.y -= this.vy;
      if (!this.onGround()) {
        this.vy -= this.updraft;
      }
    }
    //Landing mechanism
    if (this.currentState == this.states[10]) {
      this.y += this.vy;
      if (!this.onGround()) {
        this.vy -= this.updraft;
      }
    }
  }
  draw(context) {
    context.drawImage(
      this.ninjaBoy,
      this.frameX * this.playerWidth,
      this.frameY * this.playerHeight,
      this.playerWidth,
      this.playerHeight,
      this.x,
      this.y,
      this.playerWidth,
      this.playerHeight
    );
  }
  onGround() {
    return (
      this.y >= this.game.height - this.playerHeight - this.game.groundMargin
    );
  }
  setStates(state, speed) {
    this.currentState = this.states[state];
    this.game.gameSpeed = this.game.maxSpeed * speed;
    this.currentState.enter();
  }
  checkCollision() {}
}
