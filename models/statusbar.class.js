class Statusbar extends DrawableObject {
    x = 10;
    y = 0;
    width = 200;
    height = 60;

    healthImages = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    /**
     * Creates an instance of the status bar, initializes it by loading health images,
     * and sets the initial health percentage to 100%.
     *
     * @constructor
     * @extends SomeParentClass
     */
    constructor() {
        super();
        this.loadImages(this.healthImages);
        this.setPercentage(100);
    }

    /**
     * Sets the current percentage value and updates the status bar image accordingly.
     *
     * @param {number} percentage - The new percentage value to set (typically between 0 and 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.healthImages[this.checkImageIndex()];
        this.img = this.imageCache[path];
    };

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