class Keyboard {
    left = false;
    right = false;
    jump = false;
    throw = false;

    /**
     * Initializes the keyboard event listeners.
     * - Adds general keyboard listeners.
     * - Ensures key press events are added after the DOM is fully loaded.
     */
    constructor() {
        this.addKeyboardListeners();
        if (document.readyState === 'loading') {
            window.addEventListener('DOMContentLoaded', () => this.addKeyPressEvents());
        } else {
            this.addKeyPressEvents();
        }
    }

    /**
     * Adds event listeners for keyboard input to control game actions.
     * 
     * Listens for "keydown" and "keyup" events on the window object and updates the
     * corresponding properties on the `keyboard` object:
     * - A (keyCode 65): Move left
     * - D (keyCode 68): Move right
     * - Space (keyCode 32): Jump
     * - W (keyCode 87): Throw
     *
     * @method
     */
    addKeyboardListeners() {
        window.addEventListener("keydown", (event) => {
            if (event.keyCode == 65) {
                keyboard.left = true;
            }
            if (event.keyCode == 68) {
                keyboard.right = true;
            }
            if (event.keyCode == 32) {
                keyboard.jump = true;
            }
            if (event.keyCode == 87) {
                keyboard.throw = true;
            }
        });

        window.addEventListener("keyup", (event) => {
            if (event.keyCode == 65) {
                keyboard.left = false;
            }
            if (event.keyCode == 68) {
                keyboard.right = false;
            }
            if (event.keyCode == 32) {
                keyboard.jump = false;
            }
            if (event.keyCode == 87) {
                keyboard.throw = false;
            }
        });
    };

    /**
     * Adds touch event listeners to control buttons for mobile input.
     * 
     * Binds 'touchstart' and 'touchend' events to the left, right, jump, and throw buttons,
     * updating the corresponding properties (`left`, `right`, `jump`, `throw`) on the class instance.
     * Prevents default touch behavior to ensure smooth game controls.
     *
     * @returns {void}
     */
    addKeyPressEvents() {
        document.getElementById('leftBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.left = true;
        });
        document.getElementById('leftBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.left = false;
        });
        document.getElementById('rightBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.right = true;
        });
        document.getElementById('rightBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.right = false;
        });
        document.getElementById('jumpBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.jump = true;
        });
        document.getElementById('jumpBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.jump = false;
        });
        document.getElementById('throwBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.throw = true;
        });
        document.getElementById('throwBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.throw = false;
        });
    };
};