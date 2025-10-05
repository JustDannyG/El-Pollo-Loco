class ThrowableObject extends MovableObject {

    y = 360;

    throwImages = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    throwImagesImpact = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png'
    ];

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage(this.throwImages[0]);
        this.loadImages(this.throwImages);
        this.loadImages(this.throwImagesImpact);
        this.throw(100, 150);
    };

    throw() {
        this.speedY = 30;
        this.applyGravatiy();
        this.animate();
    }

    animate() {
        this.flyInterval = setInterval(() => {
            if (!this.isSplashing) {
                this.x += 10;
                this.playAnimation(this.throwImages);
            }
        }, 25);
    }

    onGroundImpact() {
        this.isSplashing = true;
        let currentImage = 0;
        let animation = setInterval(() => {
            if (currentImage < this.throwImagesImpact.length) {
                this.img = this.imageCache[this.throwImagesImpact[currentImage]];
                currentImage++;
            } else {
                clearInterval(animation);
                let stopAnimation = [];
                if (this.world && this.world.throwableObject) {
                    stopAnimation = this.world.throwableObject;
                    stopAnimation.splice(stopAnimation.indexOf(this), 1);
                }
            }
        }, 100);
    }
};