class AudioManager {
    hurtAudioStatusEndboss = false;
    deadAudioStatusEndboss = false;
    bottleSplashAudioStatus = false;
    hurtAudioStatusCharacter = false;
    jumpAudioStatusCharacter = false;
    deadAudioStatusCharacter = false;
    mainMusicAudioStatus = false;

    /**
     * Initializes a new instance of the audio manager.
     *
     * Sets up the primary audio element with a default audio source and enables looping.
     * Prepares internal state and handler references used to manage resuming playback
     * after a required user gesture, then attempts to restore audio settings from
     * localStorage by calling getAudioFromLocalStorage().
     *
     * @constructor
     * @property {HTMLAudioElement} mainAudio - The primary audio element used for playback.
     * @property {boolean} waitingForUserGesture - Whether the manager is waiting for a user gesture to resume audio.
     * @property {?Function} resumeClickHandler - Click handler reference for resuming audio, or null.
     * @property {?Function} resumeKeydownHandler - Keydown handler reference for resuming audio, or null.
     * @property {?Function} resumeTouchHandler - Touch handler reference for resuming audio, or null.
     * @see #getAudioFromLocalStorage
     */
    constructor() {
        this.mainAudio = new Audio('./audio/265615__zagi2__loca-salsa-2.wav');
        this.mainAudio.loop = true;
        this.waitingForUserGesture = false;
        this.resumeClickHandler = null;
        this.resumeKeydownHandler = null;
        this.resumeTouchHandler = null;
        this.getAudioFromLocalStorage();
    }

    /**
     * Mute handler: updates UI and internal state, pauses playback, and persists the change.
     *
     * Performs the following side effects:
     *  - Changes the audio control icon to the muted icon.
     *  - Pauses the main audio element.
     *  - Initiates any logic that waits for the next user interaction (e.g., to re-enable audio).
     *  - Sets the in-memory audio status to "false" (muted/off).
     *  - Saves the updated audio status to localStorage.
     *
     * @returns {void}
     */
    mute() {
        this.changeIconToMuteIcon();
        this.mainAudio.pause();
        this.waitForUserInteract();
        this.setAudioStatusFalse();
        this.saveDataToLocalStorage();
    }

    /**
     * Finalizes the "wait for user gesture" flow by removing event listeners and clearing
     * temporary resume handler references so the instance is no longer in a waiting state.
     *
     * When the instance is currently waiting for a user gesture, this method:
     *  - calls removeListeners() to unregister any previously attached event listeners,
     *  - nulls out stored resume handlers (e.g. resumeClickHandler, resumeKeydownHandler, resumeTouchHandler),
     *  - sets waitingForUserGesture to false.
     *
     * If the instance is not waiting for a user gesture, the method is a no-op.
     *
     * @private
     * @returns {void}
     */
    waitForUserInteract() {
        if (this.waitingForUserGesture) {
            this.removeListeners();
            this.resumeClickHandler = null;
            this.resumeKeydownHandler = null;
            this.resumeTouchHandler = null;
            this.waitingForUserGesture = false;
        }
    }

    /**
     * Removes previously added event listeners for 'click', 'keydown', and 'touchstart' events
     * from the window object. This helps prevent memory leaks and unwanted behavior
     * by ensuring that the associated handlers are no longer invoked.
     *
     * @method removeListeners
     */
    removeListeners() {
        window.removeEventListener('click', this.resumeClickHandler);
        window.removeEventListener('keydown', this.resumeKeydownHandler);
        window.removeEventListener('touchstart', this.resumeTouchHandler);
    }

    /**
     * Resets all audio status flags to false.
     * This method disables all audio status indicators for endboss, character, bottle splash, and main music.
     */
    setAudioStatusFalse() {
        this.hurtAudioStatusEndboss = false;
        this.deadAudioStatusEndboss = false;
        this.bottleSplashAudioStatus = false;
        this.hurtAudioStatusCharacter = false;
        this.jumpAudioStatusCharacter = false;
        this.deadAudioStatusCharacter = false;
        this.mainMusicAudioStatus = false;
    }

    /**
     * Unmutes the audio by updating the UI icon, playing the main audio,
     * setting the audio status to true, and saving the state to local storage.
     */
    unmute() {
        this.changeIconToUnmuteIcon();
        this.playMainAudio();
        this.setAudioStatusTrue();
        this.saveDataToLocalStorage();
    }

