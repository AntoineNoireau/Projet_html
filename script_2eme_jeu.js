let nombreColonnes;

fetch("recettes-ingredients.json")
  .then(response => response.json())
  .then(data => {
    const jsonRecettes = data;

    var min = 1;
    var max = 2;
    var numRecette = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(numRecette);
    nombreColonnes = jsonRecettes[2].data.filter(item => item.id_recette === numRecette).length;

    console.log('Nombre de colonnes égal à', numRecette, ':', nombreColonnes);

    const ingredientsIds = jsonRecettes[2].data
      .filter(item => item.id_recette === numRecette)
      .map(item => item.id_ingredient);

    fetch("ingredients.json")
      .then(response => response.json())
      .then(data => {
        const ingredientsJson = data;

        ingredientsIds.forEach(ingredientId => {
          const ingredient = ingredientsJson.find(ingredient => ingredient.id === ingredientId);
          if (ingredient) {
            tableauHtml += '<td>' + ingredient.nom + '</td>';
          }
        });

        tableauHtml += '</tr>';
        tableauHtml += '</table>';

        document.getElementById('tableContainer').innerHTML = tableauHtml;
      })
      .catch(error => console.error('Erreur de chargement du fichier JSON "ingredients.json":', error));
  })
  .catch(error => console.error('Erreur de chargement du fichier JSON "recettes-ingredients.json":', error));
