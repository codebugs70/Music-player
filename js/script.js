/* GET THE VARIABLES */
const musicPlaylist = document.querySelector(".music-playlist");
const songAudio = document.querySelector(".song-audio");
const musicBanner = document.querySelectorAll(".music-banner");
const musicName = document.querySelectorAll(".music-name");
const musicArtist = document.querySelectorAll(".music-artist");
/* <<=============================================================>> */
const progressBar = document.querySelector(".progress-bar");
const timeStart = document.querySelector(".time-start");
const timeEnd = document.querySelector(".time-end");
const volumeBar = document.querySelector(".volume-bar");

/* GET ICON */
const playBtn = document.querySelector(".icon-play");
const nextBtn = document.querySelector(".icon-next");
const prevBtn = document.querySelector(".icon-prev");
const shuffleBtn = document.querySelector(".icon-shuffle");
const repeatBtn = document.querySelector(".icon-repeat");
const volumeBtn = document.querySelector(".icon-volume");

/* INIT SOME VARIABLES */
let SONG_INDEX = 0;
let IS_PLAYING = true;
let IS_SHUFFLE = false;
let IS_REPEAT = false;
let IS_MUTE = true;

/* SONG DATA */
const SONG_DATA = [
  {
    title: "Roses",
    artist: "The Chainsmokers",
    image: "https://i.scdn.co/image/ab67616d0000b2738d2cfad007b9431f48aef135",
    duration: "03:50",
    file: "Roses.mp3",
  },
  {
    title: "Mistletoe",
    artist: "Justin Bieber",
    image: "https://i.scdn.co/image/ab67616d0000b2739defcccd1bce0358c4eff826",
    file: "Mistletoe.mp3",
    duration: "03:02",
  },
  {
    title: "Watch me miss",
    artist: "Powfu",
    image: "https://i.scdn.co/image/ab67616d0000b2733f8d8c9c0a55216d1b313287",
    file: "watch me miss.mp3",
    duration: "02:36",
  },
  {
    title: "High",
    artist: "The Chainsmokers",
    image: "https://i.scdn.co/image/ab67616d0000b2734ed727dc12385924bdef0e9f",
    file: "High.mp3",
    duration: "02:53",
  },
  {
    title: "Ice heart",
    artist: "Powfu",
    image: "https://i.scdn.co/image/ab67616d0000b2732506a4a9ad9d5d01bcb95443",
    file: "ice heart.mp3",
    duration: "02:30",
  },
  {
    title: "Beside you",
    artist: "Keshi",
    image: "https://i.scdn.co/image/ab67616d0000b273da53f97b4b0f1e14d854f777",
    file: "beside you.mp3",
    duration: "02:46",
  },
  {
    title: "Die for you",
    artist: "Joji",
    image: "https://i.scdn.co/image/ab67616d0000b273eaac2a7955f5b8967991cacb",
    file: "Die For You.mp3",
    duration: "03:31",
  },
  {
    title: "Christmas love",
    artist: "Justin Bieber",
    image: "https://i.scdn.co/image/ab67616d0000b273e52b6c5cc42dcfe040249bfc",
    file: "Christmas Love.mp3",
    duration: "03:32",
  },
  {
    title: "Robbery",
    artist: "Juice WRLD",
    image: "https://i.scdn.co/image/ab67616d0000b273b3d1baeaddfa1e2a3def3e35",
    file: "Robbery.mp3",
    duration: "04:00",
  },
  {
    title: "D2M",
    artist: "Vorsa",
    image: "https://i.scdn.co/image/ab67616d0000b273b8dcf92902401976b39590c6",
    file: "D2M.mp3",
    duration: "02:58",
  },
  {
    title: "alien abduction",
    artist: "mididuck",
    image: "https://i.scdn.co/image/ab67616d0000b273b140e64decaff8ebdacd391f",
    file: "alien abduction.mp3",
    duration: "03:06",
  },
  {
    title: "been this way",
    artist: "Demxntia",
    image: "https://i.scdn.co/image/ab67616d0000b27313f8c0d00ace4078f140dd56",
    file: "been this way.mp3",
    duration: "02:50",
  },
  {
    title: "Cherry",
    artist: "KAYDEN",
    image: "https://i.scdn.co/image/ab67616d0000b2732f62812a1bf4c3975cd763f9",
    file: "cherry.mp3",
    duration: "02:47",
  },
  {
    title: "By My Side",
    artist: "SKIALEX",
    image:
      "https://cdna.artstation.com/p/assets/images/images/052/571/874/large/avetetsuya-studios-297579147-194868862968701-5117749540904313728-n.jpg?1660140544",
    file: "By My Side.mp3",
    duration: "03:22",
  },
  {
    title: "I'm not alright",
    artist: "Rxseboy",
    image: "https://i.scdn.co/image/ab67616d00001e02a3bbb97cf2fd38cdaca507f4",
    file: "I'm not alright.mp3",
    duration: "02:23",
  },
];
/* <<<=========================================================================>>> */
/* <<<=========================================================================>>> */

