class Startscreen extends DrawableObject {

  /**
   * Initializes the start screen by loading the start screen image and setting its position and size.
   * Calls the parent class constructor.
   *
   * @constructor
   * @extends {ParentClass} // Replace with actual parent class name if known
   */
  constructor() {
    super();
    this.loadImage('./img/9_intro_outro_screens/start/startscreen_1.png');
    this.x = 0;
    this.y = 0;
    this.width = 720;
    this.height = 480;
  }
};