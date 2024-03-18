
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

ingredientForm.addEventListener("submit", function(event) {
    
  
  event.preventDefault(); // Pour empêcher la soumission du formulaire

  const selectedIngredient = document.querySelector('input[name="ingredient"]:checked');
  if (selectedIngredient) {

    selectedIngredientsArray.push(selectedIngredient.value);
    console.log(selectedIngredientsArray);

  } else {
    console.log("Aucun ingrédient sélectionné.");
  }

  if (selectedIngredientsArray.length === 5) {
    console.log("Vérification");
    const verifArray = [0, 0, 0, 0, 0];
    for (let i = 0; i < selectedIngredientsArray.length; i++) {
      console.log("Selected = " + selectedIngredientsArray[i] + "et recette[1] = " + recette1[i].id_ingredient);
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
    console.log("Tableau reset");


    const resultatsDiv = document.getElementById("resultats");
    verifArray.forEach((resultat) => {
        const image = document.createElement("img");
        if (resultat === 1) {
          image.src = "png/vert.png"; // Image pour un ingrédient bien placé
        } else if (resultat === 2) {
            image.src = "png/orange.png"; // Image pour un ingrédient mal placé
        } else {
            image.src = "png/rouge.png"; // Image pour un ingrédient absent
        }
        resultatsDiv.appendChild(image); 
      });

      resultatsDiv.appendChild(document.createElement("br"));


      

    }



      
    
    
  }
);