var recetteBDD = [];

document.addEventListener("DOMContentLoaded", initialisation);

function initialisation() {
    fetch("http://localhost:3000/recettes")
        .then(response => response.json())
        .then(data => {
            recetteBDD = data;
            console.log(recetteBDD);
            recette0 = document.querySelector("iframe");
            recette0.id = recetteBDD[0].id;

            



            var divImages = document.getElementById("video_sec");

            // Parcourez les recettes restantes dans recetteBDD à partir de l'index 1
            recetteBDDsansPremièreRecette = recetteBDD.slice(1);
            console.log(recetteBDDsansPremièreRecette)
            recetteBDDsansPremièreRecette.forEach(element => {

                var nouvelleImage = document.createElement("img");
                
                // Définissez l'ID de l'image sur le nom de la recette
                nouvelleImage.id = element.id;

                nouvelleImage.src = "";


                // Ajoutez la classe "image-droite" si nécessaire
                nouvelleImage.classList.add("image-droite");

                // Ajoutez l'image à la div d'images
                divImages.appendChild(nouvelleImage);
                var titreSec = document.createElement("p");
                titreSec.id = "texte" +element.id;
                divImages.appendChild(titreSec);
                //divImages.style.position = "relative";
                //divImages.style.zIndex = "9999";
                divImages.appendChild(document.createElement("br"));
            });

            init();

            
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
        });
}


function init() {
    const apiKey = 'AIzaSyAPsKxEFAuXUZ-noDkdfrSQwW4xJ7Y4z-g';
    var iframe = document.querySelector("iframe");
    var videoId = iframe.getAttribute("id");

    console.log(recetteBDD.find(objet => objet.id == videoId).url)
    var videoUrl = "https://www.youtube.com/embed/" + recetteBDD.find(objet => objet.id == videoId).url;
    iframe.setAttribute("src", videoUrl);

    const apiUrlVidéoprinc = "https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=" + recetteBDD.find(objet => objet.id == videoId).url + "&key=" + apiKey;
    fetch(apiUrlVidéoprinc)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            //console.log(data)
            const titre = data.items[0].snippet.title;
            const statistics = data.items[0].statistics;
            const likes = statistics.likeCount;
            const desc = data.items[0].snippet.description;



            const p_titre = document.getElementById("titre_princ");
            const p_like = document.getElementById("like_princ");
            const p_desc = document.getElementById("desc_princ");

            p_titre.textContent = titre;
            p_like.textContent = likes + " Likes";
            p_desc.textContent = desc;

        });

    var images = document.querySelectorAll("img");

    images.forEach(function (image) {
        const videoId = image.id;
 


        const apiUrl = "https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=" + recetteBDD.find(objet => objet.id == videoId).url + "&key=" + apiKey;
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const titre = data.items[0].snippet.title;
                const miniaurl = data.items[0].snippet.thumbnails.high.url;
                image.setAttribute("src", miniaurl);

                imgtitre = document.getElementById("texte" +videoId.toString());
                imgtitre.textContent = titre;
                ajusterHauteurFond(".video_princ");
            })

    });

}



var images = document.querySelectorAll('.image-droite');
images.forEach(function (image) {
    image.addEventListener('click', imageClicked);
});

function imageClicked(event) {
    var imageId = event.target.id;
    console.log("TARGET ID "+ imageId);
    //changement des liens
    var video = document.querySelector("iframe");
    var linktemp = video.id
    console.log("IFRAME ID "+ linktemp);
    video.id = imageId;
    event.target.id = linktemp;
    imgtitre = document.getElementById("texte" +imageId);
    imgtitre.id = ("texte" + linktemp);
    init();
    ajusterHauteurFond(".video_princ");
    





}