class YouWonScreen extends MovableObject {

    y = 120;
    x = 180;
    height = 240;
    width = 360;

    /**
     * Creates an instance of the YouWonScreen class.
     * Loads the "You won" image to display when the player wins.
     * Calls the parent constructor.
     */
    constructor() {
        super();
        this.loadImage('./img/You won, you lost/You won A.png');
    }
}
