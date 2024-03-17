let nombreColonnes;
var numRecette
////////////////////affichage recette////////////////////////
fetch("http://localhost:3000/recettes-ingredients")
  .then(response => response.json())
  .then(data => {
    const jsonRecettes = data;

    var min = 1;
    var max = 2;
    numRecette = Math.floor(Math.random() * (max - min + 1)) + min;
    nombreColonnes = jsonRecettes[2].data.filter(item => item.id_recette === numRecette).length;

    //console.log('Nombre de colonnes égal à', numRecette, ':', nombreColonnes);

    const ingredientsIds = jsonRecettes.data
      .filter(item => item.id_recette === numRecette)
      .map(item => item.id_ingredient);

    fetch("http://localhost:3000/ingredients")
      .then(response => response.json())
      .then(data => {
        const ingredientsJson = data;

        var tableauHtml = '<table> <tr>';

        ingredientsIds.forEach(ingredientId => {
          const ingredient = ingredientsJson.data.find(ingredient => ingredient.id === ingredientId);
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
          const ingredient = ingredientsJson.data.find(ingredient => ingredient.id === ingredientId);
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

fetch("http://localhost:3000/recettes")
  .then(response => response.json())
  .then(data => {
    const jsonRecettes = data;

    var nomRecette = jsonRecettes.data.filter(item => item.id_recette === numRecette)[0].nom;

    let recetteChar = nomRecette.split('');
    let recetteCharSize = recetteChar.length;
    var recetteTableauHtml = '<table><tr>';
    for (i = 0; i < recetteCharSize; i++) {
      recetteTableauHtml += '<td> <input type="text" id="' + (i + 1) + '" minlength="0" maxlength="1" size="1" /></td>';
    }
    recetteTableauHtml += '<td><button onclick="verifRecette(' + recetteCharSize + ')">Valider</button></td>';
    recetteTableauHtml += '</tr>';



    recetteTableauHtml += '</table>';

    document.getElementById('tableJeu1').innerHTML = recetteTableauHtml;

    //console.log(recetteChar);



  })
  .catch(error => console.error('Erreur', error));

function verifRecette(recetteChar) {

  for (i = 0; i < recetteCharSize.length; i++) {
    var case1 = document.getElementById(i + 1);
  }

}
