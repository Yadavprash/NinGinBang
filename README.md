# NINGINBANG

#### Video Demo: <URL HERE>

#### Description:

Side-scroller Fast-Paced Action Game with Javascript!

##### Objective:

1. To make my first Game after learning basics of javascript. 2. Submit it as the final project of cs50x.

##### Idea:

I love how ninjas fight.Wanted to make my own game with a ninja character moving through a forest cutting down monster along the way.Also inspired by watching anime like naruto.NinGinBang is my first game, you will definitely see me creating something awesome in coming time.

##### GameSetting:

The game is set in the medieval times.A ninja is moving throw a forest from one town to another, on his way he encounter many enemies, can he overcome these obstacle and reach the place he is needed.He takes a very few stop and continues to run.Shinobi to the very core.

#### Tech-stack used : html , css , javascript.

The HTMLcanvas is one the best way to create animation on websites, and awesome games can be made on it.I learnt javaScript game dev from freecodecamp lectures
of FranksLaboratory.

---

#### MAKING:

1._index.html:_ This is the file that contains all homepage html and all img tags linking the respective images in assets.
There is a canvas element in the body tag, on which the whole animation is made is here.
Then lastly the scripts while type module linking the _main.js_ is here and the _styles.css_.

2.\_styles.css :\_In this file all the images are give display as hidden so as to prevent them from appearing on the homepage and appear only when needed.
Mostly the id attribute was used for the html element.This files also contains the css for the HTMLCanvas.

3.*background.js:*This files handles the background layers.It has two classes the **Background** class which handles the all the background layers and the **Layer** class.The _backgroundLayers_ array stores all the layers.The layer class has contructor update and draw method, which when called draws full background.
Each layers in given different speed to make a parallax like effect making the background look more alive.

4.*enemies.js:*This file contains a main class,**Enemy** and four subclasses **Skeleton**,**EggEnemy**,DollEnemy** and **BatEnemy** which extends in the main Enemy class.
The main enemy class has contructor method which take in _game_ as a argument.The contructor has frameX,frameY,fps,frameTimer,frameInterval etc variables.
The update method update the frameX by one everytime making motion from the spirite sheets of enemies.
**RectangularBoxCollisionDetection\*\* was used for sword collision with ememies.
The four other class that extend in Enemy all has a constructor and an update method.The constructor of each has all the variable such as width,lives,sound,postion X and Y, maxFrame,and image which uses method document.getElementById to get the required enemy spiritesheet image.
The update method in each calls _super.update_ from main Enemy class and updaetes the position of each enemy,play enemy sounds,and marks the enemies for deletion when they leave the canvas or are killed by the player.

5.*input.js:*This file contains the class **InputHandler**.
The coontructor takes in game as parameter._this.keys_ in an array which stores the keys input from keyboard.
The windows.addEventListener listens for the event keydown and the listener arrow function **(e)=>** checksif the keypressed was the few specific keys such as _ArrowUp,ArrowDown,ArrowLeft,ArrowRight,w,a,s,d_ and pushes them in the keys array ,if they are not already present in it.
Addition checks for _y,Enter_ keys for debug and restart functionality is checked.
Similarly the window.addEventListener for _keyup_ event ,executes a function to check for the keys and deletes the from the _keys_ array.
This files also containst he **restartGame** function while is triggered after the player dies and _Enter_ is pressed.This function resets the various game parameters such as score to restart the game .

6.** 7.** 8.\*\* 9.\*\* 10.\*\*
