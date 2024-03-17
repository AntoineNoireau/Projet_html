let nombreColonnes;
var numRecette
////////////////////affichage recette////////////////////////
fetch("http://localhost:3000/ingredients")
  .then(response => response.json())
  .then(data => {

    var min = 1;
    var max = 2;
    numRecette = Math.floor(Math.random() * (max - min + 1)) + min;
    nombreColonnes = data.filter(item => item.id_recette === numRecette).length;

    //console.log('Nombre de colonnes égal à', numRecette, ':', nombreColonnes);

    const ingredientsIds = data
      .filter(item => item.id_recette === numRecette)
      .map(item => item.id_ingredient);

    fetch("http://localhost:3000/ingredients")
      .then(response => response.json())
      .then(data => {
        // 'data' est directement le tableau des ingrédients, pas besoin de '.data'
        console.log(data);
        var tableauHtml = '<table> <tr>';
    
        ingredientsIds.forEach(ingredientId => {
          const ingredient = data.find(ingredient => ingredient.id === ingredientId); // Utilisez 'data.find' directement
          if (ingredient) {
            tableauHtml += '<td><img src="' + ingredient.image + '"></td>';
          }
        });
        tableauHtml += '</tr><tr>';
    
        ingredientsIds.forEach(ingredientId => {
          const ingredient = data.find(ingredient => ingredient.id === ingredientId); // Utilisez 'data.find' directement
          if (ingredient) {
            tableauHtml += '<td>' + ingredient.nom + '</td>';
          }
        });
    
        tableauHtml += '</tr>';
        tableauHtml += '</table>';
    
        document.getElementById('tableContainer').innerHTML = tableauHtml;
      })
      .catch(error => console.error('Erreur:', error));
    
  })
  .catch(error => console.error('Erreur', error));

//////////////////////////Jeu///////////////////////////////////

fetch("http://localhost:3000/recettes")
  .then(response => response.json())
  .then(data => {

    console.log(data);
    var nomRecette = data.filter(item => item.id === numRecette)[0].nom;

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