    /**
     * Attempts to play the main audio. If playback fails due to lack of user gesture,
     * sets a flag and attaches event listeners to resume playback when a user gesture occurs.
     *
     * @returns {void}
     */
    playMainAudio() {
        this.mainAudio.play().catch(() => {
            if (this.waitingForUserGesture) return;
            this.waitingForUserGesture = true;
            this.resumHandlers();
            this.addListeners();
        });
    }

    /**
     * Resumes audio event handlers by invoking click, keydown, and touch handlers.
     * Typically used to re-enable audio controls after a pause or interruption.
     */
    resumHandlers() {
        this.clickHandler();
        this.keydownHandler();
        this.touchHandler();
    }

    /**
     * Sets up a touch event handler that resumes audio playback if the main music is active.
     * The handler plays the main audio and then clears any resume handlers.
     *
     * @function
     */
    touchHandler() {
        this.resumeTouchHandler = (e) => {
            if (this.mainMusicAudioStatus) this.mainAudio.play();
            this.clearResumeHandlers();
        };
    }

    /**
     * Sets up a handler to resume main audio playback when a key is pressed.
     * The handler checks if the main music audio is enabled and plays it.
     * After execution, it clears the resume handlers to prevent repeated triggers.
     */
    keydownHandler() {
        this.resumeKeydownHandler = (e) => {
            if (this.mainMusicAudioStatus) this.mainAudio.play();
            this.clearResumeHandlers();
        };
    }

    /**
     * Sets up a handler to resume audio playback when a click event occurs,
     * unless the click is on elements with IDs 'audioIcon' or 'muteIcon'.
     * If the main music audio is enabled, it will play the main audio.
     * Clears the resume handlers after execution.
     */
    clickHandler() {
        this.resumeClickHandler = (e) => {
            if (e && e.target && e.target.closest && e.target.closest('#audioIcon, #muteIcon')) {
                return;
            }
            if (this.mainMusicAudioStatus) this.mainAudio.play();
            this.clearResumeHandlers();
        };
    }

    /**
     * Adds event listeners to the window object for 'click', 'keydown', and 'touchstart' events.
     * Each listener will trigger its respective handler only once.
     * - 'click' event triggers `resumeClickHandler`
     * - 'keydown' event triggers `resumeKeydownHandler`
     * - 'touchstart' event triggers `resumeTouchHandler`
     */
    addListeners() {
        window.addEventListener('click', this.resumeClickHandler, { once: true });
        window.addEventListener('keydown', this.resumeKeydownHandler, { once: true });
        window.addEventListener('touchstart', this.resumeTouchHandler, { once: true });
    }

    /**
     * Removes event listeners for resuming audio playback from the window object.
     * Specifically, it detaches 'click', 'keydown', and 'touchstart' event handlers
     * that were previously added to handle resuming audio.
     */
    clearResumeHandlers() {
        window.removeEventListener('click', this.resumeClickHandler);
        window.removeEventListener('keydown', this.resumeKeydownHandler);
        window.removeEventListener('touchstart', this.resumeTouchHandler);
    }

    /**
     * Sets all audio status flags to true, enabling playback for various game sounds
     * such as character and endboss hurt, dead, jump, bottle splash, and main music.
     */
    setAudioStatusTrue() {
        this.hurtAudioStatusEndboss = true;
        this.deadAudioStatusEndboss = true;
        this.bottleSplashAudioStatus = true;
        this.hurtAudioStatusCharacter = true;
        this.jumpAudioStatusCharacter = true;
        this.deadAudioStatusCharacter = true;
        this.mainMusicAudioStatus = true;
    }

    /**
     * Saves the current audio status properties to localStorage under the key 'audioManagerState'.
     * The saved data includes the status of various audio elements such as endboss hurt/dead,
     * bottle splash, character hurt/jump/dead, and main music.
     *
     * @returns {void}
     */
    saveDataToLocalStorage() {
        let audioState = {
            hurtAudioStatusEndboss: this.hurtAudioStatusEndboss,
            deadAudioStatusEndboss: this.deadAudioStatusEndboss,
            bottleSplashAudioStatus: this.bottleSplashAudioStatus,
            hurtAudioStatusCharacter: this.hurtAudioStatusCharacter,
            jumpAudioStatusCharacter: this.jumpAudioStatusCharacter,
            deadAudioStatusCharacter: this.deadAudioStatusCharacter,
            mainMusicAudioStatus: this.mainMusicAudioStatus
        };
        localStorage.setItem('audioManagerState', JSON.stringify(audioState));
    }

