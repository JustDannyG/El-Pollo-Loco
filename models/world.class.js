class World {
    character;
    statusbar = new Statusbar();
    coinbar = new Coinbar();
    bottlebar = new Bottlebar();
    startscreen = new Startscreen();

    throwableObject = [];
    level = null;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    mouseClicked = false;
    throwPressed = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.startGame();
        this.draw();
    };

    startGame() {
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
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkPickup(this.level.coins, this.coinbar);
            this.checkPickup(this.level.bottles, this.bottlebar);
        }, 200);
    };

    checkThrowObjects() {
        if (this.keyboard.throw && !this.throwPressed && this.bottlebar.percentage >= 20) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObject.push(bottle);
            this.bottlebar.setPercentage(this.bottlebar.percentage - 20);
            this.throwPressed = true;
        }
        if (!this.keyboard.throw) {
            this.throwPressed = false;
        }
    }

    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColiding(enemy)) {
                this.character.hit();
                this.statusbar.setPercentage(this.character.energy);
            }
        });
    };

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
    };

    draw() {
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
        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.bottles);
        this.addObjectToMap(this.throwableObject);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbar);
        this.addToMap(this.coinbar);
        this.addToMap(this.bottlebar);
        let self = this;
        requestAnimationFrame(function () { self.draw(); });
    };

    addObjectToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    };

    addToMap(mO) {
        this.flipImage(mO);
        this.ctx.drawImage(mO.img, mO.x, mO.y, mO.width, mO.height);
        mO.drawFrame(this.ctx);
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
