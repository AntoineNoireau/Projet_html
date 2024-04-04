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
    finJeu("Vous avez gagné !!");
}
function finJeu(texte)
{
    const cadre = document.createElement("div");
    cadre.classList.add("cadre");


    const titre = document.createElement("h1");
    titre.textContent = texte;

    const boutonsDiv = document.createElement("div");

    const rejouerBtn = document.createElement("button");
    rejouerBtn.textContent = "Restart";
    rejouerBtn.classList.add("button");

    rejouerBtn.addEventListener("click", function() {
        window.location.href = window.location.href;
    });

    const retourBtn = document.createElement("button");
    retourBtn.textContent = "Retour au menu";
    retourBtn.classList.add("button");

    retourBtn.addEventListener("click", function() {
        window.location.href = "index.html";
    });

    boutonsDiv.appendChild(rejouerBtn);
    boutonsDiv.appendChild(retourBtn);

    cadre.appendChild(titre);
    cadre.appendChild(boutonsDiv);

    document.body.appendChild(cadre);
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
    finJeu("Vous avez perdu ...");
}