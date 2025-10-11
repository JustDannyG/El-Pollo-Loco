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

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.running = true;
        this.startGame();
        this.draw();
    };

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

    run() {
        this.intervalId = setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkPickup(this.level.coins, this.coinbar);
            this.checkPickup(this.level.bottles, this.bottlebar);
            this.checkBottleHitsEndboss();
        }, 200);
    };

    checkThrowObjects() {
        this.checkCharacterThrowAndDirection();
        if (!this.keyboard.throw) {
            this.throwPressed = false;
        }
    }

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
        return this.character.speedY < 0 && (this.character.y + this.character.height - 100) < enemy.y;
    }

    checkWhichEnemyIsHitting(enemy) {
        if (enemy instanceof Endboss) {
            this.character.hitByEndboss();
        } else {
            this.character.hit();
        }
    }

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

    checkPickup(objects, bar) {
        objects.forEach((obj, index) => {
            if (this.character.isColiding(obj)) {
                objects.splice(index, 1);
                bar.setPercentage(bar.percentage + 20);
            }
        });
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(e => {
            e.world = this;
            if (e instanceof Endboss) this.endboss = e;
        });
    };

    draw() {
        if (!this.running) return;
        if (!this.level) {
            this.addToMap(this.startscreen);
            requestAnimationFrame(() => this.draw());
            return;
        }
        this.addObjectsToMap();
    }

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

    renderBars() {
        this.addToMap(this.statusbarEndboss);
        this.addToMap(this.statusbar);
        this.addToMap(this.coinbar);
        this.addToMap(this.bottlebar);
    }

    renderObjects() {
        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.bottles);
        this.addObjectToMap(this.throwableObject);
        this.addToMap(this.character);
    }

    checkGameEnd() {
        this.showYouWonScreen();
        this.showGameOverScreen();
    }

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
        }
    }

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

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.running = false;
        this.rafId = null;
    }

    showPlayAgainButton() {
        let btn = document.getElementById('playAgainBtn');
        btn.classList.remove('hidden');
    }

    hidePlayAgainButton() {
        let btn = document.getElementById('playAgainBtn');
        btn.classList.add('hidden');
    };

    addObjectToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    };

    addToMap(mO) {
        this.flipImage(mO);
        this.ctx.drawImage(mO.img, mO.x, mO.y, mO.width, mO.height);
        this.flipImageBack(mO);
    };

    flipImage(mO) {
        if (mO.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mO.width, 0);
            this.ctx.scale(-1, 1);
            mO.x = mO.x * -1;
        }
    };

    flipImageBack(mO) {
        if (mO.otherDirection) {
            mO.x = mO.x * -1;
            this.ctx.restore();
        }
    };
};