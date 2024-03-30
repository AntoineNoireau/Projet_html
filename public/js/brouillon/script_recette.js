document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('recette');
    var btn = document.getElementById('ajouter');
    btn.addEventListener('click', function () {
        var nb_ingredients = document.getElementById('nb_ingredient').value;
        form.style.display = 'none';
        CasesIngredients(nb_ingredients);
        var btn_ingredient = document.getElementById('button_list_ingredient');
        var form_ingredients = document.getElementById('champs_ingredient');
        btn_ingredient.addEventListener('click', function () {
            form_ingredients.style.display = 'none';
            let Ingredients = [];
            Ingredients = RecupIngredient(form_ingredients, nb_ingredients);
            EnvoieRecette(Ingredients, form_ingredients.querySelector('#NomRecette').value, form_ingredients.querySelector('#ImageRecette').value);
        });
    });
});


///////////////////////////////Fonction pour générer les cases de chaque ingrédient///////////////////////////////
function CasesIngredients(Nb_Ingredient) {
    // Création des éléments du formulaire
    var form = document.createElement('form');
    form.id = 'champs_ingredient';
    var label = document.createElement('label');
    label.textContent = 'Ingrédient dans l\'ordre : '; // Texte du label

    form.appendChild(label);

    for (var i = 0; i < Nb_Ingredient; i++) {
        form.appendChild(document.createElement('br'));

        var label = document.createElement('label');
        label.textContent = 'Ingrédient n°' + (i + 1) + ': '; // Texte du label
        label.id = 'label_' + i;
        form.appendChild(label);

        fetch('http://localhost:3000/ingredients')
            .then(response => { return response.json(); })
            .then(data => {
                // Création de la liste déroulante
                var select = document.createElement('select');
                select.id = 'ingredient_' + i; // ID de la liste déroulante
                const noms = data.map(item => item.nom);

                // Maintenant, noms contient uniquement les noms des ingrédients
                console.log(noms);
                // Parcours des données et ajout d'une option pour chaque élément
                noms.forEach(nom => {
                    var option = document.createElement('option');
                    option.innerText = nom; // Utilisez innerText pour définir le texte de l'option
                    select.appendChild(option);
                });

                // Ajout de la liste déroulante au formulaire
                form.appendChild(select);

            })
            .catch(error => {
                console.error('Erreur :', error);
                throw error; // Propage l'erreur pour la gérer ultérieurement si nécessaire
            });
    }

    form.appendChild(document.createElement('br'));

    var button = document.createElement('button');
    button.type = 'button'; // Type du bouton
    button.id = 'button_create_ingredient';
    button.textContent = 'Créer un ingrédient'; // Texte du bouton
    form.appendChild(button);

    form.appendChild(document.createElement('br'));
    form.appendChild(document.createElement('br'));

    var label = document.createElement('label');
    label.textContent = 'Nom de la recette : '; // Texte du label
    label.id = 'label_nom_recette';
    form.appendChild(label);

    var input = document.createElement('input');
    input.type = 'text'; // Type de champ
    input.id = 'NomRecette'; // ID du champ
    form.appendChild(input);

    form.appendChild(document.createElement('br'));

    var label = document.createElement('label');
    label.textContent = 'Image de la recette : '; // Texte du label
    label.id = 'label_image';
    form.appendChild(label);

    var input = document.createElement('input');
    input.type = 'text'; // Type de champ
    input.id = 'ImageRecette'; // ID du champ
    form.appendChild(input);

    form.appendChild(document.createElement('br'));
    form.appendChild(document.createElement('br'));

    var button = document.createElement('button');
    button.type = 'button'; // Type du bouton
    button.id = 'button_list_ingredient';
    button.textContent = 'Soumettre'; // Texte du bouton
    form.appendChild(button);

    // Ajout du formulaire au document
    document.body.appendChild(form);

}



///////////////////////////////Fonction pour remplir le tableau d'ingrédient///////////////////////////////
function RecupIngredient(form, NbIngredient) {
    let tab = [];
    for (var i = 0; i < NbIngredient; i++) {
        tab.push(form.querySelector('#ingredient_' + i).value);
    }
    return tab;
}


///////////////////////////////Fonction pour envoyer la nouvelle recette à la bdd///////////////////////////////
function ReceptionListeIngredient(tab, nomRecette, imgRecette) {
    var data_recette = {
        liste_ingredient: tab,
        nom: nomRecette,
        image: imgRecette
    };

    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data_recette)
    };

    var url = 'http://localhost:3000/AjoutRecette';

    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la requête : ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Réponse du serveur :', data);
        })
        .catch(error => {
            console.error('Erreur :', error);
        });
}

///////////////////////////////Fonction pour imposer les ingrédient à l'utilisateur///////////////////////////////

///////////////////////////////Fonction pour récupérer la liste des ingrédients///////////////////////////////

///////////////////////////////Fonction pour manipuler les données reçues///////////////////////////////


