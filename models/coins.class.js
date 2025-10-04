class Coin extends DrawableObject {

    y = 100;
    height = 200;
    width = 200;

    coinImages = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    constructor() {
        super();
        this.loadImage(this.coinImages[0]);
        this.loadImages(this.coinImages);
        this.animate();
        this.x = 720 + Math.random() * 3600;
        this.y = 50 + Math.random() * 180;
    }

    animate() {
        setInterval(() => this.playAnimation(this.coinImages), 1000);
    };
};