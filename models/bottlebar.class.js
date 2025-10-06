class Bottlebar extends DrawableObject {
    x = 10;
    y = 100;
    width = 200;
    height = 60;

    bottleImages = [
        '/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        '/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        '/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        '/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        '/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        '/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    constructor() {
        super();
        this.loadImage(this.bottleImages[0]);
        this.loadImages(this.bottleImages);
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        if (percentage > 100) {
            this.percentage = 100;
        } else if (percentage < 0) {
            this.percentage = 0;
        } else {
            this.percentage = percentage;
        }

        const path = this.bottleImages[this.checkImageIndex()];
        this.img = this.imageCache[path];
    }

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