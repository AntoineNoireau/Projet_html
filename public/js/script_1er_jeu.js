
//On choppe les recettes ici
recette = [];
ingredientdisplay = [];
display = [];
fetch("http://localhost:3000/jeu_1")
  .then(response => response.json())
  .then(data => {

    const recettesIngredients = new Map();

    console.log(data);

    data.listerep.forEach(elem => {
      const recetteId = elem.id_recette;
      const ingredientId = elem.id_ingredient;
      if (!recettesIngredients.has(recetteId)) {
        recettesIngredients.set(recetteId, []);
      }
      recettesIngredients.get(recetteId).push(ingredientId);

    });
    const randomNumber = Math.floor(Math.random() * 2) + 1;
    
    recette = recettesIngredients.get(randomNumber);

    display = recette.slice();
    const nonChoisies = Array.from(recettesIngredients.keys()).filter(id => id !== randomNumber)[0];
    let randomIngredientIndex = 0;
    for (let i = 0; i < 3; i++) {
      randomIngredientIndex = Math.floor(Math.random() * recettesIngredients.get(nonChoisies).length);
      while (display.includes(recettesIngredients.get(nonChoisies)[randomIngredientIndex])) {
        randomIngredientIndex = Math.floor(Math.random() * recettesIngredients.get(nonChoisies).length)
      }
      display.push(recettesIngredients.get(nonChoisies)[randomIngredientIndex])

    }
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
    const ingredients = data.ingredients;


    // Sélection de l'élément parent du formulaire
    const ingredientFormParent = document.getElementById("ingredientForm");

    console.log("display");

    display.forEach(elem => {
      console.log(elem)

      console.log(ingredients.find(item => item.id === elem))
      let nameelem = ingredients.find(item => item.id === elem).nom
      const input = document.createElement("input");
      input.type = "radio";
      input.id = nameelem;
      input.name = "ingredient";
      input.value = elem; // Utilisation de l'ID comme valeur

      const label = document.createElement("label");
      label.htmlFor = nameelem;
      label.textContent = nameelem;
      ingredientFormParent.appendChild(input);
      ingredientFormParent.appendChild(label);
      ingredientFormParent.appendChild(document.createElement("br"));






    })

    /*
      // Ajout des éléments au formulaire
      ingredients.forEach(ingredient => {
        const input = document.createElement("input");
        input.type = "radio";
        input.id = ingredient.nom; // Utilisation du nom comme ID
        input.name = "ingredient";
        input.value = ingredient.id; // Utilisation de l'ID comme valeur
  
        const label = document.createElement("label");
        label.htmlFor = ingredient.nom;
        label.textContent = ingredient.nom;
  
        ingredientFormParent.appendChild(input);
        ingredientFormParent.appendChild(label);
        ingredientFormParent.appendChild(document.createElement("br"));
  
  
  
      });
      */

    // Ajout du bouton de soumission

    const submitButton = document.createElement("button");
    submitButton.id = "submitButton";
    submitButton.textContent = "Valider";
    ingredientFormParent.appendChild(submitButton);



  })
  .catch(error => console.error("Erreur lors de la récupération des données :", error));


  fetch("http://localhost:3000/jeu_1")
  .then(response => response.json())
  .then(data => {

    console.log(data.listerep);

    console.log(data.ingredients);

  });



const ingredientForm = document.getElementById("ingredientForm");
let selectedIngredientsArray = []
let Jeucontinu = true;
let nbproposion = 0;

ingredientForm.addEventListener("submit", function (event) {


  event.preventDefault(); // Pour empêcher la soumission du formulaire

  const selectedIngredient = document.querySelector('input[name="ingredient"]:checked');
  if (selectedIngredient) {

    selectedIngredientsArray.push(selectedIngredient.value);
    console.log(selectedIngredient.id);
    const resultatsDiv = document.getElementById("resultats");

    const image = document.createElement("img");
    image.src = "png/gris.png";
    resultatsDiv.appendChild(image);

    const icone = document.createElement("img");
    icone.src = "png/" + selectedIngredient.id + ".png";
    icone.style.position = "absolute";

    // Positionner l'icône au centre de l'image gris
    const grisRect = image.getBoundingClientRect();
    const iconeWidth = icone.offsetWidth;
    const iconeHeight = icone.offsetHeight;
    const iconeTop = grisRect.top + (grisRect.height - iconeHeight) / 2;
    const iconeLeft = grisRect.left + (grisRect.width - iconeWidth) / 2;
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
    const submitButton = document.getElementById("submitButton");
    submitButton.disabled = true;


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

              image = resultatsDiv.children[resultatsDiv.childElementCount - (recette.length*2 + 1) + index * 2];
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
      
      
    if (verifArray.every(element => element === 1)) {
      texte = document.createElement("p")
      texte.textContent = "Bien joué";
      resultatsDiv.appendChild(texte);
      

    }else{
      submitButton.disabled = false;

    }

    });
    resultatsDiv.appendChild(document.createElement("br"));









  }






}
);