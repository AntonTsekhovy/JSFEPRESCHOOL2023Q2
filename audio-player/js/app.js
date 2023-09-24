const playPauseButton = document.querySelector(".audio-player__play");
const backward = document.querySelector(".audio-player__backward");
const forward = document.querySelector(".audio-player__forward");

const playStopSvg = document.querySelector(".audio-player__play-use");

const range = document.querySelector(".audio-player__range");
const currentTime = document.querySelector(".audio-player__currentTime");
const durationTime = document.querySelector(".audio-player__durationTime");

const backgroundImg = document.querySelector(".cover");
const songImg = document.querySelector(".audio-player__img");
const artist = document.querySelector(".audio-player__artist");
const song = document.querySelector(".audio-player__song");

let currentTrack = document.createElement("audio");
let isPlaying = false;
let trackIndex = 0;
let updateTimer;

const tracks = [
  {
    name: "Don't Start Now",
    artist: "Dua Lipa",
    path: "./audio/dontstartnow.mp3",
    cover: "./images/dontstartnow.png",
  },
  {
    name: "Don't Hurt Yourself",
    artist: "Beyonce",
    path: "./audio/beyonce.mp3",
    cover: "./images/lemonade.png",
  },
];

playPauseButton.addEventListener("click", (e) => {
  playpauseTrack();
});

backward.addEventListener("click", (e) => {
  prevTrack();
});
forward.addEventListener("click", (e) => {
  nextTrack();
});
range.addEventListener("click", (e) => {
  seekTo();
});

loadTrack(trackIndex);

function loadTrack(trackIndex) {
  clearInterval(updateTimer);
  reset();

  currentTrack.src = tracks[trackIndex].path;
  currentTrack.load();

  songImg.src = tracks[trackIndex].cover;
  backgroundImg.src = tracks[trackIndex].cover;
  artist.textContent = tracks[trackIndex].name;
  song.textContent = tracks[trackIndex].artist;

  updateTimer = setInterval(setUpdate, 1000);

  currentTrack.addEventListener("ended", nextTrack);
}
function reset() {
  currentTime.textContent = "00:00";
  durationTime.textContent = "00:00";
  range.value = 0;
}
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
  currentTrack.play();
  isPlaying = true;
  playStopSvg.setAttribute("xlink:href", "./images/icons/sprite.svg#pause");
  songImg.classList.add("audio-player__img--active");
}
function pauseTrack() {
  currentTrack.pause();
  isPlaying = false;
  playStopSvg.setAttribute("xlink:href", "./images/icons/sprite.svg#play");
  songImg.classList.remove("audio-player__img--active");
}
function nextTrack() {
  if (trackIndex < tracks.length - 1) {
    trackIndex += 1;
  } else {
    trackIndex = 0;
  }
  loadTrack(trackIndex);
  playTrack();
}
function prevTrack() {
  if (trackIndex > 0) {
    trackIndex -= 1;
  } else {
    trackIndex = tracks.length - 1;
  }
  loadTrack(trackIndex);
  playTrack();
}
function seekTo() {
  let seekto = currentTrack.duration * (range.value / 100);
  currentTrack.currentTime = seekto;
}

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(currentTrack.duration)) {
    seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
    range.value = seekPosition;

    let currentMinutes = Math.floor(currentTrack.currentTime / 60);
    let currentSeconds = Math.floor(
      currentTrack.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(currentTrack.duration / 60);
    let durationSeconds = Math.floor(
      currentTrack.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    currentTime.textContent = currentMinutes + ":" + currentSeconds;
    durationTime.textContent = durationMinutes + ":" + durationSeconds;
  }
}
