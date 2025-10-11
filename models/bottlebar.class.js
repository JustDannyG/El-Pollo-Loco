class Bottlebar extends DrawableObject {
    
    x = 10;
    y = 100;
    width = 200;
    height = 60;

    bottleImages = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    /**
     * Constructs a BottleBar instance.
     *
     * Calls the superclass constructor, loads the primary bottle image (the first entry of
     * this.bottleImages), preloads all images in this.bottleImages, and initializes the
     * bottle fill percentage to 0.
     *
     * @constructor
     */
    constructor() {
        super();
        this.loadImage(this.bottleImages[0]);
        this.loadImages(this.bottleImages);
        this.setPercentage(0);
    }

    /**
     * Update the bottle fill percentage and refresh the corresponding image.
     *
     * Clamps the provided percentage to the range [0, 100], assigns the clamped value to
     * this.percentage, then selects an image path from this.bottleImages using
     * this.checkImageIndex() and updates this.img from this.imageCache.
     *
     * @param {number} percentage - Desired fill percentage. Values greater than 100 are set to 100;
     *                              values less than 0 are set to 0.
     * @returns {void}
     */
    setPercentage(percentage) {
        if (percentage > 100) {
            this.percentage = 100;
        } else if (percentage < 0) {
            this.percentage = 0;
        } else {
            this.percentage = percentage;
        }
        let path = this.bottleImages[this.checkImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determine the image index to display based on the instance's `percentage`.
     *
     * Maps specific percentage values to an index:
     *  - 100 => 5
     *  - 80  => 4
     *  - 60  => 3
     *  - 40  => 2
     *  - 20  => 1
     *  - any other value => 0
     *
     * The method reads `this.percentage` and returns the corresponding numeric
     * index. Useful for selecting a sprite/frame based on fill/health percentage.
     *
     * @returns {number} The image index corresponding to the current percentage.
     */
    checkImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage == 80) {
            return 4;
        } else if (this.percentage == 60) {
            return 3;
        } else if (this.percentage == 40) {
            return 2;
        } else if (this.percentage == 20) {
            return 1;
        } else {
            return 0;
        }
    }
};