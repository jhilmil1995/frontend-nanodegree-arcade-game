// Enemies our player must avoid
var Enemy = function(posx, poxy) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = getRandY();
    this.dx = getRandDX();
    this.edgeX = 101;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

function getRandY() {
    return Math.floor(Math.random() * 4) * 83 + 40;
}
function getRandDX() {
    return Math.floor(Math.random() * 500);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.dx * dt;

    if (this.x > this.edgeX * 5) {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
    this.x = 0;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.dx = 101;
    this.dy = 83;
    this.x = this.dx * 2;
    this.y = this.dy * 5 - 20;
}

Player.prototype.update = function(dt) {
    if (this.y === -20) {
        alert('you won');
        createBugs();
        this.reset();
    }
    allEnemies.forEach(enemy => {
        if (enemy.y - 25  < this.y && this.y < enemy.y + 25 &&
            enemy.x - 20  < this.x && this.x < enemy.x + 20) {
            alert('you lost');
            this.reset();
        }
    })
}
// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress === 'left' && this.x > 0) {
        this.x -= this.dx;
    } else if (keyPress === 'up' && this.y > 0) {
        this.y -= this.dy;
    } else if (keyPress === 'right' && this.x < this.dx * 4) {
        this.x += this.dx;
    } else if (keyPress === 'down' && this.y < this.dy * 4) {
        this.y += this.dy;
    }
}

Player.prototype.reset = function() {
    this.x = this.dx * 2;
    this.y = this.dy * 5 - 20;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();
var allEnemies;
createBugs();

function createBugs() {
    allEnemies = [];
    var numBugs = Math.floor(Math.random() * 5) + 1;
    for (var i = 0; i < numBugs; i++) {
        var bug = new Enemy();
        allEnemies.push(bug);
    }
}

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
});
