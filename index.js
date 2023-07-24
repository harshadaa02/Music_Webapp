const img = document.querySelector(".img");
const audio = document.querySelector("audio");
const play = document.getElementById("play");
const title = document.querySelector(".music-heading");
const artist = document.querySelector(".music-subheading");
const prev = document.querySelector(".backward");
const next = document.querySelector(".forward");
let ctime = document.getElementById("currenttime");
let totaltime = document.getElementById("totaltime");
let progress = document.querySelector(".progress");
const progressline = document.querySelector(".progressline");

const songs = [
  {
    songname: "1",
    title: "WARRIYO",
    artist: "Laura Brehm",
  },
  {
    songname: "2",
    title: "CIELO",
    artist: "Huma Huma",
  },
  {
    songname: "3",
    title: "DEAF KEV",
    artist: "Invincible",
  },
  {
    songname: "4",
    title: "MY HEART",
    artist: "EH!DE",
  },
  {
    songname: "5",
    title: "HEROES",
    artist: "Janji",
  },
  {
    songname: "6",
    title: "SAFETY DANCE",
    artist: "Ivan Doroschuk",
  },
  {
    songname: "7",
    title: "BACK IT UP",
    artist: "Prince Royce",
  },
  {
    songname: "8",
    title: "GET LUCKY",
    artist: "Daft Punk",
  },
  {
    songname: "9",
    title: "ORANGE",
    artist: "Clay",
  },
  {
    songname: "10",
    title: "TRUE LOVE",
    artist: "Grace Kelly",
  },
];

let isPlaying = false;
// Function to play music
const playMusic = () => {
  isPlaying = true;
  audio.play();
  play.classList.replace("fa-play-circle", "fa-pause-circle");
  img.classList.add("anime");
};

//Function to pause music
const pauseMusic = () => {
  isPlaying = false;
  audio.pause();
  play.classList.replace("fa-pause-circle", "fa-play-circle");
  img.classList.remove("anime");
};

play.addEventListener("click", () => {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
});

//Changing the music data
const loadSong = (songs) => {
  title.textContent = songs.title;
  artist.textContent = songs.artist;
  audio.src = `${songs.songname}.mp3`;
  img.src = `${songs.songname}.jpg`;
};

songIndex = 0;
next.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
});

prev.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
});

// Progress Bar Work
audio.addEventListener("timeupdate", (event) => {
  const { currentTime, duration } = event.srcElement;
  let progress_time = (currentTime / duration) * 100;
  progress.style.width = `${progress_time}%`;

  let min_duration = Math.floor(duration / 60);
  let sec_duration = Math.floor(duration % 60);
  if (duration) {
    totaltime.textContent = `${min_duration}:${sec_duration}`;
  }

  let min_currentTime = Math.floor(currentTime / 60);
  let sec_currentTime = Math.floor(currentTime % 60);
  if (sec_currentTime < 10) {
    sec_currentTime = `0${sec_currentTime}`;
  }
  if (currentTime) {
    ctime.textContent = `${min_currentTime}:${sec_currentTime}`;
  }
});

// Codefor starting the song from between
progressline.addEventListener("click", function (event) {
  const clickPosition =
    event.clientX - progressline.getBoundingClientRect().left;
  const progress = clickPosition / progressline.offsetWidth;
  const duration = audio.duration;
  const currentTime = duration * progress;

  audio.currentTime = currentTime;
  audio.play();
});

// If audio ended the next song will play
audio.addEventListener("ended", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
});
