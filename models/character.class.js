class Character extends MovableObject {
    height = 320;
    width = 160;
    speed = 10;
    world;
    energy = 100;
    idleTicks = 0;
    idleThreshold = 40;

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

    constructor() {
        super();
        this.offset = {
            top: 140,
            left: 25,
            right: 25,
            bottom: 10
        };
        this.deathFallingStarted = false;
        this.loadAllImages();
        this.applyGravity();
        this.animate();
    };

    loadAllImages() {
        this.loadImage(this.imagesIdle[0]);
        this.loadImages(this.imagesIdle);
        this.loadImages(this.imagesIdleLong);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesJumping);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
    };

    animate() {
        this.reasonForAnimation();
        this.startAnimation();
    };

    reasonForAnimation() {
        setInterval(() => {
            this.isMoveRight();
            this.isMoveLeft();
            this.isJumping();
            this.world.camera_x = -this.x + 120;
        }, 1000 / 60);
    }

    isJumping() {
        if (this.world.keyboard.jump && !this.isAboveGround()) {
            this.jump();
        }
    }

    isMoveLeft() {
        if (this.world.keyboard.left && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
        }
    }

    isMoveRight() {
        if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
        }
    }

    startAnimation() {
        setInterval(() => {
            if (this.isDead()) {
                this.playDeadAnimation();
            } else if (this.isHurt()) {
                this.idleTicks = 0;
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

    playIdleAnimations() {
        this.idleTicks++;
        if (this.idleTicks >= this.idleThreshold) {
            this.playAnimation(this.imagesIdleLong);
        } else {
            this.playAnimation(this.imagesIdle);
        }
    }

    playDeadAnimation() {
        this.idleTicks = 0;
        this.playAnimation(this.imagesDead);
        if (!this.deathFallingStarted) {
            this.deathFallingStarted = true;
            this.startDeathFall();
        }
    }

    startDeathFall() {
        setInterval(() => {
            this.y += 5;
        }, 1000 / 60);
    }
};