class ThrowableObject extends MovableObject {

    throwImages = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage(this.throwImages[0]);
        this.throw(100, 150);
    };

    throw() {
        this.speedY = 30; 
        this.applyGravatiy();
        setInterval(() => {
            this.x += 10;
        }, 25);
    };

};