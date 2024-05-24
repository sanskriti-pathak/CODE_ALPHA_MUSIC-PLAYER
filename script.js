document.addEventListener('DOMContentLoaded', function () {
    const tracksList = [
      {
        audioSrc:
          './tracks/01-Bade Achhe Lagte Hain.mp3',
        coverSrc: './images/pic 1.jpeg',
        name: 'Bade Ache Lagte Hain',
        desc: 'Amit Kumar,R.D.Burman',
        id: 1,
      },
      {
        audioSrc:
          './tracks/Dard E Dil Dard E Jigar.mp3',
        coverSrc: './images/pic 2.jpeg',
        name: 'Dard-E-Dil',
        desc: 'Mohammad Rafi',
        id: 2,
      },
      {
        audioSrc: './tracks/Mere Mehboob Qayamat hogi.mp3',
        coverSrc: './images/pic 3.jpeg',
        name: 'Mere Mehboob Qayamat Hogi',
        desc: 'Kishore Kumar ',
        id: 3,
      },
      {
        audioSrc: "./tracks/Patta Patta Buta Buta.mp3",
        coverSrc: './images/pic 4.jpg',
        name: 'Patta Patta Buta Buta',
        desc: "Mohamaad Rafi,Lata Mangeshkar",
        id: 4,
      },
      {
        audioSrc: './tracks/Hoshwalon Ko Khabar Kya.mp3',
        coverSrc: './images/pic 5.jpg',
        name: 'Hoshwalon ko Khabar Kya',
        desc: 'Jagjit Singh',
        id: 5,
      },
    ];
  
    const currentTrackName = document.querySelector('header h3');
    const currentTrackDesc = document.querySelector('header p');
    const currentTrackCover = document.querySelector('header img');
    const currentTrackAudio = document.querySelector('audio');
    const playPauseBtn = document.querySelector('.event-playPause');
    const muteUnmuteBtn = document.querySelector('.event-muteUnmute');
    const playNextBtn = document.querySelector('.event-next');
    const playPrevBtn = document.querySelector('.event-prev');
    const progress = document.querySelector('.slider-progress');
    const currentTrackTime = document.querySelector('.count-current');
    const finalTrackTime = document.querySelector('.count-final');
    // ADD TRACKS TO MY PLAYLIST ON PAGE LOAD
    (function addMyTracksList() {
      for (let track of tracksList) {
        var li = document.createElement('li');
        li.id = track.id;
        li.innerHTML = `
                      <div class="track-number">0${track.id}</div>
                      <img
                      src=${track.coverSrc}
                      class="track-img"
                      alt=""
                      />
                      <div class="track-detail">
                      <div class="track-detail_name">${track.name}</div>
                      <div class="track-detail_desc">
                          <small>${track.desc}</small>
                      </div>
                      </div>
          `;
        document.querySelector('ul').appendChild(li);
        (function (id) {
          li.addEventListener(
            'click',
            () => {
              playSelectedTrack(id);
            },
            false
          );
        })(track.id);
      }
    })();
  
    let trackId = 1;
  
    const loadTrack = (songId) => {
      const song = tracksList.find((track) => track.id === songId);
  
      const {audioSrc,coverSrc,name,desc } = song;
      currentTrackName.innerText = name;
      currentTrackDesc.innerText = desc;
      currentTrackAudio.src = audioSrc;
      currentTrackCover.src = coverSrc;
    };
  
    const playSelectedTrack = (songId) => {
      trackId = songId;
      loadTrack(songId);
      playTrack();
    };
  
    loadTrack(trackId);
  
    const playTrack = () => {
      playPauseBtn.classList.remove('fa-play');
      playPauseBtn.classList.add('fa-pause');
  
      currentTrackAudio.play();
    };
  
    const pauseTrack = () => {
      playPauseBtn.classList.remove('fa-pause');
      playPauseBtn.classList.add('fa-play');
  
      currentTrackAudio.pause();
    };
  
    const playPrevTrack = () => {
      trackId--;
  
      if (trackId < 1) {
        trackId = tracksList.length -0;
      }
      loadTrack(trackId);
      playTrack();
    };
  
    const playNextTrack = () => {
      trackId++;
      if (trackId > tracksList.length -0) {
        trackId = 1;
      }
      loadTrack(trackId);
      playTrack();
    };
  
    const updateProgress = () => {
      const currentTime = currentTrackAudio.currentTime;
      const trackDuration = currentTrackAudio.duration;
      const percent = (currentTime / trackDuration) * 200;
      progress.style.width = percent + '%';
      let curMins = Math.floor(currentTime / 60);
      let curSecs = Math.floor(currentTime - curMins * 60);
      let durMins = Math.floor(trackDuration / 60) || '--';
      let durSecs = Math.floor(trackDuration - durMins * 60) || '--';
  
      if (curMins < 10) {
        curMins = `0${curMins}`;
      }
      if (curSecs < 10) {
        curSecs = `0${curSecs}`;
      }
      if (durMins < 10) {
        durMins = `0${durMins}`;
      }
      if (durSecs < 10) {
        durSecs = `0${durSecs}`;
      }
  
      currentTrackTime.innerText = `${curMins}:${curSecs}`;
      finalTrackTime.innerText = `${durMins}:${durSecs}`;
    };
  
    const muteUnmuteTrack = () => {
      if (currentTrackAudio.muted) {
        currentTrackAudio.muted = false;
        muteUnmuteBtn.classList.remove('fa-volume-mute');
        muteUnmuteBtn.classList.add('fa-volume-up');
      } else {
        currentTrackAudio.muted = true;
        muteUnmuteBtn.classList.remove('fa-volume-up');
        muteUnmuteBtn.classList.add('fa-volume-mute');
      }
    };
  
    playPauseBtn.addEventListener('click', () => {
      const currentlyPlaying = playPauseBtn.classList.contains('fa-pause');
  
      currentlyPlaying ? pauseTrack() : playTrack();
    });
    muteUnmuteBtn.addEventListener('click', () => muteUnmuteTrack());
  
    playPrevBtn.addEventListener('click', () => playPrevTrack());
    playNextBtn.addEventListener('click', () => playNextTrack());
  
    currentTrackAudio.addEventListener('timeupdate', () => updateProgress());
  });