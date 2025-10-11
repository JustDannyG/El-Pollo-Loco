class Chicken extends MovableObject {
    
    y = 339;
    height = 98;
    width = 80;

    imagesWalking = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    imagesDead = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Creates an instance of the Chicken class.
     * Initializes the chicken's collision offset, loads walking and dead images,
     * starts the animation, and sets a random starting position and speed.
     *
     * @constructor
     */
    constructor() {
        super();
        this.offset = {
            top: 10,
            left: 5,
            right: 5,
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
     * Starts the animation loop for the chicken character.
     * Continuously checks if the chicken is dead and updates its image, position, and speed accordingly.
     * The check runs 10 times per second.
     */
    animate() {
        this.isMovingLeft();
        setInterval(() => {
            if (this.isDead()) { 
                this.img = this.imageCache[this.imagesDead[0]];
                this.y = 355;
                this.speed = 0;
            }
        }, 1000 / 10);
    };

    /**
     * Starts an interval that moves the chicken to the left and plays the walking animation,
     * as long as the chicken is not dead. The movement and animation are updated 12 times per second.
     */
    isMovingLeft() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
                this.playAnimation(this.imagesWalking);
            }
        }, 1000 / 12);
    }
};