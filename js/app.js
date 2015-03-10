// Enemies our player must avoid
var Enemy = function(row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // sets the starting location of the enemy
    this.x = -101;
    this.y = row * 83 - 20;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += speed * dt;

    // if the enemy reaches the end, a new bug should be created
    if (this.x > 505) {
        allEnemies.shift();
        allEnemies.push(new Enemy(Math.floor(Math.random() * 4 + 1)));
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // player image
    this.sprite = 'images/char-boy.png';

    //player starting location
    this.x = 202;
    this.y = 406;
}

// Keeps the player in-bounds
Player.prototype.update = function() {
    if (this.x < 0) {
        this.x = 0;
    }  else if (this.x > 404) {
        this.x = 404;
    } else if (this.y > 406) {
        this.y = 406;
    } else if (this.y < -9) {
        this.y = -9;
    }
}

// render the image of the player in the correct position
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(motion) {
    if (motion === 'left') {
        this.x -= 101;
    } else if (motion === 'right') {
        this.x += 101;
    } else if (motion === 'up') {
        this.y -= 83;
    } else if (motion === 'down') {
        this.y += 83;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(Math.floor(Math.random() * 4 + 1))];
var player = new Player();
var speed = 50;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

    // creates a new enemy each time the key is pushed -- The more
    // often you move, the more difficult the game gets.
    allEnemies.push(new Enemy(Math.floor(Math.random() * 4 + 1)));

    // increases the speed of enemies each time the key is pushed
    speed += 5;
});