    /**
     * Retrieves the audio manager state from local storage and applies it.
     * If a saved state exists, updates the current state and sets mute/unmute accordingly.
     *
     * @returns {void}
     */
    getAudioFromLocalStorage() {
        let audioState = JSON.parse(localStorage.getItem('audioManagerState'));
        if (audioState) {
            this.getState(audioState);
            this.setMuteOrUnmute();
        }
    }

    /**
     * Toggles the mute status of the main music audio.
     * If the audio is currently unmuted, it will be muted.
     * If the audio is currently muted, it will be unmuted.
     */
    setMuteOrUnmute() {
        if (this.mainMusicAudioStatus) {
            this.unmute();
        } else {
            this.mute();
        }
    }

    /**
     * Updates the audio status properties of the AudioManager instance
     * based on the provided audioState object.
     *
     * @param {Object} audioState - An object containing the current audio status values.
     * @param {boolean} audioState.hurtAudioStatusEndboss - Status of the endboss hurt audio.
     * @param {boolean} audioState.deadAudioStatusEndboss - Status of the endboss dead audio.
     * @param {boolean} audioState.bottleSplashAudioStatus - Status of the bottle splash audio.
     * @param {boolean} audioState.hurtAudioStatusCharacter - Status of the character hurt audio.
     * @param {boolean} audioState.jumpAudioStatusCharacter - Status of the character jump audio.
     * @param {boolean} audioState.deadAudioStatusCharacter - Status of the character dead audio.
     * @param {boolean} audioState.mainMusicAudioStatus - Status of the main music audio.
     */
    getState(audioState) {
        this.hurtAudioStatusEndboss = audioState.hurtAudioStatusEndboss;
        this.deadAudioStatusEndboss = audioState.deadAudioStatusEndboss;
        this.bottleSplashAudioStatus = audioState.bottleSplashAudioStatus;
        this.hurtAudioStatusCharacter = audioState.hurtAudioStatusCharacter;
        this.jumpAudioStatusCharacter = audioState.jumpAudioStatusCharacter;
        this.deadAudioStatusCharacter = audioState.deadAudioStatusCharacter;
        this.mainMusicAudioStatus = audioState.mainMusicAudioStatus;
    }

    /**
     * Changes the displayed audio icon to the mute icon.
     * Hides the audio icon and shows the mute icon by updating their display styles.
     */
    changeIconToMuteIcon() {
        let audioIcon = document.getElementById('audioIcon');
        audioIcon.style.display = 'none';
        let muteIcon = document.getElementById('muteIcon');
        muteIcon.style.display = 'block';
    }

    /**
     * Changes the audio icon to the unmute icon by displaying the audio icon
     * and hiding the mute icon in the DOM.
     *
     * Assumes there are elements with IDs 'audioIcon' and 'muteIcon' present in the document.
     */
    changeIconToUnmuteIcon() {
        let audioIcon = document.getElementById('audioIcon');
        audioIcon.style.display = 'block';
        let muteIcon = document.getElementById('muteIcon');
        muteIcon.style.display = 'none';
    }
}
/**
 * Initializes the audio API once the DOM has been parsed.
 *
 * This handler waits for the `DOMContentLoaded` event and then:
 * 1) Creates a single `AudioManager` instance,
 * 2) Exposes it globally as `window.audioManager`, and
 * 3) Publishes two convenience functions, `window.mute()` and `window.unmute()`,
 *    so they can be called from inline HTML handlers or the browser console.
 *
 * Why `DOMContentLoaded`?
 * Ensures the HTML is parsed and elements exist before any audio/UI logic might reference them,
 * without waiting for images/styles to finish loading (faster than `load`).
 *
 * Side effects:
 * - Defines/overwrites `window.audioManager`, `window.mute`, and `window.unmute`.
 */
window.addEventListener('DOMContentLoaded', () => {
    window.audioManager = new AudioManager();
    window.mute = () => window.audioManager.mute();
    window.unmute = () => window.audioManager.unmute();
});