// ...existing code...
class AudioManager {
    hurtAudioStatusEndboss = false;
    deadAudioStatusEndboss = false;
    bottleSplashAudioStatus = false;
    hurtAudioStatusCharacter = false;
    jumpAudioStatusCharacter = false;
    deadAudioStatusCharacter = false;
    mainMusicAudioStatus = false;

    constructor() {
        this.mainAudio = new Audio('./audio/265615__zagi2__loca-salsa-2.wav');
        this.mainAudio.loop = true;
    }

    mute() {
        this.changeIconToMuteIcon();
        this.mainAudio.pause();
        this.hurtAudioStatusEndboss = false;
        this.deadAudioStatusEndboss = false;
        this.bottleSplashAudioStatus = false;
        this.hurtAudioStatusCharacter = false;
        this.jumpAudioStatusCharacter = false;
        this.deadAudioStatusCharacter = false;
        this.mainMusicAudioStatus = false;
    }

    unmute() {
        this.changeIconToUnmuteIcon();
        this.mainAudio.play();
        this.hurtAudioStatusEndboss = true;
        this.deadAudioStatusEndboss = true;
        this.bottleSplashAudioStatus = true;
        this.hurtAudioStatusCharacter = true;
        this.jumpAudioStatusCharacter = true;
        this.deadAudioStatusCharacter = true;
        this.mainMusicAudioStatus = true;
    }

    changeIconToMuteIcon() {
        let audioIcon = document.getElementById('audioIcon');
        if (audioIcon) audioIcon.style.display = 'none';
        let muteIcon = document.getElementById('muteIcon');
        if (muteIcon) muteIcon.style.display = 'block';
    }

    changeIconToUnmuteIcon() {
        let audioIcon = document.getElementById('audioIcon');
        if (audioIcon) audioIcon.style.display = 'block';
        let muteIcon = document.getElementById('muteIcon');
        if (muteIcon) muteIcon.style.display = 'none';
    }
}
// globale Instanz und Wrapper-Funktionen für bestehende HTML-onclicks
window.audioManager = new AudioManager();
window.mute = () => window.audioManager.mute();
window.unmute = () => window.audioManager.unmute();
// ...existing code...