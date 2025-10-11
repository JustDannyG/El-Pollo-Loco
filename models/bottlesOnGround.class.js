class Bottle extends DrawableObject {

    y = 350;
    height = 80;
    width = 80;

    bottleImages = [
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Constructs a BottlesOnGround instance.
     *
     * Initializes default collision offsets for the sprite, preloads the bottle images,
     * and positions the instance offscreen to the right at a randomized horizontal coordinate.
     *
     * @constructor
     * @public
     * @memberof BottlesOnGround
     * @property {Object} offset - Collision offset values in pixels.
     * @property {number} offset.top - Top offset in pixels.
     * @property {number} offset.left - Left offset in pixels.
     * @property {number} offset.right - Right offset in pixels.
     * @property {number} offset.bottom - Bottom offset in pixels.
     * @property {number} x - Horizontal position in pixels; initialized to a random value between 360 (inclusive) and 2520 (exclusive).
     */
    constructor() {
        super();
        this.offset = {
            top: 10,
            left: 15,
            right: 15,
            bottom: 10
        };
        this.loadImage(this.bottleImages);
        this.x = 360 + Math.random() * 2160;
    }
    
};