const songMap = new Map();
let currentSong = null;
let isPlaying = false;
const audioPlayer = document.getElementById('audioPlayer');
const songListElement = document.getElementById('songList');
const currentSongElement = document.getElementById('currentSong');

function addSong() {
    const songNameInput = document.getElementById('songName');
    const songFileInput = document.getElementById('songFile');
    const songName = songNameInput.value.trim();
    const songFile = songFileInput.files[0];

    if (songName && songFile && songMap.size < 10) {
        const songUrl = URL.createObjectURL(songFile);
        songMap.set(songName, songUrl);
        
        const li = document.createElement('li');
        li.textContent = songName;
        songListElement.appendChild(li);
        
        songNameInput.value = '';
        songFileInput.value = '';
    } else if (songMap.size >= 10) {
        alert('Достигнут лимит в 10 песен!');
    }
}

function getRandomSong() {
    const songNames = Array.from(songMap.keys());
    if (songNames.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * songNames.length);
    const songName = songNames[randomIndex];
    return { name: songName, url: songMap.get(songName) };
}

function playSong(song) {
    if (song) {
        currentSong = song;
        currentSongElement.textContent = song.name;
        audioPlayer.src = song.url;
        audioPlayer.play();
        isPlaying = true;
    }
}

function togglePlayback() {
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
        currentSongElement.textContent = 'Пауза';
    } else {
        if (!currentSong) {
            const song = getRandomSong();
            playSong(song);
        } else {
            audioPlayer.play();
            isPlaying = true;
            currentSongElement.textContent = currentSong.name;
        }
    }
}

audioPlayer.addEventListener('ended', () => {
    if (isPlaying) {
        setTimeout(() => {
            const song = getRandomSong();
            playSong(song);
        }, 1000);
    }
});
