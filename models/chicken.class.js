class Chicken extends MovableObject {
    
    y = 336;
    height = 88;
    width = 80;

    imagesWalking = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    constructor() {
        super();
        this.loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.animate();
        this.x = 500 + Math.random() * 3600;
        this.speed = 0.25 + Math.random() * 0.25;
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
            this.playAnimation(this.imagesWalking);
        }, 1000 / 10);
    };
};