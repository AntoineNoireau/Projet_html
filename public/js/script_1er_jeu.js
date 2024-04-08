var tentative = 0;
var nbTourMax = 6;

//set niveau de difficulté
var difficulte = 1;

window.onload = function () {
  const sliderValue = localStorage.getItem("sliderValue");
  if (sliderValue !== null) {
    difficulte = parseInt(sliderValue);
  }
};
//On choppe les recettes ici
recette = [];
ingredientdisplay = [];
listingredient = [];
display = [];

fetch("http://localhost:3000/jeu_1")
  .then(response => response.json())
  .then(data => {
    console.log(data);

    recette = data.listerep
      .map(item => item.id_ingredient)
      .sort((a, b) => {
        const ordreA = data.listerep.find(e => e.id_ingredient === a)?.ordre;
        const ordreB = data.listerep.find(e => e.id_ingredient === b)?.ordre;

        return ordreA - ordreB;
      });;
    console.log("recette = " + recette)
    listingredient = data.ingredients;
    console.log("Listingr = ", listingredient);

    display = data.ingredients;
    for (let i = display.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [display[i], display[j]] = [display[j], display[i]]; // Échange des éléments
    }

    //On choppe les ingrédients ici
    /*
    ingredient = []
    fetch("json/ingredients.json")
      .then(response => response.json())
      .then(data => {
    
    
        data[2].data.forEach(elem => {
          ingredient.push(elem);
        });
      });
      */

    // Récupérer les données des ingrédients depuis le fichier JSON
    // Sélection du formulaire
    const ingredientForm = document.getElementById("ingredientForm");

    display.forEach(elem => {
      /*
      let nameelem = elem.nom
      const input = document.createElement("input");
      input.type = "radio";
      input.id = nameelem;
      input.name = "ingredient";
      input.value = elem.id; // Utilisation de l'ID comme valeur

      const label = document.createElement("label");
      label.htmlFor = nameelem;
      label.textContent = nameelem;
      ingredientForm.appendChild(input);
      ingredientForm.appendChild(label);
      ingredientForm.appendChild(document.createElement("br"));
      */

      const ingredientForm = document.getElementById("ingredientForm");

      const div_nom = document.getElementById("nom_ingr");

      const image = document.createElement("img");
      image.src = "png/gris.png";
      ingredientForm.appendChild(image);
      const icone = document.createElement("img");
      icone.src = "png/" + elem.nom + ".png";
      icone.style.position = "relative";

      // Positionner l'icône au centre de l'image gris
      const grisRect = image.getBoundingClientRect();
      const iconeWidth = icone.offsetWidth;
      const iconeHeight = icone.offsetHeight;
      // const iconeTop = grisRect.top + (grisRectheight - iconeHeight) / 2;
      // const iconeLeft = grisRect.left + (grisRect.width - iconeWidth) / 2;
      const iconeTop = 0;
      const iconeLeft = -30;
      icone.style.marginTop = "-25px";
      icone.style.marginLeft = "-25px";

      icone.style.top = iconeTop + "px";
      icone.style.left = iconeLeft + "px";

      icone.style.zIndex = "1";
      icone.id = elem.nom;

      icone.addEventListener("click", imageClicked);
      icone.classList.add("script");

      
      
      // Ajoutez la nouvelle div juste après l'élément existant
      
      //const nomIngredient = document.createElement("p");
      //nomIngredient.textContent = elem.nom;
      //nomIngredient.style.position = "center";

      ingredientForm.appendChild(icone);// Ajout du paragraphe à la même div que l'image
      

      //div_nom.appendChild(nomIngredient);

    })
    form = document.getElementById("ingredientForm");
    (form.querySelectorAll('[id]')).forEach(element => {
      var divnouvingr = document.createElement('div');
      divnouvingr.textContent = element.id;
      divnouvingr.style.position = 'relative'; // Utilisez une position relative pour positionner la nouvelle div par rapport à sa position normale
      divnouvingr.style.top = '20px'; // Ajustez la valeur selon votre préférence pour la distance entre les deux éléments
      divnouvingr.style.margin = '0 auto';
      element.parentNode.insertBefore(divnouvingr, element.nextSibling);
    });


  })
  .catch(error => console.error("Erreur lors de la récupération des données :", error));

const ingredientForm = document.getElementById("ingredientForm");
let selectedIngredientsArray = []
let Jeucontinu = true;
let nbproposion = 0;

