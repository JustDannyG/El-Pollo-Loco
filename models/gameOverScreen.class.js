class GameOverScreen extends MovableObject {

    y = 120;
    x = 180;
    height = 240;
    width = 360;

    constructor() {
        super();
        this.loadImage('./img/You won, you lost/Game Over.png');
    };
}