class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    lastHit = 0;
    isSplashing = false;

    /**
     * Applies gravity to the object by periodically updating its vertical position and speed.
     * - Decreases the object's vertical position (`y`) based on its current vertical speed (`speedY`) and a constant.
     * - Reduces the vertical speed (`speedY`) by the object's acceleration.
     * - Stops applying gravity if the object is splashing.
     * - If the object is an instance of `ThrowableObject` and reaches the ground (`y >= 360`), triggers `onGroundImpact()`.
     * The method runs at a fixed interval (25 times per second).
     */
    applyGravity() {
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

    /**
     * Determines if the object is above the ground level.
     * For instances of ThrowableObject, always returns true.
     * For other objects, returns true if the object's y-coordinate is less than 112.
     *
     * @returns {boolean} True if the object is considered above ground, otherwise false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 112;
        }
    };

    /**
     * Moves the object to the right by increasing its x-coordinate by its speed.
     * @returns {void}
     */
    moveRight() {
        this.x += this.speed;
    };

    /**
     * Moves the object to the left by decreasing its x-coordinate by its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    };

    /**
     * Initiates a jump by setting the vertical speed.
     * Sets the object's vertical speed (`speedY`) to 36, causing it to move upward.
     */
    jump() {
        this.speedY = 36;
    };

    /**
     * Checks if this object is colliding with another movable object.
     *
     * @param {Object} mO - The other movable object to check collision against.
     * @param {number} mO.x - The x-coordinate of the other object.
     * @param {number} mO.y - The y-coordinate of the other object.
     * @param {number} mO.width - The width of the other object.
     * @param {number} mO.height - The height of the other object.
     * @param {Object} mO.offset - The offset values for the other object.
     * @param {number} mO.offset.left - The left offset of the other object.
     * @param {number} mO.offset.right - The right offset of the other object.
     * @param {number} mO.offset.top - The top offset of the other object.
     * @param {number} mO.offset.bottom - The bottom offset of the other object.
     * @returns {boolean} True if the objects are colliding, false otherwise.
     */
    isColiding(mO) {
        return (
            this.x + this.width - this.offset.right > mO.x + mO.offset.left &&
            this.y + this.height - this.offset.bottom > mO.y + mO.offset.top &&
            this.x + this.offset.left < mO.x + mO.width - mO.offset.right &&
            this.y + this.offset.top < mO.y + mO.height - mO.offset.bottom
        );
    }

    /**
     * Reduces the object's energy by 20 if at least 1 second has passed since the last hit.
     * If energy drops below 0, it is set to 0.
     * Updates the last hit timestamp if energy remains above 0.
     */
    hit() {
        let now = new Date().getTime();
        if (now - this.lastHit < 1000) {
            return;
        }
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    };

    /**
     * Handles the logic when the object is hit by the endboss.
     * Reduces the object's energy by 40, but only if at least 1 second has passed since the last hit.
     * Ensures energy does not drop below 0.
     * Updates the last hit timestamp if the object still has energy left.
     */
    hitByEndboss() {
        let now = new Date().getTime();
        if (now - this.lastHit < 1000) return;
        this.energy -= 40;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    };

    /**
     * Determines if the object is currently in a "hurt" state.
     * The object is considered hurt if less than 0.5 seconds have passed since the last hit.
     *
     * @returns {boolean} True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    };

    /**
     * Checks if the object is dead based on its energy level.
     * @returns {boolean} Returns true if the object's energy is 0, indicating it is dead; otherwise, false.
     */
    isDead() {
        return this.energy == 0;
    };
};