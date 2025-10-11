class Cloud extends MovableObject {
    y = 25;
    x = 0;
    height = 300;
    width = 500;
    speed = 0.15;

    constructor(x = 0) {
        super();
        this.x = x;
        this.speed = Math.random() * 0.3;
        this.loadImage('./img/5_background/layers/4_clouds/1.png');
        this.animate();
    }

    animate() {
        setInterval(() => this.moveLeft(), 1000 / 60);
    }

}