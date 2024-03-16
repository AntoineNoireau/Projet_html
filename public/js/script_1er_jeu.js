
//On choppe les recettes ici
recette1 = [];
recette2 = [];
fetch("json/recettes-ingredients.json")
  .then(response => response.json())
  .then(data => {

    data[2].data.forEach(elem => {
      // Accéder à chaque propriété (temp, vent, etc.)
      if (elem.id_recette == 1) {
        recette1.push(elem);
      } else {
        recette2.push(elem);
      }
    });





  });
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



// on chope les ingrédients transmit par le form et quand y'en a 5
const ingredientForm = document.getElementById("ingredientForm");
let selectedIngredientsArray = []
let Jeucontinu = true;
let nbproposion = 0;

ingredientForm.addEventListener("submit", function (event) {


  event.preventDefault(); // Pour empêcher la soumission du formulaire

  const selectedIngredient = document.querySelector('input[name="ingredient"]:checked');
  if (selectedIngredient) {

    selectedIngredientsArray.push(selectedIngredient.value);
    console.log(selectedIngredientsArray);
    const resultatsDiv = document.getElementById("resultats");

    const image = document.createElement("img");
    image.src = "png/gris.png";
    resultatsDiv.appendChild(image);


  } else {
    console.log("Aucun ingrédient sélectionné.");
  }

  if (selectedIngredientsArray.length === 5) {
    
            
    const verifArray = [0, 0, 0, 0, 0];
    for (let i = 0; i < selectedIngredientsArray.length; i++) {
       if (selectedIngredientsArray[i] == recette1[i].id_ingredient) {
        verifArray[i]++;
      } else {
        for (let j = 0; j < selectedIngredientsArray.length; j++) {
          if (selectedIngredientsArray[i] == recette1[j].id_ingredient && i != j) {
            verifArray[i] = 2;
          }
        }
      }
    }
    selectedIngredientsArray = [];


    const resultatsDiv = document.getElementById("resultats");
    
    // Fonction pour remplacer progressivement les images grises par les images colorées
    function remplacerImagesProgressivement(index) {
      
      return new Promise(resolve => {
        setTimeout(() => {
          if (index < verifArray.length) {
            
            if(nbproposion==0)
            {

               image = resultatsDiv.children[index]; 
            }
            else
            {

               image = resultatsDiv.children[resultatsDiv.childElementCount - 6 +index];
            }
            // Sélectionne l'image existante
            setTimeout(() => {
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

      
      
      nbproposion ++;
    });
    resultatsDiv.appendChild(document.createElement("br"));
    console.log(resultatsDiv)
    
    

    






  }






}
);