const video = document.getElementById('video'),
  playPauseBtn = document.querySelector('.btn.playPause'),
  stopBtn = document.getElementById('stop'),
  progress = document.getElementById('progress'),
  timestamp = document.querySelector('.timestamp')

function toggleTimeStamp() {
  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }
}

function changePlayBtn() {
  if (!video.paused) {
    playPauseBtn.innerHTML = `<svg class="pause" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="{2}" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>`

    playPauseBtn.title = 'Pause'
  } else {
    playPauseBtn.innerHTML = `<svg class="play" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="{2}"
      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
    /><path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="{2}"
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    /></svg>`

    playPauseBtn.title = 'Play'
  }
}

function stopVideo() {
  video.currentTime = 0
  video.pause()
}

function updateProgressbar() {
  progress.value = (video.currentTime / video.duration) * 100

  // get minutes
  let mins = Math.floor(video.currentTime / 60)
  if (mins < 10) {
    mins = `0${String(mins)}`
  }

  // get seconds
  let secs = Math.floor(video.currentTime % 60)
  if (secs < 10) {
    secs = `0${String(secs)}`
  }

  timestamp.innerHTML = `${mins}:${secs}`
}

function updateTimeStamp() {}

function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100
}

// Event Listeners
video.addEventListener('click', toggleTimeStamp)
video.addEventListener('pause', changePlayBtn)
video.addEventListener('play', changePlayBtn)
video.addEventListener('timeupdate', updateProgressbar, updateTimeStamp)

playPauseBtn.addEventListener('click', toggleTimeStamp)
stopBtn.addEventListener('click', stopVideo)

progress.addEventListener('change', setVideoProgress)
