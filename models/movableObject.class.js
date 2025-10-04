class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    lastHit = 0;

    applyGravatiy() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    };

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 112;
        }
    };

    moveRight() {
        this.x += this.speed;
    };

    moveLeft() {
        this.x -= this.speed;
    };

    jump() {
        this.speedY = 24;
    };

    isColiding(mO) {
        return this.x + this.width > mO.x &&
            this.y + this.height > mO.y &&
            this.x < mO.x &&
            this.y < mO.y + mO.height
    };

    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    };

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    };

    isDead() {
        return this.energy == 0;
    };
};