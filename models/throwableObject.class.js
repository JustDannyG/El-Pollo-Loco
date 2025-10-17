class ThrowableObject extends MovableObject {

    y = 360;
    splashAudio;

    throwImages = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    throwImagesImpact = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png'
    ];

    /**
     * Creates an instance of the throwable object at the specified coordinates.
     * Initializes the object's offset, position, and loads the necessary images.
     * Also triggers the throw action with initial velocities.
     *
     * @param {number} x - The x-coordinate for the object's initial position.
     * @param {number} y - The y-coordinate for the object's initial position.
     */
    constructor(x, y) {
        super();
        this.offset = {
            top: 10,
            left: 10,
            right: 10,
            bottom: 10
        };
        this.x = x;
        this.y = y;
        this.loadAllImages();
        this.loadAudios();
        this.throw(100, 150);
    };

    /**
     * Loads all images required for the throwable object, including the initial image,
     * all throw animation images, and all impact animation images.
     */
    loadAllImages() {
        this.loadImage(this.throwImages[0]);
        this.loadImages(this.throwImages);
        this.loadImages(this.throwImagesImpact);
    }

    /**
     * Loads the splash audio file for the throwable object.
     * Initializes the Audio object and preloads the audio resource.
     */
    loadAudios() {
        this.splashAudio = new Audio('./audio/213158__arnaud-coutancier__broken-bottle-verre-07.wav');
        this.splashAudio.load();
    }

    /**
     * Initiates the throw action for the object.
     * Sets the vertical speed, applies gravity, and starts the throw animation.
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.animate();
    }

    /**
     * Starts the animation for the throwable object by repeatedly calling
     * the methods to throw the bottle to the right and left at a fixed interval.
     * The animation runs every 25 milliseconds and stores the interval ID in `flyInterval`.
     */
    animate() {
        this.flyInterval = setInterval(() => {
            this.throwBottleRight();
            this.throwBottleLeft();
        }, 25);
    }

    /**
     * Throws the bottle to the right if it is not currently splashing and the object is facing right.
     * Increases the x position and plays the throw animation.
     */
    throwBottleRight() {
        if (!this.isSplashing && this.otherDirection == false) {
            this.x += 10;
            this.playAnimation(this.throwImages);
        }
    }

    /**
     * Throws the bottle to the left if the character is facing the opposite direction.
     * Decreases the x position by 10 units and plays the throw animation.
     *
     * @function
     * @returns {void}
     */
    throwBottleLeft() {
        if (this.otherDirection == true) {
            this.x -= 10;
            this.playAnimation(this.throwImages);
        }
    }

    /**
     * Handles the logic when the throwable object impacts the ground.
     * Stops the animation in the other direction, sets the object to splashing state,
     * and starts the splash animation sequence.
     *
     * @returns {void}
     */
    onGroundImpact() {
        this.stopAnimationtOtherDirection();
        this.isSplashing = true;
        this.playSplashAudio();
        let currentImage = 0;
        let animation = setInterval(() => {
            currentImage = this.isBottleImpact(currentImage, animation);
        }, 100);
    }

    /**
     * Plays or pauses the splash audio for the throwable object based on the audio manager's bottle splash audio status.
     * If the audio manager exists and bottle splash audio is enabled, the splash audio is played.
     * Otherwise, the splash audio is paused.
     */
    playSplashAudio() {
        if (audioManager && audioManager.bottleSplashAudioStatus == true) {
            this.splashAudio.play();
        } else {
            this.splashAudio.pause();
        }
    }

    /**
     * Handles the bottle impact animation by updating the current image frame.
     * If the animation reaches the end, it clears the interval and triggers the end-of-animation logic.
     *
     * @param {number} currentImage - The current frame index of the impact animation.
     * @param {number} animation - The interval ID for the animation, used to clear the interval when done.
     * @returns {number} The updated frame index after processing the current step.
     */
    isBottleImpact(currentImage, animation) {
        if (currentImage < this.throwImagesImpact.length) {
            this.img = this.imageCache[this.throwImagesImpact[currentImage]];
            currentImage++;
        } else {
            clearInterval(animation);
            let stopAnimation = [];
            stopAnimation = this.isAnimationEnd(stopAnimation);
        }
        return currentImage;
    }

    /**
     * Checks if the animation has ended for this throwable object.
     * If the object exists in the world's throwableObject array, it removes it from the array.
     *
     * @param {Array} stopAnimation - The array of throwable objects to potentially update.
     * @returns {Array} The updated array of throwable objects after removal.
     */
    isAnimationEnd(stopAnimation) {
        if (this.world && this.world.throwableObject) {
            stopAnimation = this.world.throwableObject;
            stopAnimation.splice(stopAnimation.indexOf(this), 1);
        }
        return stopAnimation;
    }

    /**
     * Stops the animation for the throwable object when moving in the other direction.
     * Clears the interval responsible for the flying animation if it exists.
     */
    stopAnimationtOtherDirection() {
        if (this.flyInterval) {
            clearInterval(this.flyInterval);
        }
    }
};