/* <<<=========================================================================>>> */
/* <<<=========================================================================>>> */
//  HANDLE LOAD MUSIC
function handleLoadSongInfo() {
  updateProgressBar();
  musicBanner.forEach((item) =>
    item.setAttribute("src", SONG_DATA[SONG_INDEX].image)
  );
  musicName.forEach((item) => (item.textContent = SONG_DATA[SONG_INDEX].title));
  musicArtist.forEach(
    (item) => (item.textContent = SONG_DATA[SONG_INDEX].artist)
  );
  songAudio.setAttribute("src", `./songs/${SONG_DATA[SONG_INDEX].file}`);
}
handleLoadSongInfo();

//  HANDLE ACTVE SHUFFLE-BTN
shuffleBtn.addEventListener("click", handleActiveShuffle);
function handleActiveShuffle() {
  IS_SHUFFLE = true;
  shuffleBtn.classList.toggle("active");
}

//  HANDLE ACTVE REPEAT-BTN
repeatBtn.addEventListener("click", handleActiveRepeat);
function handleActiveRepeat() {
  IS_REPEAT = true;
  repeatBtn.classList.toggle("active");
}

// HANDLE ACTIVE BACKGROUND-COLOR SONG-ITEM
function handleActiveSong() {
  const songElements = document.querySelectorAll(".music-item");
  songElements.forEach((element) => {
    element.classList.remove("active");
  });
  songElements[SONG_INDEX].classList.add("active");
}

// HANDLE CLICK SONG-ITEM
function handleClickSongItem(event) {
  const songItem = event.target;
  const songItemIndex = songItem.dataset.index;
  SONG_INDEX = songItemIndex;
  handleLoadSongInfo(SONG_INDEX);
  IS_PLAYING = true;
  handlePlayAndPauseMusic();
}

// HANDLE CLICK MUSIC-PLAYLIST
musicPlaylist.addEventListener("click", function (e) {
  if (e.target.matches(".music-item")) {
    handleActiveSong();
  }
});

/* <<<=========================================================================>>> */
/* <<<=========================================================================>>> */
// HANDLE RENDER MUSIC
function renderPlaylist() {
  SONG_DATA.forEach((item, index) => {
    const template = `<li data-index="${index}" onCLick='handleClickSongItem(event)' class="music-item">
    <div class="music-item-left">
      <img
        src="${item.image}"
        alt=""
      />
      <div class="music-item-info">
        <h1 class="music-item-name">${item.title}</h1>
        <span class="music-item-artist">${item.artist}</span>
      </div>
    </div>
    <div class="music-item-right">
      <span class="heart-icon">
        <i class="fa-solid fa-heart"></i>
      </span>
      <span class="music-time">${item.duration}</span>
    </div>
  </li>`;
    musicPlaylist.insertAdjacentHTML("beforeend", template);
  });
}
renderPlaylist();

