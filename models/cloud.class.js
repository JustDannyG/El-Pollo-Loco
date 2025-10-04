class Cloud extends MovableObject {
    y = 25;
    height = 300;
    width = 500;

    constructor() {
        super();
        this.loadImage('./img/5_background/layers/4_clouds/1.png');
        this.x = 500 * Math.random();
        this.animation();
    }

    animation() {
        this.moveLeft();
    }

}