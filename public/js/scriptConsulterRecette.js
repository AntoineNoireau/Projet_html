var current_nb = 0;

document.addEventListener('DOMContentLoaded', function () {

    var form_ingredient = document.getElementById('ingredient');

    var label = form_ingredient.querySelector('#nombre_ingredient');
    var btn_ajouter = form_ingredient.querySelector('#ajouter');
    var btn_supprimer = form_ingredient.querySelector('#supprimer');
    var btn_valider = form_ingredient.querySelector('#valider');

    let ingredients_recette = []
    
    btn_ajouter.addEventListener('click', function () {
        current_nb = creer_liste_deroulante(form_ingredient, current_nb);
        label.textContent = current_nb + ' Ingrédient(s) :';
    });

    btn_valider.addEventListener('click', function () {
        valider();
    });

    btn_supprimer.addEventListener('click', function () {
        current_nb = supprimer_liste_deroulante(form_ingredient, current_nb);
        label.textContent = current_nb + ' Ingrédient(s) :';
    });

});

function valider()
{
    var ingredients = [];

    for (var i = 0; i < current_nb; i++) {
        var select = document.getElementById('ingredient_' + i);
        var selectedIngredient = select.value;
        ingredients.push(selectedIngredient);
    }

    var data_to_send = {
        ingredients: ingredients
    };
    
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data_to_send)
    };

    var url = 'http://localhost:3000/id-recette-ingredient';

    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la requête : ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Réponse du serveur :', data);  
            if(data.length === 0) 
            {
                var tableauHtml = '<p style="text-align: center;"> Aucune recette trouvée </p>';
                document.getElementById('tableContainer').innerHTML = tableauHtml;
            }
            else
            {            
                data_to_send = {
                    id: data
                };
                requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data_to_send)
                };
                url = 'http://localhost:3000/id-recette-ingredient-suite';
                fetch(url, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur lors de la requête : ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Réponse du serveur 2:', data);
                    //////// afficher les recettes possibles/////////
                    var tableauHtml = '';
                    for(i = 0; i < data.recette.length;i++)
                    {           

                        numRecette = data.recette[i].id
                        nombreColonnes = data.listerep.filter(item => item.id_recette === numRecette).length;

                        ingredientsIds = data.listerep
                        .filter(item => item.id_recette === numRecette)
                        .map(item => item.id_ingredient)
                        .sort((a, b) => {
                            const ordreA = data.listerep.find(e => e.id_ingredient === a && e.id_recette === numRecette)?.ordre;
                            const ordreB = data.listerep.find(e => e.id_ingredient === b && e.id_recette === numRecette)?.ordre;
                            
                            return ordreA - ordreB;
                        });                  

                        tableauHtml += '<p style="text-align: center;"> Recette possible n°'+(i+1)+' : '+ data.recette[i].nom+' </p> <table style="text-align: center;"> <tr>';

                        ingredientsIds.forEach(ingredientId => {
                            ingredient = data.ingredients.find(ingredient => ingredient.id === ingredientId);
                
                            if (ingredient) {
                                tableauHtml += '<td><img src="' + ingredient.image + '"></td>';
                            }
                        });
                        tableauHtml += '</tr><tr>';
                
                        ingredientsIds.forEach(ingredientId => {
                            const ingredient = data.ingredients.find(ingredient => ingredient.id === ingredientId);
                
                            if (ingredient) {
                                tableauHtml += '<td>' + ingredient.nom + '</td>';
                            }
                        });     

                        tableauHtml += '</tr>';
                        tableauHtml += '</table>';                    
                    }
                    
                    document.getElementById('tableContainer').innerHTML = tableauHtml;

                })
                .catch(error => {
                    console.error('Erreur :', error);
                });
            }
        })
        .catch(error => {
            console.error('Erreur :', error);
        });    
}

function creer_liste_deroulante(form, nb) {
    var i = nb;
    var div = document.createElement('div');
    div.id = 'div_' + i
    var label = document.createElement('label');
    //console.log('label_' + i);
    label.textContent = 'Ingrédient n°' + (i + 1) + ': '; // Texte du label
    label.id = 'label_' + i;
    div.appendChild(label);

    fetch('http://localhost:3000/ingredients')
        .then(response => { return response.json(); })
        .then(data => {
            // Création de la liste déroulante
            var select = document.createElement('select');
            select.id = 'ingredient_' + i; // ID de la liste déroulante
            const noms = data.map(item => item.nom);

            // Maintenant, noms contient uniquement les noms des ingrédients
            //console.log(noms);
            // Parcours des données et ajout d'une option pour chaque élément
            noms.forEach(nom => {
                var option = document.createElement('option');
                option.innerText = nom; // Utilisez innerText pour définir le texte de l'option
                select.appendChild(option);
            });

            // Ajout de la liste déroulante au formulaire
            div.appendChild(select);

            div.appendChild(document.createElement('br'));

            form.appendChild(div);
            ajusterHauteurFond(".consulter");
        })
        .catch(error => {
            console.error('Erreur :', error);
            throw error; // Propage l'erreur pour la gérer ultérieurement si nécessaire
        });
    return i + 1;
}

function supprimer_liste_deroulante(form, nb) {
    if (nb > 0) {
        var div = form.querySelector('#div_' + (nb - 1));
        //console.log('label_' + nb);
        div.remove();

        return nb - 1;
    }
    else {
        error.log('aucun ingrédient à supprimer');
        return 0;
    }
}