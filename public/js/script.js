function redirectToGame() {
    const sliderValue = document.getElementById("mySlider").value;
    localStorage.setItem("sliderValue", sliderValue);
    window.location.href = "Mode_de_jeu_2.html"; 
  }
  function explodeConfetti() {
    for(let index = 0; index <= 30; index++){
        confetti({
        origin:{
            x: Math.random(),
            y: Math.random()
        }
        })
    }
}
function generateEmojiExplosion() {
    const emojis = "👎"; 

    for (let index = 0; index <= 100; index++) {
        const emoji = document.createElement("span");
        emoji.textContent = emojis;
        emoji.classList.add("emoji");
        emoji.style.position = "absolute";
        emoji.style.left = Math.random() * window.innerWidth + "px";
        emoji.style.top = Math.random() * window.innerHeight + "px";
        document.body.appendChild(emoji);

        setTimeout(() => {
            emoji.classList.add("fall");
        }, Math.random() * 1000);
    }
}