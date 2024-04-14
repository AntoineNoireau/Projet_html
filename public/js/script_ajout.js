document.addEventListener('DOMContentLoaded', function () {
    var current_nb = 0;
    var current_nb_know = 0;
    var current_nb_unknow = 0;

    var bool = [];

    var form_ingredient = document.getElementById('ingredient');

    var label = form_ingredient.querySelector('#nombre_ingredient');
    var btn_ajouter = form_ingredient.querySelector('#ajouter');
    var btn_supprimer = form_ingredient.querySelector('#supprimer');
    var btn_creer = form_ingredient.querySelector('#creer');
    
    btn_ajouter.addEventListener('click', function () {
        var result = creer_liste_deroulante(form_ingredient, current_nb, current_nb_know);
        current_nb = result[0];
        current_nb_know = result[1];
        label.textContent = current_nb + ' Ingrédient(s) :';
        bool.push(0);
        console.log(current_nb_know);
        console.log(current_nb);
    });

    btn_creer.addEventListener('click', function () {
        var result = creer_champs(form_ingredient, current_nb,current_nb_unknow);
        current_nb = result[0];
        current_nb_unknow = result[1];
        label.textContent = current_nb + ' Ingrédient(s) :';
        bool.push(1);
        console.log(current_nb_unknow);
        console.log(current_nb);
    });

    btn_supprimer.addEventListener('click', function () {
        result = supprimer_liste_deroulante(form_ingredient, current_nb, current_nb_know, current_nb_unknow, bool);
        current_nb = result[0];
        current_nb_know = result[1];
        current_nb_unknow = result[2];
        bool = result[3];
    });

    var form_recette = document.getElementById('recette');
    var btn_valider = document.querySelector('#ajouter_recette'); // Sélection déplacée ici
    
    btn_valider.addEventListener('click', function () {
        let image = document.getElementById('recette_url').value; // Correction ici
        let nom = document.getElementById('recette_nom').value; // Correction ici
        let video = CodeVideo(document.getElementById('recette_video').value); // Correction ici
        if (form_recette.checkValidity()) {
            result = RecupIngredient(form_ingredient, current_nb, bool);
            console.log(video);
            EnvoieDonnes(nom, image, video, result[0], result[1]); // Utilisez .value pour obtenir la valeur des éléments input
    
        } else {
            alert('Veuillez remplir tous les champs obligatoires.');
        }
    });    
});

///////////////////////////////Fonction pour générer les cases de chaque ingrédient///////////////////////////////

function creer_liste_deroulante(form, nb, nb_know) {
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
    return [i + 1, nb_know + 1];
}

///////////////////////////////Fonction pour générer les inputs de chaque ingrédient///////////////////////////////

function creer_champs(form,nb, nb_unknown) {
    var i = nb;
    var div = document.createElement('div');
    div.id = 'div_' + i
    var label = document.createElement('label');
    //console.log('label_' + i);
    label.textContent = 'Ingrédient n°' + (i + 1) + ': '; // Texte du label
    label.id = 'label_' + i;
    div.appendChild(label);
    var ingredient = document.createElement('input');
    ingredient.id = 'ingredient_' + i;
    ingredient.type = 'text';
    ingredient.placeholder = 'nom ingrédient';
    div.appendChild(ingredient);

    var image = document.createElement('input');
    image.id = 'ingredient_image_' + i;
    image.type = 'text';
    image.placeholder = 'url de l\'image'
    div.appendChild(image);

    //Créer des inputs ici

    form.appendChild(div);
    return [i + 1,nb_unknown+1];
}

///////////////////////////////Fonction pour supprimer les cases de chaque ingrédient///////////////////////////////

function supprimer_liste_deroulante(form, nb, nb_know, nb_unknown, bool_new) {
    if (nb > 0) {
        var div = form.querySelector('#div_' + (nb - 1));
        //console.log('label_' + nb);
        div.remove();

        if(bool_new[nb-1] == 0){
            bool_new.pop();
            return [nb - 1, nb_know - 1, nb_unknown,bool_new];
        }
        else{
            bool_new.pop();
            return [nb - 1,nb_know, nb_unknown - 1,bool_new];
        }

        
    }
    else {
        error.log('aucun ingrédient à supprimer');
        return 0;
    }
}

///////////////////////////////Fonction pour remplir le tableau d'ingrédient///////////////////////////////

function RecupIngredient(form, NbIngredient, bool_new) {
    let tab_glob = [];
    let tab_unknow = { names: [], images: [] }; // Initialisez name et image comme des tableaux vides
    for (var i = 0; i < NbIngredient; i++) {
        tab_glob.push(form.querySelector('#ingredient_' + i).value);

        if (bool_new[i] == 1) {
            // Si un nouvel ingrédient est créé, ajoutez son nom et son image à tab_unknow
            tab_unknow.names.push(form.querySelector('#ingredient_' + i).value);
            tab_unknow.images.push(form.querySelector('#ingredient_image_' + i).value);
        }
    }
    return [tab_glob, tab_unknow];
}
///////////////////////////////Fonction pour extraire le code du lien Youtube///////////////////////////////

function CodeVideo(url) {
    const params = new URLSearchParams(new URL(url).search);
    return params.get('v');
}

///////////////////////////////Fonction pour transmettre les données///////////////////////////////

function EnvoieDonnes(nom, image, video, liste_ingredients, liste_ingredients_crees) {
    var data_recette = {
        liste_ingredients: liste_ingredients,
        liste_ingredients_crees_nom: liste_ingredients_crees.names,
        liste_ingredients_crees_image: liste_ingredients_crees.images,
        nom: nom,
        video: video,
        image: image
    };

    console.log(liste_ingredients_crees.names);
    console.log(liste_ingredients_crees.images);

    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data_recette)
    };

    var url = 'http://localhost:3000/AjoutRecette';

    fetch(url, requestOptions)
        .then(response => response.text()) // Get the text response
        .then(text => {
            console.log('Réponse du serveur :', text);
            afficherMessage(text); // Handle the response based on the text returned
        })
        .catch(error => {
            console.error('Erreur :', error);
            afficherMessage('ERROR'); // Assume an error if the network request itself fails
        });
}

///////////////////////////////Fonction pour traduire le message renvoyé par la bdd///////////////////////////////

function afficherMessage(responseText) {
    const messageContainer = document.getElementById('messageContainer'); // Make sure this container exists in your HTML
    messageContainer.innerHTML = ''; // Clear previous messages

    let message = document.createElement('p');
    switch (responseText) {
        case 'OK':
            message.textContent = 'Recette bien ajoutée !';
            message.style.color = 'green';
            break;
        case 'NON':
            message.textContent = 'Recette déjà existante, essayez un autre nom ou contactez le support.';
            message.style.color = 'darkorange';
            break;
        case 'ERROR':
            message.textContent = 'Erreur dans l\'insertion de la recette. Contactez le support.';
            message.style.color = 'red';
            break;
        default:
            message.textContent = 'Réponse inattendue du serveur: ' + responseText;
            message.style.color = 'grey';
    }
    messageContainer.appendChild(message);
}



