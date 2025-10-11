let canvas;
let world;
let keyboard = new Keyboard();
let fullscreen = false;


function init() {
    canvas = document.getElementById('canvas');
    checkIfMobile();
    handleOrientationChange(mediaQuery);
    if (world && world.stop) {
        world.stop();
    }
    world = new World(canvas, keyboard);
};

function openFullscreen() {
    addFullscreenStyle();
    addFullscreenBtnHideSmallscreenBtn();
    let el = document.getElementById('fullscreen');
    if (el.requestFullscreen) {
        el.requestFullscreen();
    } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
    } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen();
    } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
    }
}

function closeFullscreen() {
    addSmallscreenStyle();
    hideFullscreenBtnAddSmallscreenBtn();
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    };
};

function addFullscreenStyle() {
    fullscreen = true;
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
};

function addSmallscreenStyle() {
    fullscreen = false;
    canvas.style.width = '720px';
    canvas.style.height = '480px';
};

function addFullscreenBtnHideSmallscreenBtn() {
    let fsBtn = document.getElementById('fullscreenBtn');
    let smallBtn = document.getElementById('smallScreenBtn');
    if (fsBtn) fsBtn.style.display = 'none';
    if (smallBtn) smallBtn.style.display = 'block';
};

function hideFullscreenBtnAddSmallscreenBtn() {
    let fsBtn = document.getElementById('fullscreenBtn');
    let smallBtn = document.getElementById('smallScreenBtn');
    if (fsBtn) fsBtn.style.display = 'block';
    if (smallBtn) smallBtn.style.display = 'none';
};


let mediaQuery = window.matchMedia("(orientation: landscape)");

mediaQuery.addEventListener("change", handleOrientationChange);

function handleOrientationChange(e) {
    if (e.matches) {
        console.log("Device is in landscape mode (on its side)");
        hideOverlayOnMobile();
    } else {
        console.log("Device is in portrait mode");
        showOverlayOnMobile();
    }
}

['resize', 'orientationchange'].forEach(event =>
    window.addEventListener(event, checkIfMobile)
);

function checkIfMobile() {
    let isMobileWidth = window.innerWidth <= 932;
    //let isMobileHeight = window.innerHeight <= 480;
    if (isMobileWidth /* && isMobileHeight */) {
        showMobileControls();
        showOverlayOnMobile();
        hideElements();
    } else {
        hideMobileControls();
        hideOverlayOnMobile();
        showElements();
    }
};


function showMobileControls() {
    let mobileControls = document.getElementById('mobileControls');
    if (mobileControls) mobileControls.style.display = 'flex';
};

function showOverlayOnMobile() {
    let overlay = document.getElementById('overlay');
    if (overlay) overlay.style.display = 'block';
};

function hideElements() {
    let guideMainContainer = document.getElementById('guideMainContainer');
    if (guideMainContainer) guideMainContainer.style.display = 'none';
    let howToStartGame = document.getElementById('howToStartGame');
    if (howToStartGame) howToStartGame.style.display = 'none';
    let h1Element = document.querySelector('h1');
    if (h1Element) h1Element.style.display = 'none';
}


function hideMobileControls() {
    let mobileControls = document.getElementById('mobileControls');
    if (mobileControls) mobileControls.style.display = 'none';
};

function hideOverlayOnMobile() {
    let overlay = document.getElementById('overlay');
    if (overlay) overlay.style.display = 'none';
};

function showElements() {
    let guideMainContainer = document.getElementById('guideMainContainer');
    if (guideMainContainer) guideMainContainer.style.display = 'flex';
    let howToStartGame = document.getElementById('howToStartGame');
    if (howToStartGame) howToStartGame.style.display = 'block';
    let h1Element = document.querySelector('h1');
    if (h1Element) h1Element.style.display = 'block';
}