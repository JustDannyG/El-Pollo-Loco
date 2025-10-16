// ...existing code...
class AudioManager {
    hurtAudioStatusEndboss = false;
    deadAudioStatusEndboss = false;
    bottleSplashAudioStatus = false;
    hurtAudioStatusCharacter = false;
    jumpAudioStatusCharacter = false;
    deadAudioStatusCharacter = false;
    mainMusicAudioStatus = false;

    splashAudio;
    hurtAudioEndboss;
    deadAudioEndboss;
    hurtAudioCharacter;
    jumpAudioCharacter;
    deadAudioCharacter;

    constructor() {
        this.mainAudio = new Audio('./audio/265615__zagi2__loca-salsa-2.wav');
        this.mainAudio.loop = true;
        this.loadAudios();
    }

    loadAudios() {
        this.splashAudio = new Audio('./audio/213158__arnaud-coutancier__broken-bottle-verre-07.wav');
        this.splashAudio.load();
        this.hurtAudioEndboss = new Audio('./audio/endboss-chicken-attack.wav');
        this.hurtAudioEndboss.load();
        this.deadAudioEndboss = new Audio('./audio/enboss-chicken-dead.wav');
        this.deadAudioEndboss.load();
        this.hurtAudioCharacter = new Audio('./audio/795690__randbsoundbites__death-cry (1).wav');
        this.hurtAudioCharacter.load();
        this.jumpAudioCharacter = new Audio('./audio/345437__artmasterrich__male_jump_01.wav');
        this.jumpAudioCharacter.load();
        this.deadAudioCharacter = new Audio('./audio/796567__randbsoundbites__character-death.wav');
        this.deadAudioCharacter.load();
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