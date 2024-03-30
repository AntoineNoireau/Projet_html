function explodeConfetti() {
    for(let index = 0; index <= Math.floor(Math.random()*5 + 5); index++){
        confetti({
        origin:{
            x: Math.random(),
            y: Math.random()
        }
        })
    }
}
function redirectToGame() {
    const sliderValue = document.getElementById("mySlider").value;
    localStorage.setItem("sliderValue", sliderValue);
    window.location.href = "Mode_de_jeu_2.html"; 
  }