const music = document.querySelector("audio");
const img = document.querySelector("img");

const play = document.getElementById("play");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let progress = document.getElementById("progress");
let current_time = document.getElementById("current_time");
let total_duration = document.getElementById("total_duration");
const progress_div = document.getElementById("progress_div");

// const songs = [
//   {
//     name: "music-1",
//     title: "FADED",
//     artist: "Alan Walker",
//   },
//   {
//     name: "music-2",
//     title: "CHEAP THRILLS",
//     artist: "Sia, Ft.Sean Paul",
//   },
// ];

// console.log(songs);
// console.log(songs[0]);

// let currentLoggedUser = 2;
let currentLoggedUserId = JSON.parse(
  sessionStorage.getItem("currentLoggedUser")
);

const urlSongs = "http://localhost:3000/songs";
const urlUser = `http://localhost:3000/users/${currentLoggedUserId} `;

async function getData() {
  const response = await fetch(urlSongs);
  const songsAll = await response.json();
  //  console.log(window.sessionStorage.getItem('currentSongId'));

  const responseUser = await fetch(urlUser);
  const userAll = await responseUser.json();

  console.log(userAll.userPlaylist);

  //myplalist will contain array of songs
  let myPlayList = [];
  myPlayList = userAll.userPlaylist;

  console.log(myPlayList);

  //Actual playlist will contain songs got by id
  let ActualPlaylist = [];
  let songID = window.sessionStorage.getItem("currentSongId");
  console.log(songID + "Audio panel SongId");
  // myPlayList.push(parseInt(songID));

  if (songID != myPlayList[0]) {
    myPlayList.splice(0, 0, songID);
  }

  console.log(myPlayList);
  // songsAll.forEach(element => {
  //   console.log(element.id);
  //   // console.log('Out');
  //   if (myPlayList.includes(element.id)) {
  //     console.log('Inside');
  //     ActualPlaylist.push(element);
  //   }
  // });

  myPlayList.forEach((data) => {
    console.log(data);
    songsAll.forEach((element) => {
      console.log(element.id);
      // console.log('Out');
      if (data.includes(element.id)) {
        console.log("Inside");
        ActualPlaylist.push(element);
      }
    });
  });

  console.log(ActualPlaylist);
  let isPlaying = false;

  /* for play functionality */
  const playMusic = () => {
    isPlaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
    img.classList.add("anime");
  };

  /* for pause functionality */
  const pauseMusic = () => {
    isPlaying = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
    img.classList.remove("anime");
  };

  play.addEventListener("click", () => {
    isPlaying ? pauseMusic() : playMusic();
  });

  /* change music */
  // const loadSong = (songs) => {
  //   title.textContent = songs.songName;
  //   artist.textContent = songs.artist;
  //   music.src = "../MUSIC/" + songs.name + ".mp3";
  //   img.src = "../IMAGES/" + songs.name + ".jpg";
  // };

  /* change music */

  var songIndex = 0;
  const loadSong = (songs) => {
    title.textContent = ActualPlaylist[songIndex].songName;
    artist.textContent = ActualPlaylist[songIndex].artist;
    music.src = ActualPlaylist[songIndex].path;
    img.src = ActualPlaylist[songIndex].image;
  };
  console.log(ActualPlaylist[0].album);
  loadSong();

  // loadSong(songs[1]);

  const nextSong = () => {
    songIndex = (songIndex + 1) % ActualPlaylist.length;
    loadSong(ActualPlaylist[songIndex]);
    playMusic();
  };

  const prevSong = () => {
    songIndex = (songIndex - 1 + ActualPlaylist.length) % ActualPlaylist.length;
    loadSong(ActualPlaylist[songIndex]);
    playMusic();
  };

  /* progress js work */
  music.addEventListener("timeupdate", (event) => {
    // console.log(event);
    const { currentTime, duration } = event.target;
    // console.log(currentTime);
    // console.log(duration);

    let progress_time = (currentTime / duration) * 100;
    // console.log(progress_time);
    progress.style.width = `${progress_time}%`;

    /* music duration update */
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);

    // console.log(min_duration);
    // console.log(sec_duration);

    let tot_duration = `${min_duration}:${sec_duration}`;
    if (duration) {
      total_duration.textContent = `${tot_duration}`;
    }

    /* current duration update */
    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);

    if (sec_currentTime < 10) {
      sec_currentTime = `0${sec_currentTime}`;
    }

    let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
    current_time.textContent = `${tot_currentTime}`;
  });

  /* progress onclick functionality */
  progress_div.addEventListener("click", (event) => {
    console.log(event);
    const { duration } = music;

    let move_progress = (event.offsetX / event.target.clientWidth) * duration;
    // console.log(duration);
    // console.log(move_progress);

    music.currentTime = move_progress;
  });

  // if music is ended call nextSong function
  music.addEventListener("ended", nextSong);

  next.addEventListener("click", nextSong);
  prev.addEventListener("click", prevSong);
}

getData();
