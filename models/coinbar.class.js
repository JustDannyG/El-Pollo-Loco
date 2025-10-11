class Coinbar extends DrawableObject {
    x = 10;
    y = 50;
    width = 200;
    height = 60;

    coinImages = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    /**
     * Creates an instance of the CoinBar class.
     * Initializes the coin bar by loading coin images and setting the initial percentage to 0.
     * Calls the parent class constructor.
     */
    constructor() {
        super();
        this.loadImages(this.coinImages);
        this.setPercentage(0);
    }

    /**
     * Sets the current percentage value and updates the displayed coin image accordingly.
     * 
     * @param {number} percentage - The new percentage value to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.coinImages[this.checkImageIndex()];
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