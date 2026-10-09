(function () {
    document.addEventListener("contextmenu", function (event) {
        event.preventDefault();
    });

    document.addEventListener("keydown", function (event) {
        const key = event.key.toUpperCase();
        if (event.key === "F12" ||
            (event.ctrlKey && event.shiftKey && ["I", "J", "C"].includes(key)) ||
            (event.ctrlKey && key === "U") ||
            (event.metaKey && event.altKey && key === "I")) {
            event.preventDefault();
            event.stopPropagation();
        }
    }, true);
})();

const cards = [...document.querySelectorAll(".member-card")];
const members = document.querySelector(".members");
const pageBg = document.querySelector(".page-bg");
const pagePhoto = document.querySelector(".page-photo");

const defaultBackground = "PICTURESGIF/exclusivebanner.jpg";
if (pagePhoto) pagePhoto.style.backgroundImage = `url("${defaultBackground}")`;
if (pageBg) pageBg.style.backgroundImage = `url("${defaultBackground}")`;

/* ---------- ENTRANCE MUSIC ON HOME + MEMBER HOVER MUSIC ---------- */
const entranceAudio = new Audio("MUSICS/entrancesong.mp3");
entranceAudio.loop = true;
entranceAudio.volume = 0.7;
entranceAudio.preload = "auto";
entranceAudio.setAttribute("playsinline", "");
entranceAudio.load();

let activeAudio = null;
let activeCard = null;
let memberMusicActive = false;
let entranceStarted = false;

function startEntranceMusic() {
    if (!entranceAudio.paused) return;
    try {
        const shouldStart = sessionStorage.getItem("chavezStartEntranceMusic");
        if (shouldStart === "yes") sessionStorage.removeItem("chavezStartEntranceMusic");
    } catch (_) {}

    const attempt = () => {
        entranceAudio.play().then(() => {
            entranceStarted = true;
        }).catch(() => {
            entranceStarted = false;
        });
    };
    attempt();
}

function stopMemberMusic() {
    if (activeAudio) {
        activeAudio.pause();
        activeAudio.currentTime = 0;
        activeAudio = null;
    }
    memberMusicActive = false;
}

function playMusic(card) {
    const music = card && card.dataset.music;
    if (!music) return;

    entranceAudio.pause();
    stopMemberMusic();

    const audio = new Audio(music);
    audio.loop = true;
    audio.volume = 0.55;
    activeAudio = audio;
    memberMusicActive = true;
    audio.play().catch(() => {
    });
}

function resumeEntranceMusic() {
    stopMemberMusic();
    startEntranceMusic();
}

function setBackground(card) {
    const image = (card && card.dataset.bg) || defaultBackground;
    if (pageBg) pageBg.style.backgroundImage = `url("${image}")`;
}

setBackground(null);

startEntranceMusic();
entranceAudio.addEventListener("canplaythrough", () => {
    if (!memberMusicActive && entranceAudio.paused) startEntranceMusic();
}, { once: true });

const retryEntrance = () => {
    if (!memberMusicActive && entranceAudio.paused) startEntranceMusic();
};
document.addEventListener("pointerdown", retryEntrance);
document.addEventListener("keydown", retryEntrance);
window.addEventListener("pageshow", retryEntrance);

cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
        activeCard = card;
        setBackground(card);
        playMusic(card);
    });

    card.addEventListener("click", () => {
        activeCard = card;
        setBackground(card);
        playMusic(card);
    });

    card.addEventListener("focusin", () => {
        activeCard = card;
        setBackground(card);
        playMusic(card);
    });
});
if (members) {
    members.addEventListener("mouseleave", () => {
        activeCard = null;
        resumeEntranceMusic();
        setBackground(null);
    });
}

if (members) {
    members.addEventListener("mouseenter", () => {
        if (activeCard) setBackground(activeCard);
    });
}

window.addEventListener("blur", () => {
});
