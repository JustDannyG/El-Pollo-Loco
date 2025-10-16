class World {
    character;
    statusbar = new Statusbar();
    coinbar = new Coinbar();
    bottlebar = new Bottlebar();
    statusbarEndboss = new StatusbarEndboss();
    startscreen = new Startscreen();

    throwableObject = [];
    level = null;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    mouseClicked = false;
    throwPressed = false;

    intervalId = null;
    rafId = null;
    running = false;

    /**
     * Creates an instance of the World class.
     * @param {HTMLCanvasElement} canvas - The canvas element used for rendering the game.
     * @param {Object} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.running = true;
        this.startGame();
        this.draw();
    };

    /**
     * Initializes and starts the game when the canvas is clicked.
     * - Hides the "Play Again" button.
     * - Sets up a one-time click handler on the canvas to:
     *   - Mark the mouse as clicked.
     *   - Remove the click handler to prevent multiple initializations.
     *   - Initialize the game level and character.
     *   - Set up the game world and start the game loop.
     */
    startGame() {
        this.hidePlayAgainButton();
        this.canvas.onclick = () => {
            this.mouseClicked = true;
            this.canvas.onclick = null;
            initLevel();
            this.level = level1;
            this.character = new Character();
            this.setWorld();
            this.run();
        };
    }

    /**
     * Starts the main game loop, periodically checking for collisions, 
     * throwable objects, item pickups (coins and bottles), and bottle hits on the endboss.
     * The loop runs every 200 milliseconds and stores the interval ID for later reference.
     */
    run() {
        this.intervalId = setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkPickup(this.level.coins, this.coinbar);
            this.checkPickup(this.level.bottles, this.bottlebar);
            this.checkBottleHitsEndboss();
        }, 1000 / 60);
    };

    /**
     * Checks if the character should throw an object based on the current keyboard input.
     * Calls the method to handle character throw logic and direction.
     * Resets the throwPressed flag if the throw key is not pressed.
     */
    checkThrowObjects() {
        this.checkCharacterThrowAndDirection();
        if (!this.keyboard.throw) {
            this.throwPressed = false;
        }
    }

    /**
     * Checks if the character should throw a throwable object based on keyboard input and available resources.
     * If the throw key is pressed, the throw action hasn't been triggered yet, and the bottle bar has at least 20%,
     * a new throwable object is created and added to the world in the direction the character is facing.
     * The bottle bar percentage is reduced by 20, and the throw action is marked as pressed to prevent repeated throws.
     */
    checkCharacterThrowAndDirection() {
        if (this.keyboard.throw && !this.throwPressed && this.bottlebar.percentage >= 20) {
            let x = this.character.otherDirection ? -100 : 100;
            let bottle = new ThrowableObject(this.character.x + x, this.character.y + 120);
            bottle.otherDirection = this.character.otherDirection;
            bottle.world = this;
            this.throwableObject.push(bottle);
            this.bottlebar.setPercentage(this.bottlebar.percentage - 20);
            this.throwPressed = true;
        }
    }

    /**
     * Checks for collisions between the character and all enemies in the current level.
     * If a collision is detected:
     *   - If the enemy's energy is 0, the collision is ignored.
     *   - If the character is above the enemy (determined by checkCharacterY), the enemy's energy is set to 0.
     *   - Otherwise, handles the collision by determining which enemy is hitting the character,
     *     and updates the character's status bar to reflect any change in energy.
     */
    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColiding(enemy)) {
                if (enemy.energy === 0) return;
                if (this.checkCharacterY(enemy)) {
                    enemy.energy = 0;
                } else {
                    this.checkWhichEnemyIsHitting(enemy);
                    this.statusbar.setPercentage(this.character.energy);
                }
            }
        });
    };

    checkCharacterY(enemy) {
        return this.character.speedY < 0 && (this.character.y + this.character.height - 80) < enemy.y;
    }

    /**
     * Checks which type of enemy is hitting the character and applies the appropriate hit logic.
     * If the enemy is an instance of Endboss, calls `hitByEndboss()` on the character.
     * Otherwise, calls the generic `hit()` method.
     *
     * @param {Object} enemy - The enemy object that is colliding with the character.
     */
    checkWhichEnemyIsHitting(enemy) {
        if (enemy instanceof Endboss) {
            this.character.hitByEndboss();
        } else {
            this.character.hit();
        }
    }

    /**
     * Checks if any throwable bottle object hits the Endboss enemy.
     * If a collision is detected and the bottle is not already splashing,
     * triggers the bottle's ground impact, applies damage to the Endboss,
     * and updates the Endboss status bar to reflect the new energy level.
     */
    checkBottleHitsEndboss() {
        this.throwableObject.forEach((bottle) => {
            if (bottle.isSplashing) return;
            this.level.enemies.forEach((enemy) => {
                if (enemy instanceof Endboss && bottle.isColiding(enemy)) {
                    bottle.onGroundImpact();
                    enemy.hit();
                    this.statusbarEndboss.setPercentage(enemy.energy);
                }
            });
        });
    }

    /**
     * Checks for collisions between the character and a list of objects.
     * If a collision is detected, removes the object from the list and increases the bar's percentage by 20.
     *
     * @param {Array<Object>} objects - The array of objects to check for pickup.
     * @param {Object} bar - The bar object with a `percentage` property and a `setPercentage` method.
     */
    checkPickup(objects, bar) {
        objects.forEach((obj, index) => {
            if (this.character.isColiding(obj)) {
                objects.splice(index, 1);
                bar.setPercentage(bar.percentage + 20);
            }
        });
    }

    /**
     * Sets the current world context for the character and all enemies in the level.
     * Assigns this world instance to the character and each enemy.
     * If an enemy is an instance of Endboss, assigns it to the endboss property.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(e => {
            e.world = this;
            if (e instanceof Endboss) this.endboss = e;
        });
    };

    /**
     * Draws the current state of the world onto the map.
     * - If the world is not running, the method returns immediately.
     * - If the level is not set, it displays the start screen and schedules the next draw call.
     * - Otherwise, it adds all relevant objects to the map for rendering.
     */
    draw() {
        if (!this.running) return;
        if (!this.level) {
            this.addToMap(this.startscreen);
            requestAnimationFrame(() => this.draw());
            return;
        }
        this.addObjectsToMap();
    }

    /**
     * Renders all game objects and UI elements onto the canvas.
     * 
     * This method clears the canvas, applies camera translation, renders game objects,
     * resets the translation, renders UI bars, checks for game end conditions, and
     * schedules the next frame using requestAnimationFrame.
     *
     * @function
     * @memberof World
     */
    addObjectsToMap() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.renderObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.renderBars();
        this.checkGameEnd();
        let self = this;
        requestAnimationFrame(() => { self.draw(); });
    };

    /**
     * Renders the various status bars (endboss, player status, coins, bottles) by adding them to the map.
     * This method is responsible for displaying the game's HUD elements.
     */
    renderBars() {
        this.addToMap(this.statusbarEndboss);
        this.addToMap(this.statusbar);
        this.addToMap(this.coinbar);
        this.addToMap(this.bottlebar);
    }

    /**
     * Renders all game objects onto the map by adding them in a specific order.
     * This includes background objects, clouds, enemies, coins, bottles, throwable objects, and the main character.
     * Utilizes helper methods to add each type of object or group of objects to the map.
     */
    renderObjects() {
        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.bottles);
        this.addObjectToMap(this.throwableObject);
        this.addToMap(this.character);
    };

    /**
     * Checks if the game has ended and displays the appropriate end screen.
     * Calls methods to show either the "You Won" screen or the "Game Over" screen.
     */
    checkGameEnd() {
        this.showYouWonScreen();
        this.showGameOverScreen();
    };

    showYouWonScreen() {
        if (this.endboss && this.endboss.energy == 0) {
            this.gameOver = true;
            let youWonScreen = new YouWonScreen();
            this.addToMap(youWonScreen);
            this.showPlayAgainButton();
            setTimeout(() => {
                this.stop();
            }, 1000);
            return;
        };
    };

    /**
     * Displays the game over screen when the character's energy reaches zero.
     * Sets the game over state, adds the game over screen to the map,
     * shows the play again button, and stops the game after a short delay.
     */
    showGameOverScreen() {
        if (this.character.energy == 0) {
            this.gameOver = true;
            let gameOverScreen = new GameOverScreen();
            this.addToMap(gameOverScreen);
            this.showPlayAgainButton();
            setTimeout(() => {
                this.stop();
            }, 1000);
            return;
        }
    };

    /**
     * Stops the world by clearing the running interval and resetting relevant state.
     * Sets `running` to false, clears the interval and requestAnimationFrame IDs.
     *
     * @returns {void}
     */
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.running = false;
        this.rafId = null;
    }

    /**
     * Displays the "Play Again" button by removing the 'hidden' class
     * from the element with the ID 'playAgainBtn'.
     */
    showPlayAgainButton() {
        let btn = document.getElementById('playAgainBtn');
        btn.classList.remove('hidden');
    }

    /**
     * Hides the "Play Again" button by adding the 'hidden' class to its element.
     * Assumes the button has the ID 'playAgainBtn'.
     */
    hidePlayAgainButton() {
        let btn = document.getElementById('playAgainBtn');
        btn.classList.add('hidden');
    };

    /**
     * Adds multiple objects to the map by iterating over the provided array
     * and calling the addToMap method for each object.
     *
     * @param {Array<Object>} objects - An array of objects to be added to the map.
     */
    addObjectToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    };

    /**
     * Adds a movable object to the map by drawing its image on the canvas context.
     * The image is flipped if necessary before drawing and then flipped back after drawing.
     *
     * @param {Object} mO - The movable object to add to the map.
     * @param {HTMLImageElement} mO.img - The image of the movable object.
     * @param {number} mO.x - The x-coordinate where the image should be drawn.
     * @param {number} mO.y - The y-coordinate where the image should be drawn.
     * @param {number} mO.width - The width of the image to draw.
     * @param {number} mO.height - The height of the image to draw.
     */
    addToMap(mO) {
        this.flipImage(mO);
        this.ctx.drawImage(mO.img, mO.x, mO.y, mO.width, mO.height);
        this.flipImageBack(mO);
    };

    /**
     * Flips the image horizontally on the canvas context if the object is facing the other direction.
     * Saves the current context state, translates the context to the width of the object,
     * and scales the context horizontally by -1 to achieve the flip.
     * Also inverts the x position of the object.
     *
     * @param {Object} mO - The object to flip.
     * @param {boolean} mO.otherDirection - Indicates if the object should be flipped.
     * @param {number} mO.width - The width of the object, used for translation.
     * @param {number} mO.x - The x position of the object, which will be inverted.
     */
    flipImage(mO) {
        if (mO.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mO.width, 0);
            this.ctx.scale(-1, 1);
            mO.x = mO.x * -1;
        }
    };

    /**
     * Restores the canvas context and flips the object's x-coordinate back if it was previously flipped.
     * 
     * @param {Object} mO - The object to flip back.
     * @param {boolean} mO.otherDirection - Indicates if the object is facing the other direction.
     * @param {number} mO.x - The x-coordinate of the object, which will be flipped.
     */
    flipImageBack(mO) {
        if (mO.otherDirection) {
            mO.x = mO.x * -1;
            this.ctx.restore();
        }
    };
};