class Level {
    enemies;
    backgroundObjects;
    clouds;
    coins;
    bottles;
    level_end_x = 5000;
    endscreen;

    constructor(enemies, backgroundObjects, clouds, coins, bottles, endscreen) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
        this.endscreen = endscreen;
    }
};