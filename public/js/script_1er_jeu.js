
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

// Récupérer les données des ingrédients depuis le fichier JSON
fetch("json/ingredients.json")
    .then(response => response.json())
    .then(data => {
        const ingredients = data[2].data;
        
        // Sélection de l'élément parent du formulaire
        const ingredientFormParent = document.getElementById("ingredientForm");
        ingredientFormParent.appendChild(document.createElement("br"));




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

        // Ajout du bouton de soumission
        
        const submitButton = document.createElement("button");
        submitButton.id = "submitButton";
        submitButton.textContent = "Valider";
        ingredientFormParent.appendChild(submitButton);

        
        
    })
    .catch(error => console.error("Erreur lors de la récupération des données :", error));







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