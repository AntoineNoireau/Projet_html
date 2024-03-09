let nombreColonnes;

fetch("recettes-ingredients.json")
  .then(response => response.json())
  .then(data => {
    const jsonRecettes = data;

    var min = 1;
    var max = 2;
    var numRecette = Math.floor(Math.random() * (max - min + 1)) + min;
    nombreColonnes = jsonRecettes[2].data.filter(item => item.id_recette === numRecette).length;

    console.log('Nombre de colonnes égal à', numRecette, ':', nombreColonnes);

    const ingredientsIds = jsonRecettes[2].data
      .filter(item => item.id_recette === numRecette)
      .map(item => item.id_ingredient);

    fetch("ingredients.json")
      .then(response => response.json())
      .then(data => {
        const ingredientsJson = data;

        var tableauHtml = '<table> <tr>';

        ingredientsIds.forEach(ingredientId => {
          const ingredient = ingredientsJson[2].data.find(ingredient => ingredient.id === ingredientId);
          console.log(ingredient);
          console.log('id=' + ingredientId);
          if (ingredient) {
            console.log(ingredient.nom);

            tableauHtml += '<td><img src="' + ingredient.image + '"></td>';
            console.log('tableauHtml=' + tableauHtml);

          }
        });
        tableauHtml += '</tr><tr>';

        ingredientsIds.forEach(ingredientId => {
          const ingredient = ingredientsJson[2].data.find(ingredient => ingredient.id === ingredientId);
          console.log(ingredient);
          console.log('id=' + ingredientId);
          if (ingredient) {
            console.log(ingredient.nom);

            tableauHtml += '<td>' + ingredient.nom + '</td>';
            console.log('tableauHtml=' + tableauHtml);

          }
        });

        tableauHtml += '</tr>';
        tableauHtml += '</table>';

        document.getElementById('tableContainer').innerHTML = tableauHtml;
      })
      .catch(error => console.error('Erreur de chargement du fichier JSON "ingredients.json":', error));
  })
  .catch(error => console.error('Erreur de chargement du fichier JSON "recettes-ingredients.json":', error));
