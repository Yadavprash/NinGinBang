const states = {
  STANDING: 0,
  RUNNING: 1,
  JUMPING: 2,
  ATTACKING: 3,
  CLIMBING: 4,
  DYING: 5,
  FLYING: 6,
  JUMPATTACKING: 7,
  SLIDING: 8,
  THROWING: 9,
  FALLING: 10,
  JUMPTHROWING: 11,
};

class State {
  constructor(state, game) {
    this.state = state;
    this.game = game;
  }
}
export class Standing extends State {
  constructor(game) {
    super('STANDING', game);
  }
  enter() {
    this.game.player.frameY = 4;
  }
  handleInput(input) {
    if (input.includes('ArrowRight')) {
      this.game.player.setStates(states.RUNNING);
    } else if (input.includes('w')) {
      this.game.player.setStates(states.ATTACKING);
    } else if (this.game.player.onGround() && input.includes('ArrowUp')) {
      this.game.player.setStates(states.JUMPING);
    }
  }
}
export class Running extends State {
  constructor(game) {
    super('RUNNING', game);
  }
  enter() {
    this.game.player.frameY = 8;
  }
  handleInput(input) {
    if (input.includes('ArrowDown')) {
      this.game.player.setStates(states.STANDING);
    } else if (this.game.player.onGround() && input.includes('ArrowUp')) {
      this.game.player.setStates(states.JUMPING);
    } else if (this.game.player.onGround() && input.includes('ArrowLeft')) {
      this.game.player.x--;
    } else if (this.game.player.onGround() && input.includes('ArrowRight')) {
      this.game.player.x++;
    } else if (input.includes('Shift')) {
      this.game.player.setStates(states.FLYING);
    } else if (input.includes('w')) {
      this.game.player.setStates(states.ATTACKING);
    } else if (input.includes('s')) {
      this.game.player.setStates(states.SLIDING);
    } else if (input.includes('d')) {
      this.game.player.setStates(states.THROWING);
    }
  }
}
export class Jumping extends State {
  constructor(game) {
    super('JUMPING', game);
  }
  enter() {
    this.game.player.frameY = 5;
    this.game.player.vy = 15;
  }
  handleInput(input) {
    if (this.game.player.onGround()) {
      this.game.player.setStates(states.RUNNING);
    } else if (input.includes('a')) {
      this.game.player.setStates(states.JUMPATTACKING);
    } else if (input.includes('d')) {
      this.game.player.setStates(states.JUMPTHROWING);
    }
  }
}
export class Attacking extends State {
  constructor(game) {
    super('ATTACKING', game);
  }
  enter() {
    this.game.player.frameY = 0;
  }
  handleInput(input) {
    if (this.game.player.stateEnd) this.game.player.setStates(states.RUNNING);
    else if (this.game.player.onGround() && input.includes('ArrowDown')) {
      this.game.player.setStates(states.STANDING);
    } else if (input.includes('ArrowRight')) {
      this.game.player.setStates(states.RUNNING);
    } else if (this.game.player.onGround() && input.includes('ArrowUp')) {
      this.game.player.setStates(states.JUMPING);
    } else if (input.includes('ArrowDown')) {
      this.game.player.setStates(states.STANDING);
    }
  }
}
export class Climbing extends State {
  constructor(game) {
    super('CLIMBING', game);
  }
  enter() {
    this.game.player.frameY = 1;
  }
  handleInput(input) {}
}
export class Dying extends State {
  constructor(game) {
    super('DYING', game);
  }
  enter() {
    this.game.player.frameY = 2;
  }
  handleInput(input) {}
}
export class Flying extends State {
  constructor(game) {
    super('FLYING', game);
  }
  enter() {
    this.game.player.frameY = 3;
    this.game.player.vy = 5;
  }
  handleInput(input) {
    if (this.game.player.onGround()) this.game.player.setStates(states.RUNNING);
  }
}
export class JumpAttacking extends State {
  constructor(game) {
    super('JUMPATTACKING', game);
  }
  enter() {
    this.game.player.frameY = 6;
  }
  handleInput(input) {
    if (this.game.player.stateEnd) this.game.player.setStates(states.FALLING);
  }
}
export class Sliding extends State {
  constructor(game) {
    super('SLIDING', game);
  }
  enter() {
    this.game.player.frameY = 9;
  }
  handleInput(input) {
    if (this.game.player.stateEnd) this.game.player.setStates(states.RUNNING);
    else if (this.game.player.onGround() && input.includes('ArrowUp')) {
      this.game.player.setStates(states.JUMPING);
    }
  }
}
export class Throwing extends State {
  constructor(game) {
    super('THROWING', game);
  }
  enter() {
    this.game.player.frameY = 10;
  }
  handleInput(input) {
    if (this.game.player.stateEnd) this.game.player.setStates(states.RUNNING);
  }
}
export class Falling extends State {
  constructor(game) {
    super('FALLING', game);
  }
  enter() {
    this.game.player.frameY = 5;
    this.game.player.vy = 7;
  }
  handleInput(input) {
    if (this.game.player.onGround()) {
      this.game.player.setStates(states.RUNNING);
    }
  }
}
export class JumpThrowing extends State {
  constructor(game) {
    super('JUMPTHROWING', game);
  }
  enter() {
    this.game.player.frameY = 7;
  }
  handleInput(input) {
    if (this.game.player.stateEnd) this.game.player.setStates(states.FALLING);
  }
}
