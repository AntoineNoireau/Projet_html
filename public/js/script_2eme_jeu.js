let nombreColonnes;

var min = 1;
var max = 2;
var numRecette = Math.floor(Math.random() * (max - min + 1)) + min;
var nbTour = 1;


////////////////////affichage recette////////////////////////
fetch("/json/recettes-ingredients.json")
  .then(response => response.json())
  .then(data => {
    const jsonRecettes = data;

    nombreColonnes = jsonRecettes[2].data.filter(item => item.id_recette === numRecette).length;

    const ingredientsIds = jsonRecettes[2].data
      .filter(item => item.id_recette === numRecette)
      .map(item => item.id_ingredient);

    fetch("/json/ingredients.json")
      .then(response => response.json())
      .then(data => {
        const ingredientsJson = data;

        var tableauHtml = '<table> <tr>';

        ingredientsIds.forEach(ingredientId => {
          const ingredient = ingredientsJson[2].data.find(ingredient => ingredient.id === ingredientId);

          if (ingredient) {
            tableauHtml += '<td><img src="' + ingredient.image + '"></td>';
          }
        });
        tableauHtml += '</tr><tr>';

        ingredientsIds.forEach(ingredientId => {
          const ingredient = ingredientsJson[2].data.find(ingredient => ingredient.id === ingredientId);

          if (ingredient) {
            tableauHtml += '<td>' + ingredient.nom + '</td>';
          }
        });

        tableauHtml += '</tr>';
        tableauHtml += '</table>';

        document.getElementById('tableContainer').innerHTML = tableauHtml;
      })
      .catch(error => console.error('Erreur', error));
  })
  .catch(error => console.error('Erreur', error));

//////////////////////////Jeu///////////////////////////////////

fetch("/json/recettes.json")
  .then(response => response.json())
  .then(data => {
    const jsonRecettes = data;

    var nomRecette = jsonRecettes[2].data.filter(item => item.id === numRecette)[0].nom;

    let recetteChar = nomRecette.split('');
    let recetteCharSize = recetteChar.length;
    var recetteTableauHtml = '<table><tr>';

    for (i = 0; i < recetteCharSize; i++) {
      recetteTableauHtml += '<td> <input type="text" id="' + (i + 1) + '" minlength="0" maxlength="1" size="1" /></td>';
    }
    recetteTableauHtml += '<td><button onclick="verifRecette(\'' + nomRecette + '\')">Valider</button></td>';
    recetteTableauHtml += '</tr>';

    recetteTableauHtml += '</table>';

    document.getElementById('tableJeu1').innerHTML = recetteTableauHtml;

    var inputs = document.querySelectorAll("#tableJeu1 input[type='text']");
    var lastRowFirstInput = inputs[inputs.length - recetteCharSize];
    lastRowFirstInput.focus();

    inputs.forEach(function(input, index) {
      input.addEventListener('input', function() {
        if (this.value.length === this.maxLength) {
          if (index < inputs.length - 1) {
            inputs[index + 1].focus();
          }
        }
      });
    });
  })
  .catch(error => console.error('Erreur', error));

  function verifRecette(nomRecette) {
    let recetteChar = nomRecette.split('');
    var count = 0;
    var lettresCorrectes = new Array(recetteChar.length).fill("");
    var lettresIncorrectes = [];
  
    for (i = 0; i < recetteChar.length; i++) {  
        var case1 = document.getElementById(i + 1 + (nbTour - 1) * recetteChar.length);
         
        if(case1.value.toLowerCase() === recetteChar[i]){
          
          case1.readOnly = true;
          case1.style.backgroundColor = "green";
          lettresCorrectes[i] = recetteChar[i];
          count++;
        }   
    }
    for (i = 0; i < recetteChar.length; i++) {  

      var case1 = document.getElementById(i + 1 + (nbTour - 1) * recetteChar.length);      
      if(case1.style.backgroundColor != "green")
      {
        for(j = 0; j < recetteChar.length; j++) {
          if(lettresCorrectes[j] === "")
          {
            if(j !== i && case1.value.toLowerCase() === recetteChar[j]) {
              case1.readOnly = true;
              case1.style.backgroundColor = "orange";
              lettresCorrectes[j] = recetteChar[i];              
              break;
            }
          } 
        }
      }      
    }
   
    if(count == recetteChar.length) {
        victoire();
    } else {
        if(nbTour == 6) {
            perdu();
        } else {
            nbTour++;
            nouvelleLigne(nomRecette, nbTour);  
        }          
    }
}
function nouvelleLigne(nomRecette, nb)
{
  let recetteChar = nomRecette.split('');
  let recetteCharSize = recetteChar.length;
  var recetteTableauHtml = '<table><tr>';
  for (i = 0; i < recetteCharSize; i++) {
    recetteTableauHtml += '<td> <input type="text" id="' + (i + 1+ (nb-1)*recetteCharSize) + '" minlength="0" maxlength="1" size="1" /></td>';
  }
  recetteTableauHtml += '</tr>';

  recetteTableauHtml += '</table>';

  document.getElementById('tableJeu'+nb).innerHTML = recetteTableauHtml;

  var lastRowInputs = document.querySelectorAll("#tableJeu" + nb + " input[type='text']");
  var lastRowFirstInput = lastRowInputs[lastRowInputs.length - recetteCharSize];
  lastRowFirstInput.focus();
  
  var inputs = document.querySelectorAll("#tableJeu" + nb + " input[type='text']");
  inputs.forEach(function(input, index) {
    input.addEventListener('input', function() {
      if (this.value.length === this.maxLength) {
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      }
    });
  });
}
function victoire()
{
  alert("Vous avez gagné");
}
function perdu()
{
  alert("Vous avez perdu");

}


document.addEventListener('keydown', function(event) {
  if (event.key === "Enter") {
      document.querySelector("#tableJeu1 button").click();
  }
});