// HANDLE SONG END
songAudio.addEventListener("ended", function () {
  if (IS_SHUFFLE) {
    handleShuffleSong();
  } else if (IS_REPEAT) {
    IS_PLAYING = true;
    handleActiveSong();
    IS_PLAYING = true;
    handlePlayAndPauseMusic();
  } else {
    handleNextSong();
  }
  handleActiveSong();
  IS_PLAYING = true;
  handlePlayAndPauseMusic();
});

/* <<<=========================================================================>>> */
/* <<<=========================================================================>>> */
/* ======================== MAIN ACTION ============================= */
// HANDLE PLAY & PAUSE MUSIC
playBtn.addEventListener("click", handlePlayAndPauseMusic);
function handlePlayAndPauseMusic() {
  if (IS_PLAYING) {
    songAudio.play();
    handleActiveSong();
    playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    playBtn.classList.add("active");
    musicBanner.forEach((item) => item.classList.add("active"));
    IS_PLAYING = false;
  } else {
    songAudio.pause();
    playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    musicBanner.forEach((item) => item.classList.remove("active"));
    IS_PLAYING = true;
  }
}

// HANDLE NEXT SONG
nextBtn.addEventListener("click", handleNextSong);
function handleNextSong() {
  if (IS_SHUFFLE) {
    handleShuffleSong();
  } else {
    SONG_INDEX++;
    if (SONG_INDEX > SONG_DATA.length - 1) SONG_INDEX = 0;
  }
  handleActiveSong();
  handleLoadSongInfo();
  IS_PLAYING = true;
  handlePlayAndPauseMusic();
}

// HANDLE PREVIOUS SONG
prevBtn.addEventListener("click", handlePrevSong);
function handlePrevSong() {
  SONG_INDEX--;
  if (SONG_INDEX < 0) {
    SONG_INDEX = SONG_DATA.length - 1;
  }
  handleActiveSong();
  handleLoadSongInfo(SONG_INDEX);
  IS_PLAYING = true;
  handlePlayAndPauseMusic();
}

// HANDLE SHUFFLE SONG
let shuffledSongs = [];
function handleShuffleSong() {
  if (shuffledSongs.length === SONG_DATA.length) {
    shuffledSongs = [];
  }
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * SONG_DATA.length);
  } while (shuffledSongs.includes(randomIndex));
  shuffledSongs.push(randomIndex);
  SONG_INDEX = randomIndex;
  handleActiveSong();
  handleLoadSongInfo();
}

/* <<<=========================================================================>>> */
/* <<<=========================================================================>>> */
// HANDLE UPDATE PROGRESS BAR
const timer = setInterval(updateProgressBar, 500);
function updateProgressBar() {
  const currentTime = songAudio.currentTime;
  const duration = songAudio.duration;

  progressBar.max = duration;
  progressBar.value = currentTime;

  timeStart.textContent = formatTime(currentTime);
  if (!duration) {
    timeEnd.textContent = "00:00";
  } else {
    timeEnd.textContent = formatTime(duration);
  }

  const progressPercent = (currentTime / duration) * 100;
}
updateProgressBar();

// HANDLED_DRAG PROGRESS BAR
progressBar.addEventListener("change", handleDrag);
function handleDrag(e) {
  songAudio.currentTime = e.target.value;
}

// FORMAT-TIME PROGRESS BAR
function formatTime(number) {
  let minutes = Math.floor(number / 60);
  let seconds = Math.floor(number % 60);
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}

/* <<<=========================================================================>>> */
/* <<<=========================================================================>>> */
// HANDLE CHANGE VOLUME
volumeBar.addEventListener("change", handleVolume);
function handleVolume(e) {
  volumeValue = volumeBar.value / 100;
  songAudio.volume = volumeValue;
  if (volumeValue === 0) {
    volumeBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
  } else {
    volumeBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
  }
}

// HANDLE CLICK VOLUME ICON
volumeBtn.addEventListener("click", handleClickVolume);
function handleClickVolume() {
  if (IS_MUTE) {
    volumeBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
    volumeBar.value = 0;
    songAudio.volume = 0;
    IS_MUTE = false;
  } else {
    volumeBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
    volumeBar.value = 100;
    songAudio.volume = 1;
    IS_MUTE = true;
  }
}
