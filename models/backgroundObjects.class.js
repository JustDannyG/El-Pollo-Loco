class BackgroundObject extends MovableObject {
    
    width = 720;
    height = 480;

    /**
     * Construct a new background object, load its image and set its initial position.
     *
     * @constructor
     * @param {string} imgPath - Path or URL to the image to load.
     * @param {number} [x=0] - Initial x-coordinate (default: 0).
     * @param {number} [y=0] - Initial y-coordinate (default: 0).
     */
    constructor(imgPath, x = 0, y = 0) {
        super();
        this.loadImage(imgPath)
        this.x = x;
        this.y = y;
    }
};