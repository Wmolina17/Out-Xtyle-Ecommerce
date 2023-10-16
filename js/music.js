let sound = new Audio("../music-abba.mp3")
let play = document.getElementsByClassName("div-repro")[0]
let pause = document.getElementsByClassName("div-pause")[0]

play.addEventListener("click", () => {
    sound.play()
})

pause.addEventListener("click", () => {
    sound.pause()
})

