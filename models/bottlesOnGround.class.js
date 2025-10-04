class Bottle extends DrawableObject {

    y = 350;
    height = 80;
    width = 80;

    bottleImages = [
        '/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super();
        this.loadImage(this.bottleImages);
        this.x = 360 + Math.random() * 3600;
    }
    
};