let canvas;
let world;
let keyboard = new Keyboard();
let fullscreen = false;


/**
 * Initializes the game by setting up the canvas, checking for mobile devices,
 * handling orientation changes, stopping any existing game world, and creating a new game world instance.
 *
 * @function
 * @global
 */
function init() {
    canvas = document.getElementById('canvas');
    checkIfMobile();
    handleOrientationChange(mediaQuery);
    if (world && world.stop) {
        world.stop();
    }
    world = new World(canvas, keyboard);
};

/**
 * Requests the browser to display the element with the ID 'fullscreen' in fullscreen mode.
 * Applies necessary fullscreen styles and hides small screen buttons before entering fullscreen.
 * Handles cross-browser compatibility for the fullscreen API.
 */
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

/**
 * Exits fullscreen mode and updates the UI accordingly.
 * 
 * This function applies small screen styles, updates fullscreen/smallscreen buttons,
 * and attempts to exit fullscreen mode using the appropriate browser-specific API.
 */
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

/**
 * Sets the canvas element to fullscreen by adjusting its width and height to fill the viewport.
 * Also sets the `fullscreen` flag to true.
 *
 * @function
 * @global
 */
function addFullscreenStyle() {
    fullscreen = true;
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
};

/**
 * Sets the canvas to small screen mode by adjusting its width and height,
 * and disables fullscreen mode.
 *
 * @function
 * @returns {void}
 */
function addSmallscreenStyle() {
    fullscreen = false;
    canvas.style.width = '720px';
    canvas.style.height = '480px';
};

/**
 * Hides the fullscreen button and shows the small screen button in the UI.
 * 
 * This function selects elements with the IDs 'fullscreenBtn' and 'smallScreenBtn'.
 * If the fullscreen button exists, it will be hidden.
 * If the small screen button exists, it will be shown.
 */
function addFullscreenBtnHideSmallscreenBtn() {
    let fsBtn = document.getElementById('fullscreenBtn');
    let smallBtn = document.getElementById('smallScreenBtn');
    if (fsBtn) fsBtn.style.display = 'none';
    if (smallBtn) smallBtn.style.display = 'block';
};

/**
 * Toggles the display of fullscreen and small screen buttons.
 * Shows the fullscreen button and hides the small screen button if they exist in the DOM.
 *
 * @function
 */
function hideFullscreenBtnAddSmallscreenBtn() {
    let fsBtn = document.getElementById('fullscreenBtn');
    let smallBtn = document.getElementById('smallScreenBtn');
    if (fsBtn) fsBtn.style.display = 'block';
    if (smallBtn) smallBtn.style.display = 'none';
};


let mediaQuery = window.matchMedia("(orientation: landscape)");

mediaQuery.addEventListener("change", handleOrientationChange);

/**
 * Handles changes in device orientation by showing or hiding the mobile overlay.
 * 
 * @param {MediaQueryListEvent} e - The event object representing the change in media query state.
 */
function handleOrientationChange(e) {
    if (e.matches) {
        hideOverlayOnMobile();
    } else {
        showOverlayOnMobile();
    }
}

['resize', 'orientationchange'].forEach(event =>
    window.addEventListener(event, checkIfMobile)
);

/**
 * Checks if the current window width indicates a mobile device.
 * If on mobile, displays mobile controls and overlays, and hides certain elements.
 * If not on mobile, hides mobile controls and overlays, and shows those elements.
 */
function checkIfMobile() {
    let isMobileWidth = window.innerWidth <= 932;
    if (isMobileWidth) {
        showMobileControls();
        showOverlayOnMobile();
        hideElements();
    } else {
        hideMobileControls();
        hideOverlayOnMobile();
        showElements();
    }
};


/**
 * Displays the mobile controls by setting their display style to 'flex'.
 * Checks if the element with the ID 'mobileControls' exists before attempting to show it.
 */
function showMobileControls() {
    let mobileControls = document.getElementById('mobileControls');
    if (mobileControls) mobileControls.style.display = 'flex';
};

/**
 * Displays the overlay element on mobile devices by setting its display style to 'block'.
 * Assumes there is an element with the ID 'overlay' in the DOM.
 */
function showOverlayOnMobile() {
    let overlay = document.getElementById('overlay');
    if (overlay) overlay.style.display = 'block';
};

/**
 * Hides specific elements on the page by setting their display style to 'none'.
 * Targets elements with IDs 'guideMainContainer' and 'howToStartGame', as well as the first <h1> element found.
 */
function hideElements() {
    let guideMainContainer = document.getElementById('guideMainContainer');
    if (guideMainContainer) guideMainContainer.style.display = 'none';
    let howToStartGame = document.getElementById('howToStartGame');
    if (howToStartGame) howToStartGame.style.display = 'none';
    let h1Element = document.querySelector('h1');
    if (h1Element) h1Element.style.display = 'none';
}


/**
 * Hides the mobile controls element by setting its display style to 'none'.
 * Checks if the element with the ID 'mobileControls' exists before attempting to hide it.
 */
function hideMobileControls() {
    let mobileControls = document.getElementById('mobileControls');
    if (mobileControls) mobileControls.style.display = 'none';
};

/**
 * Hides the overlay element on mobile devices by setting its display style to 'none'.
 * Assumes the overlay element has the ID 'overlay'.
 */
function hideOverlayOnMobile() {
    let overlay = document.getElementById('overlay');
    if (overlay) overlay.style.display = 'none';
};

/**
 * Displays specific UI elements by setting their display styles.
 * - Shows the main guide container as a flex container.
 * - Displays the "how to start game" element as a block.
 * - Ensures the first <h1> element is visible.
 *
 * Elements are selected by their IDs or tag name. If an element is not found, it is skipped.
 */
function showElements() {
    let guideMainContainer = document.getElementById('guideMainContainer');
    if (guideMainContainer) guideMainContainer.style.display = 'flex';
    let howToStartGame = document.getElementById('howToStartGame');
    if (howToStartGame) howToStartGame.style.display = 'block';
    let h1Element = document.querySelector('h1');
    if (h1Element) h1Element.style.display = 'block';
}