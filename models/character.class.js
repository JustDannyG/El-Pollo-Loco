class Character extends MovableObject {

    height = 320;
    width = 160;
    speed = 10;
    world;
    energy = 100;
    idleTicks = 0;
    idleThreshold = 50;
    hurtAudio;
    jumpAudio;
    deadAudio;

    imagesIdle = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    imagesIdleLong = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    imagesWalking = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];
    imagesJumping = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];
    imagesHurt = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png',
    ];
    imagesDead = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * Initializes a new instance of the Character class.
     * Sets up the offset for collision detection, initializes the death falling state,
     * loads all character images, applies gravity, and starts the animation loop.
     */
    constructor() {
        super();
        this.offset = {
            top: 140,
            left: 45,
            right: 45,
            bottom: 10
        };
        this.deathFallingStarted = false;
        this.loadAllImages();
        this.loadAudios();
        this.applyGravity();
        this.animate();
    };

    /**
     * Loads audio files for character actions (hurt, jump, dead) and initializes their Audio objects.
     * The audio files are preloaded for immediate playback.
     */
    loadAudios() {
        this.hurtAudio = new Audio('./audio/795690__randbsoundbites__death-cry (1).wav');
        this.hurtAudio.load();
        this.jumpAudio = new Audio('./audio/345437__artmasterrich__male_jump_01.wav');
        this.jumpAudio.load();
        this.deadAudio = new Audio('./audio/796567__randbsoundbites__character-death.wav');
        this.deadAudio.load();
    }

    /**
     * Loads all character animation images into memory.
     * This includes idle, long idle, walking, jumping, hurt, and dead animation frames.
     * Ensures that all necessary images are preloaded for smooth character animation.
     */
    loadAllImages() {
        this.loadImage(this.imagesIdle[0]);
        this.loadImages(this.imagesIdle);
        this.loadImages(this.imagesIdleLong);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesJumping);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
    };

    /**
     * Triggers the character's animation sequence.
     * Calls internal methods to determine the reason for animation and to start the animation process.
     */
    animate() {
        this.reasonForAnimation();
        this.startAnimation();
    };

    /**
     * Continuously updates the character's animation state and camera position.
     * 
     * This method sets up a recurring interval (60 times per second) to:
     * - Check and update if the character is moving right.
     * - Check and update if the character is moving left.
     * - Check and update if the character is jumping.
     * - Adjust the world's camera position based on the character's current x-coordinate.
     *
     * @returns {void}
     */
    reasonForAnimation() {
        setInterval(() => {
            this.isMoveRight();
            this.isMoveLeft();
            this.isJumping();
            this.world.camera_x = -this.x + 120;
        }, 1000 / 60);
    }


    /**
     * Checks if the jump key is pressed and the character is on the ground.
     * If both conditions are met, initiates the jump action.
     *
     * @returns {void}
     */
    isJumping() {
        if (this.world.keyboard.jump && !this.isAboveGround()) {
            this.jump();
        }
    }

    /**
     * Checks if the left movement key is pressed and the character's x position is greater than -720.
     * If so, moves the character to the left and sets the direction flag.
     *
     * @returns {void}
     */
    isMoveLeft() {
        if (this.world.keyboard.left && this.x > -720) {
            this.moveLeft();
            this.otherDirection = true;
        }
    }

    /**
     * Checks if the right movement key is pressed and the character has not reached the level's end.
     * If so, moves the character to the right and sets the direction flag accordingly.
     */
    isMoveRight() {
        if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
        }
    }

    /**
     * Starts the character's animation loop, updating the animation state every 100ms.
     * The animation played depends on the character's current state:
     * - Plays dead animation if the character is dead.
     * - Plays hurt animation if the character is hurt.
     * - Plays jumping animation if the character is above ground.
     * - Plays walking animation if the character is moving left or right.
     * - Plays idle animations otherwise.
     * Resets idle tick counter when the character is not idle.
     */
    startAnimation() {
        setInterval(() => {
            if (this.isDead()) {
                this.playDeadAnimation();
            } else if (this.isHurt()) {
                this.idleTicks = 0;
                this.playHurtAudio();
                this.playAnimation(this.imagesHurt);
            } else if (this.isAboveGround()) {
                this.idleTicks = 0;
                this.playAnimation(this.imagesJumping);
            } else if (this.world.keyboard.right || this.world.keyboard.left) {
                this.idleTicks = 0;
                this.playAnimation(this.imagesWalking);
            } else {
                this.playIdleAnimations();
            }
        }, 1000 / 10);
    }

    /**
     * Plays or pauses the character's hurt audio based on the audio manager's status.
     *
     * If `audioManager.hurtAudioStatusCharacter` is `true`, the hurt audio is played.
     * Otherwise, the hurt audio is paused.
     */
    playHurtAudio() {
        if (audioManager && audioManager.hurtAudioStatusCharacter == true) {
            this.hurtAudio.play();
        } else {
            this.hurtAudio.pause();
        }
    }

    /**
     * Initiates a jump by setting the vertical speed.
     * Sets the object's vertical speed (`speedY`) to 36, causing it to move upward.
     */
    jump() {
        this.speedY = 36;
        this.playJumpAudio();
    };

    /**
     * Plays or pauses the character's jump audio based on the audio manager's jump audio status.
     * If `audioManager.jumpAudioStatusCharacter` is `true`, the jump audio is played; otherwise, it is paused.
     */
    playJumpAudio() {
        if (audioManager && audioManager.jumpAudioStatusCharacter == true) {
            this.jumpAudio.play();
        } else {
            this.jumpAudio.pause();
        }
    }

    /**
     * Plays the appropriate idle animation based on the number of idle ticks.
     * If the idleTicks counter exceeds or equals the idleThreshold, plays the long idle animation.
     * Otherwise, plays the regular idle animation.
     *
     * @method
     */
    playIdleAnimations() {
        this.idleTicks++;
        if (this.idleTicks >= this.idleThreshold) {
            this.playAnimation(this.imagesIdleLong);
        } else {
            this.playAnimation(this.imagesIdle);
        }
    }

    /**
     * Triggers the dead animation sequence for the character.
     * Resets idle ticks, plays the dead animation, and initiates the death fall if it hasn't started yet.
     *
     * @returns {void}
     */
    playDeadAnimation() {
        this.idleTicks = 0;
        this.playAnimation(this.imagesDead);
        if (!this.deathFallingStarted) {
            this.deathFallingStarted = true;
            this.startDeathFall();
        }
    }

    /**
     * Initiates the character's death fall animation by continuously increasing the `y` position.
     * The position is updated every frame (approximately 60 times per second).
     * This simulates the character falling down after death.
     */
    startDeathFall() {
        setInterval(() => {
            this.y += 5;
        }, 1000 / 60);
        this.playDeadAudio();
    }

    /**
     * Plays or pauses the character's dead audio based on the audio manager's status.
     * If `audioManager.deadAudioStatusCharacter` is `true`, the dead audio is played.
     * Otherwise, the dead audio is paused.
     */
    playDeadAudio() {
        if (audioManager && audioManager.deadAudioStatusCharacter == true) {
            this.deadAudio.play();
        } else {
            this.deadAudio.pause();
        }
    }
};