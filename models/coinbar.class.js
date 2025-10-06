class Coinbar extends DrawableObject {
    x = 10;
    y = 50;
    width = 200;
    height = 60;

    coinImages = [
        '/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        '/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        '/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        '/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        '/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        '/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.coinImages);
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.coinImages[this.checkImageIndex()];
        this.img = this.imageCache[path];
    };

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