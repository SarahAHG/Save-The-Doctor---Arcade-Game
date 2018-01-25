/* Enemy */
// Enemies player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The (image/sprite) for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/dalek.png";
};

// Update the enemy's position, required method for the game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for all computers.
    this.x += this.speed * dt;
    //make enemies in loop 
    if (this.x >= 505) {
        this.x = 0;
    }
    checkCollision(this); //in case a collision happens between player Vs enemy
};

// Draw the enemy on the screen, required method for the game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* Player */
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = "images/TARDIS.png";
};

Player.prototype.update = function() {

};

// draw player on screen & display score
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayScoreAndLevel(score, gameLevel);
};
// speed of the (arrow keys/input)
Player.prototype.handleInput = function(input) {
    if (input == "left") {
        player.x -= player.speed;
    }
    if (input == "up") {
        player.y -= player.speed - 25;
    }
    if (input == "right") {
        player.x += player.speed;
    }
    if (input == "down") {
        player.y += player.speed - 25;
    }
    console.log("Input is: " + input);
};

// Function to display player's score
var displayScoreAndLevel = function(theScore, theLevel) {
    var canvas = document.getElementsByTagName("canvas");
    var canvasTag = canvas[0];

    // show user score and level 
    scoreAndLevel.innerHTML = "  |  " + "Score: " + theScore +
        "  |  " + "Level: " + theLevel + "  |  ";
    document.body.insertBefore(scoreAndLevel, canvasTag[0]);
};

/* Enemies Vs Player (if Collision happens) */
var checkCollision = function(theEnemy) {
    // check for collision between enemy and player
    if (player.y + 150 >= theEnemy.y + 90 &&
        player.x + 28 <= theEnemy.x + 90 &&
        player.y + 80 <= theEnemy.y + 137 &&
        player.x + 78 >= theEnemy.x + 10) {
        console.log("collided");
        //alert("You just got Exterminated!");
        player.x = 202.5;
        player.y = 380;
    }

    // check if player reach top of canvas what happens 
    // if wins increase points  
    if (player.y + 63 <= 0) {
        player.x = 202.5;
        player.y = 380;
        console.log("Awesome, you have made it!");
        //alert("Awesome, you have made it!")

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);

        score += 1;
        gameLevel += 1;
        console.log('Current score: ' + score + ', Current level: ' + gameLevel);
        Difficulty(score);

    }

    // if player go off canvas, make sure it stays on canvas
    // player canvas boundaries
    if (player.y > 380) {
        player.y = 380;
    }
    if (player.x > 402.5) {
        player.x = 402.5;
    }
    if (player.x < 2.5) {
        player.x = 2.5;
    }
};

// Increase number of enemies on screen based on player's score
var Difficulty = function(enemiesNum) {
    // remove all previous enemies on canvas
    allEnemies.length = 0;

    // load new set of enemies
    for (var i = 0; i <= enemiesNum; i++) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

        allEnemies.push(enemy);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Enemy randomly placed vertically within section of canvas
// Declare new score and gameLevel variables to store score and level
var allEnemies = [];
var player = new Player(202.5, 380, 50);
var score = 0;
var gameLevel = 1;
var scoreAndLevel = document.createElement("div");
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

allEnemies.push(enemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keydown", function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
