class Chicken extends MovableObject {
    
    y = 336;
    height = 98;
    width = 80;

    imagesWalking = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    imagesDead = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super();
        this.offset = {
            top: 10,
            left: 5,
            right: 5,
            bottom: 10
        };
        this.loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesDead);
        this.animate();
        this.x = 500 + Math.random() * 3600;
        this.speed = 0.25 + Math.random() * 0.25;
    }

    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
        setInterval(() => {
            if (this.isDead()) { 
                this.img = this.imageCache[this.imagesDead[0]];
                this.y = 355;
                this.speed = 0;
            } else {
                this.playAnimation(this.imagesWalking);
            }
        }, 1000 / 10);
    };
};