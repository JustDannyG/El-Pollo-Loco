let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    // global flag to indicate the game should stop (used by end screens)
    window.gameStopped = false;
    world = new World(canvas, keyboard);
};

window.addEventListener("keydown", (event) => {
    // ignore input when the game is stopped
    if (window.gameStopped) return;
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
    // ignore input when the game is stopped
    if (window.gameStopped) return;
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