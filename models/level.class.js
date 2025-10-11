class Level {
    enemies;
    backgroundObjects;
    clouds;
    coins;
    bottles;
    level_end_x = 5000;

    /**
     * Creates an instance of the Level class.
     * @param {Array} enemies - The array of enemy objects in the level.
     * @param {Array} backgroundObjects - The array of background objects for the level.
     * @param {Array} clouds - The array of cloud objects in the level.
     * @param {Array} coins - The array of coin objects in the level.
     * @param {Array} bottles - The array of bottle objects in the level.
     */
    constructor(enemies, backgroundObjects, clouds, coins, bottles) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
    }
};