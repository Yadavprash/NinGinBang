# NINGINBANG

#### Video Demo: <URL HERE>

#### Description:

Side-scroller Fast-Paced Action Game with Javascript!

> "Those Who Forgive Themselves And Are Able To Accept Their True Nature... Those Are The Strong Ones!" - Itachi

---

##### Objective:

1. To make my first Game after learning the basics of javascript. 2. Submit it as the final project of cs50x.

##### Idea:

I love how ninjas fight. Wanted to make my own game with a ninja character moving through a forest cutting down monsters along the way. Also inspired by watching anime like naruto.NinGinBang is my first game, you will see me creating something awesome in the coming time.

##### GameSetting:

The game is set in medieval times. A ninja is moving throw a forest from one town to another, and on his way, he encounters many enemies, can he overcome these obstacles and reach the place he is needed? He takes very few stops and continues to run. Shinobi to the very core.

#### Tech-stack used: HTML, CSS, javascript.

The HTML canvas is one of the best ways to create animation on websites, and awesome games can be made on it. I learned JavaScript game dev from freecodecamp lectures
of FranksLaboratory.

---

#### MAKING:

###### 1._index.html:_

This is the file that contains all homepage Html and all image tags linking the respective images in assets.
There is a canvas element in the body tag, on which the whole animation is made is here.
Then lastly the scripts with the module linking the _main.js_ are here and the _styles.css_.

###### 2._styles.css_:

In this file, all the images are given and displayed as hidden to prevent them from appearing on the homepage and appear only when needed.
Mostly the id attribute was used for the Html element. This file also contains the CSS for the HTML Canvas.

###### 3._background.js_:

This file handles the background layers. It has two classes the **Background** class which handles all the background layers and the **Layer** class. The _backgroundLayers_ array stores all the layers. The layer class has a constructor update and draw method, which when called draws full background.
Each layer is given a different speed to make a parallax-like effect making the background look more alive.

###### 4._enemies.js_:

This file contains the main class **Enemy** and four subclasses **Skeleton**,**EggEnemy**,**DollEnemy**, and **BatEnemy** which extend into the main Enemy class.
The main enemy class has a constructor method that takes in _game_ as an argument. The constructor has frames, fps, frame timer, frame Interval, etc variables.
The update method updates the frames by one every time making motion from the sprite sheets of enemies.
**"RectangularBoxCollisionDetection"** was used for sword collision with enemies.
The four other class that extends in Enemy all has a constructor and an update method. The constructor of each has all the variables such as width, lives, sound, position X and Y, max frame, and image which uses the method document.getElementById to get the required enemy sprite sheet image.
The update method in each call _super. update_ from the main Enemy class and updates the position of each enemy, playing the enemy's sound, and marks the enemies for deletion when they leave the canvas or are killed by the player.

###### 5._input.js_:

This file contains the class **InputHandler**.
The constructor takes in the game as parameter._this.keys_ in an array that stores the keys input from the keyboard.
The windows.addEventListener listens for the event key down and the listener arrow function **(e)=>** checks if the key pressed was the few specific keys such as _ArrowUp, ArrowDown, ArrowLeft, ArrowRight, w, a, s, d_ and pushes them in the keys array, if they are not already present in it.
Addition checks for _y, Enter_ keys for debugging, and restart functionality is checked.
Similarly, the window.addEventListener for _keyup_ event, executes a function to check for the keys and deletes the from the _keys_ array.
This file also contains the **restartGame()** function which is triggered after the player dies and _Enter_ is pressed. This function resets the various game parameters such as score to restart the game.

###### 6._main.js_:

The main scripts of the game are where all the other connections and animations are made.
The game makes use of an array data structure for storing the objects such as enemies, particles, fires, knives, clouds, and dust.
forEach method is called on each of these arrays and they are drawn on canvas, they are updated and new objects are pushed and removed from them as required.
The animate function use **requestAnimationFrame** to callback itself and game.update and game.draw is used to draw animation in each function call.

###### 7._particles.js_:

This file contains the **Knife** class which handles the kunai knives thrown by the player. The working of it is similar to above mention Enemy class. The kunai is marked for deletion once it hit the enemies.
Secondly, the **Dust** class handles the aftereffect of enemy death. A dust cloud is animated at the place where the enemies die.
Thirdly, the **Clouds** class draws clouds over the canvas. It has three subclasses that animate three different types of cloud simultaneously but moving at different speeds at different heights.
Lastly, the **Particles** class draws particles such as player trails, and kunai knife trails.
The files also contain another class **Fire** which draws a fireball throw out of dollEnemy's mouth.

###### 8._player.js_:

The **Player** class holds the player's info and draws and updates the player.
It imports various player states and uses them on the player sprite to perform different movements.

###### 9._playerStates.js_:

This file handles the player states which include:

- STANDING
- RUNNING
- JUMPING
- ATTACKING
- CLIMBING
- DYING
- FLYING
- JUMPATTACKING
- SLIDING
- THROWING
- FALLING
- JUMPTHROWING
  It contains the **State** class which has various subclasses namely all the above-mentioned states' classes. These have a
  **constructor** with parameter state and game.
  **enter()** This method sets the frameY of the player sprite sheet to that specific state action.
  **handleInput()** This method is used to transition from one state to another.

###### 10._UI.js_:

The UI drawn on top of the canvas is handled here.
The score, timer, HP, and death screen message all is handled by **UI** Class

---

## The Actual Game

### EnemyTypes

##### Skeleton

It just stays on the ground. It will attack when you are in close proximity
It can only with killed by the NinjaSword.
Jumping over it is another safe option.

##### EggEnemy

It is a ground enemy. A toxic plant that attacks with its jaws and can damage the player.
It can be killed by either by single sword slash, or two kunai knives.

##### batEnemy

These are flying creature which makes lots of annoying noise.
They suck on the player's blood when in close proximity.
They can be killed either by a single sword slash or one kunai knife.

##### dollEnemy

It is a boss-level creature.
It throws a fireball which hurts the player severely.
It can only be killed by four strikes of kunai knives.
It offers the player some specific amount of HP.
This creature is similar to the ghast of Minecraft.

### Controls

**Note**: Make sure the capslock is off while playing the game (--).
I will add case-insensitive controls later(Apologies for the inconvenience).
| Keys | Action |
|-----------|-----------|
| w | fly |
| a | attack |
| s | slide |
| d | throwKnife|
| ArrowRight| forward |
| ArrowLeft | backward |
| ArrowUp | jump |
| ArrowDown | stand |

**NOTE:** To start the game use the live server extension on vscode(or anything
equivalent) and open the **index.html** on liveserver.
If live server isn't working try adding **C:\Windows\System32** in your environmental variable settings in the control panel.Hope it helps!

### Score

The score increases when you kill the enemies.
|Enemy killed| Points Scored |
|--------------|-------------|
|sword attack|20|
|batEnemy using kunai|5|
|eggEnemy using kunai|10|
|dollEnemy using kunai|100|

You can also watch the timer for how long you survived.
Press Enter to restart the game when you die.

---

## References

#### Tutorials/Assets

![Javascript Game Dev by FranksLaboratory](https://www.youtube.com/watch?v=CY0HE277IBM&list=PLYElE_rzEw_uryBrrzu2E626MY4zoXvx2)
![Sprite Database](https://spritedatabase.net/)
![2D game assets](https://bevouliin.com/)
![OpenGameArt.org](https://opengameart.org/)

#### Important Articles

![How to push your first project on Github](https://hackernoon.com/step-by-step-guide-to-push-your-first-project-on-github-fec1dce574f)

---

### Thanks for reading :) This was NinGinBang!
