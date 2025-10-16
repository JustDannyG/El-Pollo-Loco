class Endboss extends MovableObject {

    y = 88;
    x = 6500;
    height = 330;
    width = 300;
    energy = 100;

    imagesWalking = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    imagesAlert = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    imagesAttack = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    imagesHurt = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    imagesDead = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    /**
     * Creates an instance of the Endboss class.
     * Initializes the offset for collision detection, sets the death falling state,
     * loads all necessary images, sets the movement speed, applies gravity, and starts animation.
     *
     * @constructor
     */
    constructor() {
        super();
        this.offset = {
            top: 40,
            left: 20,
            right: 20,
            bottom: 20
        };
        this.deathFallingStarted = false;
        this.loadAllImages();
        this.speed = 10;
        this.applyGravity();
        this.animate();
    }

    /**
     * Loads all image assets required for the Endboss character, including walking, alert, attack, hurt, and dead states.
     * The method ensures the first walking image is loaded individually before loading the rest of the images for each state.
     */
    loadAllImages() {
        this.loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesAlert);
        this.loadImages(this.imagesAttack);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
    }

    /**
     * Animates the endboss character by updating its movement and playing the appropriate animations.
     * Calls internal methods to handle movement logic and animation playback.
     */
    animate() {
        this.isMoveLeft();
        this.isPlayAnimations();
    }

    /**
     * Starts the animation loop for the endboss character.
     * Depending on the endboss's state (dead, hurt, alert, or walking),
     * plays the corresponding animation at a fixed interval.
     * - Plays dead animation if the endboss is dead.
     * - Plays hurt animation if the endboss is hurt.
     * - Plays alert animation if the player is within 360 units.
     * - Otherwise, plays walking animation.
     * 
     * @returns {void}
     */
    isPlayAnimations() {
        setInterval(() => {
            if (this.isDead()) return this.isDeadAnimation();
            if (this.isHurt()) return this.isHurtAnimation();
            let distance = Math.abs(this.x - this.world.character.x);
            if (distance <= 360) {
                this.playAnimation(this.imagesAlert);
            } else {
                this.playAnimation(this.imagesWalking);
            }
        }, 1000 / 10);
    }

    /**
     * Continuously checks if the endboss should move left based on its position relative to the character.
     * If the horizontal distance between the endboss and the character is greater than 360,
     * it sets the direction to left and initiates left movement.
     * The check is performed 20 times per second.
     */
    isMoveLeft() {
        setInterval(() => {
            if (this.x - this.world.character.x > 360) {
                this.otherDirection = false;
                this.moveLeft();
            }
        }, 1000 / 20);
    }

    /**
     * Plays the hurt animation for the endboss and triggers an attack if the energy level
     * is at a specific threshold (80, 60, 40, or 20) and the endboss is not currently attacking.
     * Initiates the attack after a 500ms delay.
     *
     * @returns {void}
     */
    isHurtAnimation() {
        this.playAnimation(this.imagesHurt);
        this.playHurtAudio();
        if ((this.energy === 80 || this.energy === 60 || this.energy === 40 || this.energy === 20) && !this.attacking) {
            setTimeout(() => this.startAttack(), 500);
        }
        return;
    }

    playHurtAudio() {
        if (audioManager && audioManager.hurtAudioStatusEndboss == true) {
            this.hurtAudioEndboss.play();
        } else {
            this.hurtAudioEndboss.pause();
        }
    }

    /**
     * Plays the death animation for the endboss character.
     * Initiates the death falling sequence if it hasn't started yet.
     * 
     * @returns {void}
     */
    isDeadAnimation() {
        this.playAnimation(this.imagesDead);
        if (!this.deathFallingStarted) {
            this.deathFallingStarted = true;
            this.startDeathFall();
        }
        return;
    }

    /**
     * Initiates the death fall animation for the endboss character.
     * Continuously increases the vertical position (`y`) by 5 pixels at a rate of 60 frames per second,
     * simulating a falling motion.
     *
     * @returns {void}
     */
    startDeathFall() {
        setInterval(() => {
            this.y += 5;
        }, 1000 / 60);
        this.playDeadAudio();
    }

    playDeadAudio() {
        if (audioManager && audioManager.deadAudioStatusEndboss == true) {
            this.deadAudioEndboss.play();
        } else {
            this.deadAudioEndboss.pause();
        }
    }

    /**
     * Initiates the attack sequence for the endboss character.
     * Plays the attack animation, sets the vertical speed, and triggers a series of leftward movements.
     *
     * The attack consists of 12 rapid leftward movements, each triggered at 16ms intervals.
     */
    startAttack() {
        this.playAnimation(this.imagesAttack);
        this.speedY = 25;
        for (let i = 0; i < 12; i++) {
            setTimeout(() => this.moveLeft(), i * 16);
        }
    }
};