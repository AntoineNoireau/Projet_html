let nombreColonnes;

var min = 1;
var max = 2;
var numRecette = Math.floor(Math.random() * (max - min + 1)) + min;

////////////////////affichage recette////////////////////////
fetch("/json/recettes-ingredients.json")
  .then(response => response.json())
  .then(data => {
    const jsonRecettes = data;

    
    nombreColonnes = jsonRecettes[2].data.filter(item => item.id_recette === numRecette).length;

    //console.log('Nombre de colonnes égal à', numRecette, ':', nombreColonnes);

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
          //console.log(ingredient);
          //console.log('id=' + ingredientId);
          if (ingredient) {
            //console.log(ingredient.nom);

            tableauHtml += '<td><img src="' + ingredient.image + '"></td>';
            //console.log('tableauHtml=' + tableauHtml);

          }
        });
        tableauHtml += '</tr><tr>';

        ingredientsIds.forEach(ingredientId => {
          const ingredient = ingredientsJson[2].data.find(ingredient => ingredient.id === ingredientId);
          //console.log(ingredient);
          //console.log('id=' + ingredientId);
          if (ingredient) {
            //console.log(ingredient.nom);

            tableauHtml += '<td>' + ingredient.nom + '</td>';
            //console.log('tableauHtml=' + tableauHtml);

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
    //console.log("recette:"+recetteChar);
    recetteTableauHtml += '<td><button onclick="verifRecette(\'' + nomRecette + '\')">Valider</button></td>';
    recetteTableauHtml += '</tr>';

    recetteTableauHtml += '</table>';

    document.getElementById('tableJeu1').innerHTML = recetteTableauHtml;

    //console.log(recetteChar);
  })
  .catch(error => console.error('Erreur', error));

function verifRecette(nomRecette) {
  
  let recetteChar = nomRecette.split('');
  console.log(nomRecette);

  for (i = 0; i < recetteChar.length; i++) {    
    var case1 = document.getElementById(i + 1);

    var orange = false;
    var vert = false;

    if(case1.value.toLowerCase() === recetteChar[i]){
      vert = true;
    }
    else{
      for(j = 0; j < recetteChar.length; j++)
      {
        if(j != i & case1.value.toLowerCase() === recetteChar[j])
        {
          orange = true;
          break;
        }
      }
    }
    var count = 0;
    if(vert) {
        case1.style.backgroundColor = "green";
        count++;
    } else if(orange) {
        case1.style.backgroundColor = "orange";
    } else {
        case1.style.backgroundColor = "white";
    }
    case1.readOnly = true;
    if(count == recetteChar.length)
    {
      victoire();
    }
    else
    {
      nouvelleLigne(recetteChar);
    }
  }
}
function nouvelleLigne(recetteChar)
{

}
function victoire()
{

}
