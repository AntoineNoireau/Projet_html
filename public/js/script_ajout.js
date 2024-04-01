document.addEventListener('DOMContentLoaded', function () {
    var current_nb = 0;

    var form_ingredient = document.getElementById('ingredient');
    var form_recette = document.getElementById('recette');

    var btn_valider = form_recette.querySelector('#ajouter_recette');
    var label = form_ingredient.querySelector('#nombre_ingredient');
    var btn_ajouter = form_ingredient.querySelector('#ajouter');
    var btn_supprimer = form_ingredient.querySelector('#supprimer');
    var btn_creer = form_ingredient.querySelector('#creer');

    let ingredients_recette = []
    
    btn_ajouter.addEventListener('click', function () {
        current_nb = creer_liste_deroulante(form_ingredient, current_nb);
        label.textContent = current_nb + ' Ingrédient(s) :';
    });

    btn_supprimer.addEventListener('click', function () {
        current_nb = supprimer_liste_deroulante(form_ingredient, current_nb);
        label.textContent = current_nb + ' Ingrédient(s) :';
    });

    btn_valider.addEventListener('click', function () {
        if (form_recette.checkValidity()) {
            ingredients_recette = RecupIngredient(form_ingredient, current_nb);

        } else {
            alert('Veuillez remplir tous les champs obligatoires.');
        }
    });

    btn_creer.addEventListener('click', function () {

    });
});

///////////////////////////////Fonction pour générer les cases de chaque ingrédient///////////////////////////////

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

        })
        .catch(error => {
            console.error('Erreur :', error);
            throw error; // Propage l'erreur pour la gérer ultérieurement si nécessaire
        });
    return i + 1;
}

///////////////////////////////Fonction pour supprimer les cases de chaque ingrédient///////////////////////////////

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

///////////////////////////////Fonction pour remplir le tableau d'ingrédient///////////////////////////////

function RecupIngredient(form, NbIngredient) {
    let tab = [];
    for (var i = 0; i < NbIngredient; i++) {
        tab.push(form.querySelector('#ingredient_' + i).value);
    }
    return tab;
}

///////////////////////////////Fonction pour transmettre les données///////////////////////////////

function EnvoieDonnes(nom,image,liste_ingredients){
    var data_recette = {
        liste_ingredients: liste_ingredients,
        nom: nom,
        image: image
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

