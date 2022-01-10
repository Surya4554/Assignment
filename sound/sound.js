const btnsxyz = Array.from(document.querySelectorAll(".btn"))
function stopSounds(){
    for(var i=0;i<btnsxyz.length;i++){
        const sound = document.getElementById(btnsxyz[i].innerText)
        sound.pause()
        sound.currentTime = 0
    }
}
function playSound(btn){
    btn.addEventListener("click",function(){
        stopSounds()
        document.getElementById(btn.innerText).play()
    })
}
for(var i=0;i<btnsxyz.length;i++){
    var buttonxyz = btnsxyz[i]
    playSound(buttonxyz)
}

document.querySelector(".stop").addEventListener("click",function(){
    stopSounds()
})