function redirectToGame() {
    const sliderValue = document.getElementById("mySlider").value;
    localStorage.setItem("sliderValue", sliderValue);
    window.location.href = "Mode_de_jeu_2.html"; 
  }