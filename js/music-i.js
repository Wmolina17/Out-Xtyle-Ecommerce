let sound_i = new Audio("music-abba.mp3")
let play_i = document.getElementsByClassName("div-repro-i")[0]
let pause_i = document.getElementsByClassName("div-pause-i")[0]

play_i.addEventListener("click", () => {
    sound_i.play()
})

pause_i.addEventListener("click", () => {
    sound_i.pause()
})