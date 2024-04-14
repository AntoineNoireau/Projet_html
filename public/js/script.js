function redirectToGame(page) {
    const sliderValue = document.getElementById("mySlider").value;
    localStorage.setItem("sliderValue", sliderValue);
    window.location.href = page; 
  }
function redirect(page) {
window.location.href = page; 
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
    rejouerBtn.classList.add("custom-btn");
    rejouerBtn.classList.add("btn-7");

    rejouerBtn.addEventListener("click", function() {
        window.location.href = window.location.href;
    });

    const retourBtn = document.createElement("button");
    retourBtn.classList.add("custom-btn");
    retourBtn.classList.add("btn-7");

    retourBtn.addEventListener("click", function() {
        window.location.href = "index.html";
    });

    const spanRetour = document.createElement("span");
    const spanRejouer = document.createElement("span");

    spanRetour.textContent = "Retour au menu";
    spanRejouer.textContent = "Restart";

    rejouerBtn.appendChild(spanRejouer);
    retourBtn.appendChild(spanRetour);

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

window.addEventListener('DOMContentLoaded', function() {
    var consulter = document.querySelector(".consulter");
    if(consulter == null)
    {
        ajusterHauteurFond(".image-droite");
    }
    else{
        ajusterHauteurFond(".consulter");
    }
});

function ajusterHauteurFond(conteneur) {

    var consulter = document.querySelector(conteneur);
    var area = document.querySelector('.area');
    var circles = document.querySelector('.circles');
    var differenceHauteur = consulter.offsetTop;
    var distanceBasPage = document.body.offsetHeight - (consulter.offsetTop + consulter.offsetHeight);
    var hauteurContenu = consulter.offsetHeight;
    var resize = hauteurContenu + differenceHauteur;

    if (distanceBasPage > 0) {
        resize += distanceBasPage;
    }

    if(conteneur == ".image-droite")
    {
        resize = 2000;  
    }
    area.style.height = resize + 'px';
    circles.style.height = resize + 'px';
}