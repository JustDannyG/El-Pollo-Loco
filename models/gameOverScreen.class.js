class GameOverScreen extends MovableObject {

    y = 120;
    x = 180;
    height = 240;
    width = 360;

    /**
     * Creates an instance of the GameOverScreen class.
     * Loads the "Game Over" image to display when the game ends.
     * Calls the parent class constructor.
     */
    constructor() {
        super();
        this.loadImage('./img/You won, you lost/Game Over.png');
    };
}