class Keyboard {
    left = false;
    right = false;
    jump = false;
    throw = false;

    constructor() {
        this.addKeyboardListeners();
        if (document.readyState === 'loading') {
            window.addEventListener('DOMContentLoaded', () => this.addKeyPressEvents());
        } else {
            this.addKeyPressEvents();
        }
    }

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