const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const albumCovers = document.querySelectorAll(".album-cover");
const audios = [
    document.getElementById("audio1"),
    document.getElementById("audio2"),
    document.getElementById("audio3")
];

let currentSongIndex = 0;
let isPlaying = false;

// Function to stop all songs
function stopAllSongs() {
    audios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0; // Reset time
    });
}

// Function to update UI for the current song
function loadSong(index) {
    stopAllSongs(); // Stop all songs before switching

    albumCovers.forEach((img, i) => {
        img.style.display = i === index ? "block" : "none";
    });

    const songData = [
        { title: "Ishq Hai", artist: "Mismatched 3" },
        { title: "Meem Se Mohabbat", artist: "Pakistani Drama" },
        { title: "Iqtidar", artist: "Pakistani OST" },
    ];

    title.textContent = songData[index].title;
    artist.textContent = songData[index].artist;

    if (isPlaying) {
        audios[index].play();
    }
}

// Play or Pause Function
function togglePlay() {
    const audio = audios[currentSongIndex];
    if (isPlaying) {
        audio.pause();
        playBtn.innerHTML = "▶"; // Change to play icon
    } else {
        stopAllSongs(); // Stop any playing songs
        audio.play();
        playBtn.innerHTML = "⏸"; // Change to pause icon
    }
    isPlaying = !isPlaying;
}

// Next Song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % audios.length;
    loadSong(currentSongIndex);
}

// Previous Song
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + audios.length) % audios.length;
    loadSong(currentSongIndex);
}

// Update Progress Bar
function updateProgress() {
    const audio = audios[currentSongIndex];
    if (audio.duration) {
        progressBar.value = (audio.currentTime / audio.duration) * 100;
    }
}

// Seek Song
function setProgress() {
    const audio = audios[currentSongIndex];
    audio.currentTime = (progressBar.value / 100) * audio.duration;
}

// Event Listeners
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
progressBar.addEventListener("input", setProgress);
audios.forEach(audio => audio.addEventListener("timeupdate", updateProgress));

// Load first song
loadSong(currentSongIndex);

