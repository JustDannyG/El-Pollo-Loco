class Coin extends DrawableObject {

    y = 100;
    height = 200;
    width = 200;

    coinImages = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    /**
     * Initializes a new instance of the class.
     * Sets up the offset values for collision detection or positioning,
     * loads the initial coin image and all coin images,
     * starts the coin animation, and spawns the coin at a random location.
     *
     * @constructor
     */
    constructor() {
        super();
        this.offset = {
            top: 60,
            left: 60,
            right: 60,
            bottom: 60
        };
        this.loadImage(this.coinImages[0]);
        this.loadImages(this.coinImages);
        this.animate();
        this.randomSpawn();
    }

    /**
     * Randomly sets the x and y coordinates for the coin within specified ranges.
     * - x is set to a value between 720 and 4320.
     * - y is set to a value between 50 and 230.
     */
    randomSpawn() {
        this.x = 720 + Math.random() * 3600;
        this.y = 50 + Math.random() * 180;
    }

    /**
     * Starts an interval that plays the coin animation by cycling through the coin images every second.
     * @function
     */
    animate() {
        setInterval(() => this.playAnimation(this.coinImages), 1000);
    };
};