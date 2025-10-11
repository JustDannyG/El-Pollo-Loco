class StatusbarEndboss extends DrawableObject {

    x = 500;
    y = 5;
    width = 200;
    height = 60;

    IMAGES = [
        './img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];

    percentage = 140;

    /**
     * Creates an instance of the status bar for the Endboss.
     * Loads all necessary images and initializes the status bar to 100%.
     * Calls the parent constructor.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }

    /**
     * Sets the percentage value for the status bar and updates the displayed image accordingly.
     *
     * @param {number} percentage - The new percentage value to set (typically between 0 and 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the image index based on the current percentage value.
     * 
     * @returns {number} The image index corresponding to the percentage:
     *   - 5 for 100%
     *   - 4 for 80%
     *   - 3 for 60%
     *   - 2 for 40%
     *   - 1 for 20%
     *   - 0 for any other value
     */
    resolveImageIndex() {
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
}