function imageClicked(event) {

  const selectedIngredient = event.target.id;
  if (selectedIngredient) {
    event.target.removeEventListener("click", imageClicked);

    selectedIngredientsArray.push(listingredient.find(ingr => ingr.nom === selectedIngredient).id);
    const resultatsDiv = document.getElementById("resultats");

    const image = document.createElement("img");
    image.src = "png/gris.png";
    resultatsDiv.appendChild(image);

    const icone = document.createElement("img");
    icone.src = "png/" + selectedIngredient + ".png";
    icone.style.position = "relative";

    // Positionner l'icône au centre de l'image gris
    const grisRect = image.getBoundingClientRect();
    const iconeWidth = icone.offsetWidth;
    const iconeHeight = icone.offsetHeight;
    // const iconeTop = grisRect.top + (grisRect.height - iconeHeight) / 2;
    // const iconeLeft = grisRect.left + (grisRect.width - iconeWidth) / 2;
    const iconeTop = 0;
    const iconeLeft = -30;
    icone.style.marginTop = "-25px";
    icone.style.marginLeft = "-25px";

    icone.style.top = iconeTop + "px";
    icone.style.left = iconeLeft + "px";

    icone.style.zIndex = "1";
    resultatsDiv.appendChild(icone);

  } else {
    console.log("Aucun ingrédient sélectionné.");
  }

  if (selectedIngredientsArray.length === recette.length) {

    const ingredientForm = document.getElementById("ingredientForm");
    imagecliquable = ingredientForm.querySelectorAll(".script");
    imagecliquable.forEach(img => {
      img.removeEventListener("click", imageClicked);

    });

    const verifArray = new Array(recette.length).fill(0);

    for (let i = 0; i < selectedIngredientsArray.length; i++) {
      console.log("Ingédient select: " + selectedIngredientsArray[i]);

      console.log("Ingédient bdd: " + recette[i]);
      if (selectedIngredientsArray[i] == recette[i]) {
        verifArray[i]++;
      } else {
        for (let j = 0; j < selectedIngredientsArray.length; j++) {
          if (selectedIngredientsArray[i] == recette[j] && i != j) {
            verifArray[i] = 2;
          }
        }
      }
    }
    selectedIngredientsArray = [];
    console.log("Verif = " + verifArray)


    const resultatsDiv = document.getElementById("resultats");

    // Fonction pour remplacer progressivement les images grises par les images colorées
    function remplacerImagesProgressivement(index) {

      return new Promise(resolve => {
        setTimeout(() => {
          if (index < recette.length) //car une div aura 10 element
          {

            if (nbproposion == 0) {

              image = resultatsDiv.children[index * 2];
            }
            else {

              image = resultatsDiv.children[resultatsDiv.childElementCount - (recette.length * 2 + 1) + index * 2];
              //indice a modifié en fonction du nombre d'éléments dans la div
            }
            // Sélectionne l'image existante
            setTimeout(() => {
              console.log("verif[index] = " + verifArray[index])
              if (verifArray[index] === 1) {
                image.src = "png/vert.png"; // Image pour un ingrédient bien placé
              } else if (verifArray[index] === 2) {
                image.src = "png/orange.png"; // Image pour un ingrédient mal placé
              } else {
                image.src = "png/rouge.png"; // Image pour un ingrédient absent
              }
            }, 50); // Délai avant de remplacer l'image grise par l'image colorée
            remplacerImagesProgressivement(index + 1).then(resolve);
          } else {
            resolve();

          }
        }, 1000); // Ajoute une pause d'une seconde entre chaque ajout
      });
    }

    // Début de la séquence de remplacement progressif
    remplacerImagesProgressivement(0).then(() => {
      console.log(resultatsDiv)
      console.log(resultatsDiv.children[0])
      nbproposion++;
      const ingredientForm = document.getElementById("ingredientForm");
      imagecliquable = ingredientForm.querySelectorAll(".script");
      imagecliquable.forEach(img => {
        img.addEventListener("click", imageClicked);

      });

      if (verifArray.every(element => element === 1)) {
        explodeConfetti();


      } else {
        submitButton.disabled = false;
        tentative++;
        if (tentative === nbTourMax) {
          generateEmojiExplosion();
        }

      }

    });
    resultatsDiv.appendChild(document.createElement("br"));









  }






}

