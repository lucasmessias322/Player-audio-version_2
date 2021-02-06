
let player = {
    image: document.getElementById('Image'),
    title: document.getElementById('title'),
    audio: document.querySelector('audio'),
    bgImage: document.getElementById('bgimage'),
    author: document.getElementById("author"),
    volIcon: document.getElementById('volumeIcon'),
    volumeControl: document.getElementById('volumeControl'),
    ProgessBar: document.getElementById('ProgessBar'),
    TimerFinal: document.getElementById('TimerFinal'),
    timerinicial: document.getElementById('timerinicial'),
    IconRepeat: document.getElementById('IconRepeat'),
    Repeat: document.getElementById('repeat'),
    randomIcon: document.getElementById('randomIcon')

}
function start(i) {
    player.image.src = DataAudio[i].image
    player.bgImage.style.backgroundImage = "url('" + DataAudio[i].image + "')"
    player.title.innerText = DataAudio[i].title
    player.audio.src = DataAudio[i].caminho
    player.author.innerText = DataAudio[i].author

}

start(0)






function volume(ValorVolume) {
    //valume em js vai de 0 a 1 sendo 1 100% e 0 Zero, divido por 100 par ter seu valor de 0 a 1
    let volumeEquacao = player.audio.volume = ValorVolume / 100

    if (volumeEquacao <= 0) {
        player.volIcon.style.color = '#FF1616'
        player.volIcon.classList.remove('fa-volume-up')
        player.volIcon.classList.add('fa-volume-mute')
    } else {
        player.volIcon.style.color = 'white'
        player.volIcon.classList.remove('fa-volume-mute')
        player.volIcon.classList.add('fa-volume-up')
    }


}

let Volm = 50
function aumentarVolume(){
    if(Volm >= 100){
        Volm = 100
        volume(Volm)
        console.log(Volm);
    }else{
        Volm = Volm + 10
        volume(Volm)
        console.log(Volm);
    }
}

function diminuirVolume(){
    if(Volm < 10){
        Volm = 0
        volume(Volm)
        console.log(Volm);

    }else{
        Volm = Volm - 10
        volume(Volm)
        console.log(Volm);
    }

}


function barraDeProgresso(value) {
    player.audio.currentTime = value

}

function SecontsToMinuts(time) {
    const minutos = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${("0" + minutos).slice(-2)}:${("0" + seconds).slice(-2)}`

}

function timeUpDate() {
    player.timerinicial.innerText = SecontsToMinuts(player.audio.currentTime)
    player.ProgessBar.value = player.audio.currentTime
}
function ajustarBarradeAudio() {
    player.ProgessBar.oninput = () => {
        barraDeProgresso(player.ProgessBar.value)
        player.ProgessBar.max = player.audio.duration

    }
    player.audio.ontimeupdate = () => {
        timeUpDate()
    };

    player.audio.onloadeddata = () => {
        console.log(player.audio.duration);
        player.TimerFinal.innerText = SecontsToMinuts(player.audio.duration)
    }


}
ajustarBarradeAudio()


function Mutar() {
    if (player.audio.muted == false) {
        player.audio.muted = true
        player.volIcon.style.color = '#FF1616'
        player.volIcon.classList.remove('fa-volume-up')
        player.volIcon.classList.add('fa-volume-mute')
    } else {
        player.audio.muted = false
        player.volIcon.style.color = 'white'
        player.volIcon.classList.remove('fa-volume-mute')
        player.volIcon.classList.add('fa-volume-up')
    }
}

function animate() {

    if (player.image.style.animation == "") {
        player.image.style.animation = 'spin 7s linear infinite'

    } else {
        player.image.style.animation = ''
    }
}

let Acresentar = 0
function ProximaMusica() {
    Acresentar++
    start(Acresentar)
    player.audio.play()
}

function VoltarMusicaAnterior() {
    Acresentar--
    start(Acresentar)
}
function ProximaMusicaAutomaticamente() {

    player.audio.addEventListener("ended", () => {
        ProximaMusica()
        player.audio.play()
    })

}

function PlayOrPause() {
    let btn = document.getElementById("PlayPause")

    if (btn.classList == "fas fa-play") {
        btn.classList.remove("fa-play")
        btn.classList.add("fa-pause")
        player.audio.play()
    } else {
        btn.classList.remove("fa-pause")
        btn.classList.add("fa-play")
        player.audio.pause()
    }


}
function repetirMusica() {
    if (player.audio.loop) {
        player.audio.removeAttribute('loop')
        player.Repeat.style.color = 'white'
    } else {
        player.audio.setAttribute('loop', 'loop')
        player.Repeat.style.color = ' #FF1616'
    }
}

function musicaAleatoria() {

    let d = DataAudio.length
    let ale = Math.floor(Math.random() * (d - 0) + 0)
    console.log(ale);
    start(ale)

}

// let btn = document.getElementById("PlayPause")
function AudioPlay() {

    animate()
    PlayOrPause()
    ProximaMusicaAutomaticamente()
}







