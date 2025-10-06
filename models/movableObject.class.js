class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    lastHit = 0;
    isSplashing = false;

    applyGravatiy() {
        setInterval(() => {
            if (this.isSplashing) return;
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY - 10;
                this.speedY -= this.acceleration;
            }
            if (this instanceof ThrowableObject && this.y >= 360) {
                this.onGroundImpact();
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
        this.speedY = 34;
    };

    isColiding(mO) {
        return (
            this.x + this.width - this.offset.right > mO.x + mO.offset.left && 
            this.y + this.height - this.offset.bottom > mO.y + mO.offset.top && 
            this.x + this.offset.left < mO.x + mO.width - mO.offset.right && 
            this.y + this.offset.top < mO.y + mO.height - mO.offset.bottom 
        );
    }

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