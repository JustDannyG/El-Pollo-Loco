class MiniChicken extends MovableObject {

    y = 360;
    height = 70;
    width = 70;

    imagesWalking = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    imagesDead = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Constructs a new MiniChicken instance.
     * Initializes the offset for collision detection, loads walking and dead images,
     * starts the animation, sets a random horizontal position, and assigns a random speed.
     */
    constructor() {
        super();
        this.offset = {
            top: 0,
            left: 10,
            right: 10,
            bottom: 10
        };
        this.loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesDead);
        this.animate();
        this.x = 500 + Math.random() * 3600;
        this.speed = 1.4 + Math.random() * 0.5;
    }

    /**
     * Triggers the animation sequence for the mini chicken.
     * Calls methods to handle left movement and death animation states.
     */
    animate() {
        this.isMovingLeft();
        this.isDeadAnimation();
    };

    /**
     * Starts an interval that checks if the mini chicken is dead.
     * If dead, updates the image to the dead state, sets the y position to 380,
     * and stops its movement by setting speed to 0.
     * The check runs 10 times per second.
     */
    isDeadAnimation() {
        setInterval(() => {
            if (this.isDead()) {
                this.img = this.imageCache[this.imagesDead[0]];
                this.y = 380;
                this.speed = 0;
            }
        }, 1000 / 10);
    }

    /**
     * Starts an interval that moves the mini chicken to the left and plays the walking animation,
     * as long as the mini chicken is not dead. The movement and animation are updated at a rate of 12 times per second.
     */
    isMovingLeft() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
                this.playAnimation(this.imagesWalking);
            }
        }, 1000 / 12);
    }
}