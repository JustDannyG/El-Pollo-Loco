class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    constructor(imgPath, x = 0, y = 0) {
        super();
        this.loadImage(imgPath)
        this.x = x;
        this.y = y;
    }

    

};

