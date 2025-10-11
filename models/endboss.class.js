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

    constructor() {
        super();
        this.offset = {
            top: 40,
            left: 30,
            right: 30,
            bottom: 20
        };
        this.deathFallingStarted = false;
        this.loadAllImages();
        this.speed = 10;
        this.applyGravity();
        this.animate();
    }

    loadAllImages() {
        this.loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesAlert);
        this.loadImages(this.imagesAttack);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
    }

    animate() {
        setInterval(() => {
            if (this.x - this.world.character.x > 360) {
                this.otherDirection = false;
                this.moveLeft();
            }
        }, 1000 / 20);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.imagesDead);
                if (!this.deathFallingStarted) {
                    this.deathFallingStarted = true;
                    this.startDeathFall();
                }
                return;
            }
            if (this.isHurt()) {
                this.playAnimation(this.imagesHurt);
                if ((this.energy === 80 || this.energy === 60 || this.energy === 40 || this.energy === 20) && !this.attacking) {
                    setTimeout(() => this.startAttack(), 500);
                }
                return;
            }
            if (!this.world || !this.world.character) {
                this.playAnimation(this.imagesWalking);
                return;
            }
            let distance = Math.abs(this.x - this.world.character.x);
            if (distance <= 360) {
                this.playAnimation(this.imagesAlert);
            } else {
                this.playAnimation(this.imagesWalking);
            }
        }, 1000 / 10);
    }

    startDeathFall() {
        setInterval(() => {
            this.y += 5;
        }, 1000 / 60);
    }

    startAttack() {
        this.playAnimation(this.imagesAttack);
        this.speedY = 25;
        for (let i = 0; i < 12; i++) {
            setTimeout(() => this.moveLeft(), i * 16);
        }
    }
};