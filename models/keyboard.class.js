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
     * Adds keyboard event listeners to handle key press and release actions.
     * Calls internal methods to set key states to true or false based on user input.
     */
    addKeyboardListeners() {
        this.setKeyTrue();
        this.setKeyFalse();
    };

    /**
     * Adds an event listener to the window that listens for keyup events.
     * Sets the corresponding keyboard control property to false based on the released key:
     * - 'A' (keyCode 65): sets `keyboard.left` to false
     * - 'D' (keyCode 68): sets `keyboard.right` to false
     * - Space (keyCode 32): sets `keyboard.jump` to false
     * - 'W' (keyCode 87): sets `keyboard.throw` to false
     */
    setKeyFalse() {
        window.addEventListener("keyup", (event) => {
            if (event.keyCode == 65) keyboard.left = false;
            if (event.keyCode == 68) keyboard.right = false;
            if (event.keyCode == 32) keyboard.jump = false;
            if (event.keyCode == 87) keyboard.throw = false;
        });
    }

    /**
     * Adds a keydown event listener to the window that sets specific properties
     * on the `keyboard` object to `true` based on the pressed key:
     * - 'A' (keyCode 65): sets `keyboard.left` to true
     * - 'D' (keyCode 68): sets `keyboard.right` to true
     * - Space (keyCode 32): sets `keyboard.jump` to true
     * - 'W' (keyCode 87): sets `keyboard.throw` to true
     */
    setKeyTrue() {
        window.addEventListener("keydown", (event) => {
            if (event.keyCode == 65) keyboard.left = true;
            if (event.keyCode == 68) keyboard.right = true;
            if (event.keyCode == 32) keyboard.jump = true;
            if (event.keyCode == 87) keyboard.throw = true;
        });
    }

    /**
     * Registers event handlers for key press actions including left, right, jump, and throw buttons.
     * Calls internal methods to handle each specific key press event.
     */
    addKeyPressEvents() {
        this.handleLeftBtn();
        this.handleRightBtn();
        this.handleJumpBtn();
        this.handleThrowBtn();
    };

    /**
     * Attaches touch event listeners to the 'throwBtn' element to handle throw actions.
     * Sets the `throw` property to `true` on touchstart and to `false` on touchend.
     * Prevents the default touch behavior for both events.
     */
    handleThrowBtn() {
        document.getElementById('throwBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.throw = true;
        });
        document.getElementById('throwBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.throw = false;
        });
    }

    /**
     * Attaches touch event listeners to the jump button element.
     * Sets the `jump` property to `true` on touch start and to `false` on touch end.
     * Prevents the default touch behavior for both events.
     */
    handleJumpBtn() {
        document.getElementById('jumpBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.jump = true;
        });
        document.getElementById('jumpBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.jump = false;
        });
    }

    /**
     * Attaches touch event listeners to the right button element.
     * Sets the `right` property to `true` on touch start and to `false` on touch end.
     * Prevents default touch behavior for both events.
     */
    handleRightBtn() {
        document.getElementById('rightBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.right = true;
        });
        document.getElementById('rightBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.right = false;
        });
    }

    /**
     * Attaches touch event listeners to the left button element.
     * Sets the `left` property to `true` on touchstart and to `false` on touchend.
     * Prevents the default touch behavior for both events.
     */
    handleLeftBtn() {
        document.getElementById('leftBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.left = true;
        });
        document.getElementById('leftBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.left = false;
        });
    }
};