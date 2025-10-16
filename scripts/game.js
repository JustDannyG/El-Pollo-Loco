let canvas;
let world;
let keyboard = new Keyboard();
let fullscreen = false;
let audio = new Audio('./audio/265615__zagi2__loca-salsa-2.wav');

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

function mute() {
    changeIconToMuteIcon();
    audio.pause(); 
}

function changeIconToMuteIcon() {
    let audioIcon = document.getElementById('audioIcon');
    if (audioIcon) audioIcon.style.display = 'none';
    let muteIcon = document.getElementById('muteIcon');
    if (muteIcon) muteIcon.style.display = 'block';
}

function unmute() {
    changeIconToUnmuteIcon();
    audio.loop = true; 
    audio.play(); 
}

function changeIconToUnmuteIcon() {
    let audioIcon = document.getElementById('audioIcon');
    if (audioIcon) audioIcon.style.display = 'block';
    let muteIcon = document.getElementById('muteIcon');
    if (muteIcon) muteIcon.style.display = 'none';
}

/**
 * Requests the browser to display the element with the ID 'fullscreen' in fullscreen mode.
 * Applies necessary fullscreen styles and hides small screen buttons before entering fullscreen.
 * Handles cross-browser compatibility for the fullscreen API.
 */
function openFullscreen() {
    addFullscreenStyle();
    hideFullscreenBtnAddSmallscreenBtn();
    hideImpressum();
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
    addFullscreenBtnHideSmallscreenBtn();
    showImpressum();
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
    canvas.style.width = '730px';
    canvas.style.height = '490px';
};

/**
 * Hides the fullscreen button and shows the small screen button in the UI.
 * 
 * This function selects elements with the IDs 'fullscreenBtn' and 'smallScreenBtn'.
 * If the fullscreen button exists, it will be hidden.
 * If the small screen button exists, it will be shown.
 */
function hideFullscreenBtnAddSmallscreenBtn() {
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
function addFullscreenBtnHideSmallscreenBtn() {
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
 * Checks if the current device is mobile based on the window width and manages UI elements accordingly.
 * - Shows or hides mobile controls, overlays, and other elements depending on device type and fullscreen state.
 * - Hides the impressum on mobile or when in fullscreen mode on desktop.
 * - Shows the impressum only on desktop when not in fullscreen mode.
 */
function checkIfMobile() {
    let isMobileWidth = window.innerWidth <= 1024;
    let isFullscreenActive = () =>
        fullscreen
        || document.fullscreenElement
        || document.webkitFullscreenElement
        || document.mozFullScreenElement
        || document.msFullscreenElement;
    if (isMobileWidth) {
        mobileOverlay();
    } else {
        notMobileOverlay(isFullscreenActive);
    }
};

function notMobileOverlay(isFullscreenActive) {
    hideMobileControls();
    hideOverlayOnMobile();
    showElements();
    if (!isFullscreenActive()) {
        showImpressum();
    } else {
        hideImpressum();
    }
}

function mobileOverlay() {
    showMobileControls();
    showOverlayOnMobile();
    hideElements();
    hideImpressum();
}

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
    let fullscreenImg = document.getElementById('fullscreenImg');
    if (fullscreenImg) fullscreenImg.style.display = 'none';
    hideImpressum();
}

function hideImpressum() {
    let impressum = document.getElementById('impressum');
    if (impressum) impressum.style.display = 'none';
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
    showImpressum();
    let guideMainContainer = document.getElementById('guideMainContainer');
    if (guideMainContainer) guideMainContainer.style.display = 'flex';
    let howToStartGame = document.getElementById('howToStartGame');
    if (howToStartGame) howToStartGame.style.display = 'block';
    let h1Element = document.querySelector('h1');
    if (h1Element) h1Element.style.display = 'block';
    let fullscreenImg = document.getElementById('fullscreenImg');
    if (fullscreenImg) fullscreenImg.style.display = 'block';
}

function showImpressum() {
    let impressum = document.getElementById('impressum');
    if (impressum) impressum.style.display = 'flex';
}

/**
 * Displays the Impressum modal by removing the 'hidden' class from the modal element.
 * Assumes there is an element with the ID 'impressumModal' in the DOM.
 */
function openImpressum() {
    let modal = document.getElementById('impressumModal');
    if (modal) modal.classList.remove('hidden');
};

/**
 * Closes the Impressum modal by adding the 'hidden' class to its element.
 * Checks if the modal element with the ID 'impressumModal' exists before attempting to hide it.
 */
function closeImpressum() {
    let modal = document.getElementById('impressumModal');
    if (modal) modal.classList.add('hidden');
};