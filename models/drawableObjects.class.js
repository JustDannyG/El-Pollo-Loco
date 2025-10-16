class DrawableObject extends AudioManager{
    x = 0;
    y = 50;
    height = 100;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    /**
     * Loads an image from the specified path and assigns it to the `img` property.
     * @param {string} path - The path to the image file to load.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    };

    /**
     * Loads multiple images and stores them in the image cache.
     * 
     * @param {string[]} array - An array of image file paths to load.
     * @returns {void}
     */
    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    };

    /**
     * Plays an animation by cycling through the provided array of image paths.
     * Updates the current image to display based on the animation frame.
     *
     * @param {string[]} images - An array of image paths representing animation frames.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    };
};