class Cloud extends MovableObject {
    y = 25;
    x = 0;
    height = 300;
    width = 500;
    speed = 0.15;

    /**
     * Creates an instance of the Cloud class.
     * Initializes the cloud's horizontal position and assigns a random speed.
     * Loads the cloud image and starts the animation.
     *
     * @param {number} [x=0] - The initial x-coordinate position of the cloud.
     */
    constructor(x = 0) {
        super();
        this.x = x;
        this.speed = Math.random() * 0.3;
        this.loadImage('./img/5_background/layers/4_clouds/1.png');
        this.animate();
    }

    /**
     * Starts the animation for the cloud by repeatedly moving it to the left.
     * This method sets up an interval that calls the `moveLeft` method approximately 60 times per second.
     */
    animate() {
        setInterval(() => this.moveLeft(), 1000 / 60);
    }

}