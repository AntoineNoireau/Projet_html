let ingredientsEnregistres = [];

function enregistrerIngredients() {
    const nbIngredients = parseInt(document.getElementById('nb_ingredient').value);
    for (let i = 1; i <= nbIngredients; i++) {
        const nomIngredient = document.querySelector(`input[name="ingredient_${i}"]`).value;
        if (nomIngredient) { // Enregistre seulement si le champ n'est pas vide
            ingredientsEnregistres.push(nomIngredient);
        }
    }
    console.log(ingredientsEnregistres); // Affiche le tableau d'ingrédients pour vérifier
    // Appel de la fonction pour afficher les champs de recette
    afficherChampsRecette();
}

function afficherChampsRecette() {
    const ingredientsForm = document.getElementById('ingredientsForm');
    ingredientsForm.innerHTML = ''; // Effacer les champs d'ingrédients

    // Créer les nouveaux champs pour la recette
    ingredientsForm.appendChild(creerChampInput('ID Recette', 'idRecette', 'number'));
    ingredientsForm.appendChild(creerChampInput('Nom Recette', 'nomRecette', 'text'));
    ingredientsForm.appendChild(creerChampInput('Image Recette', 'imageRecette', 'text'));

    // Créer le bouton d'envoi de la recette
    var boutonEnvoyerRecette = document.createElement('button');
    boutonEnvoyerRecette.textContent = 'Envoyer Recette';
    boutonEnvoyerRecette.onclick = envoyerRecetteComplete;
    ingredientsForm.appendChild(boutonEnvoyerRecette);
}

function envoyerRecetteComplete() {
    const idRecette = document.getElementById('idRecette').value;
    const nomRecette = document.getElementById('nomRecette').value;
    const imageRecette = document.getElementById('imageRecette').value;

    // Construction de l'objet recette
    const recetteData = {
        id: idRecette,
        nom: nomRecette,
        img: imageRecette,
        ingredients: ingredientsEnregistres // Ajoute le tableau d'ingrédients enregistrés
    };

    // Envoyer les données de la recette à l'API
    fetch('URL_API_AJOUT_RECETTE', { // Remplacez par l'URL de votre API pour l'ajout de recette
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recetteData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Réponse réseau non ok.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Succès:', data);
        // Gérer le succès ici, par exemple, réinitialiser le formulaire ou afficher un message de succès
    })
    .catch((error) => {
        console.error('Erreur:', error);
        // Gérer l'erreur ici
    });
}

// Fonction pour charger les ingrédients depuis la base de données et les ajouter à la datalist
function chargerIngredients() {
    fetch('http://localhost:3000/ingredients')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const liste = document.getElementById('listeIngredients');
            liste.innerHTML = ''; // Nettoyer les options précédentes
            data.forEach(ingredient => {
                const option = document.createElement('option');
                option.value = ingredient.nom; // Adaptez 'nom' selon la structure de vos données
                liste.appendChild(option);
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des ingrédients:', error));
}

// Modifier la fonction ajouterChampsIngredients pour utiliser la datalist
function ajouterChampsIngredients(nbIngredients) {
    chargerIngredients();
    const ingredientsForm = document.getElementById('ingredientsForm');
    ingredientsForm.innerHTML = ''; // Nettoyer le contenu précédent

    for (let i = 1; i <= nbIngredients; i++) {
        const label = document.createElement('label');
        label.textContent = `Ingrédient ${i} :`;
        const input = document.createElement('input');
        input.type = 'text';
        input.name = `ingredient_${i}`;
        input.setAttribute('list', 'listeIngredients'); // Lier l'input à la datalist
        const lineBreak = document.createElement('br');

        ingredientsForm.appendChild(label);
        ingredientsForm.appendChild(input);
        ingredientsForm.appendChild(lineBreak);
    }
}

function creerBouton(nom, id) {
    var bouton = document.createElement('button');
    bouton.textContent = nom;
    bouton.id = id;
    bouton.onclick = function () {
        ajouterChamps(); // Fonction pour ajouter les champs lorsque ce bouton est cliqué
        chargerIngredients();
    };
    document.body.appendChild(bouton);
}

function ajouterChamps() {
    // Créer un formulaire pour contenir les champs et le bouton de validation
    var form = document.createElement('form');
    form.id = 'formulaireIngredient';

    // Créer les champs pour id, nom, et img
    var champId = creerChampInput('id', 'idIngredient', 'number');
    var champNom = creerChampInput('nom', 'nomIngredient', 'text');
    var champImg = creerChampInput('img', 'imgIngredient', 'text');

    // Créer le bouton de validation
    var boutonValider = document.createElement('button');
    boutonValider.textContent = 'Valider';
    boutonValider.type = 'submit';

    // Ajouter les champs et le bouton de validation au formulaire
    form.appendChild(champId);
    form.appendChild(champNom);
    form.appendChild(champImg);
    form.appendChild(boutonValider);

    // Ajouter le formulaire au corps de la page
    document.body.appendChild(form);

    // Gestionnaire d'événements pour le bouton de validation
    form.onsubmit = function (event) {
        event.preventDefault(); // Empêcher le formulaire de se soumettre de manière traditionnelle
        envoyerDonnees();
    };
}

function creerChampInput(labelText, inputId, inputType) {
    var div = document.createElement('div');

    var label = document.createElement('label');
    label.textContent = labelText;
    label.htmlFor = inputId;

    var input = document.createElement('input');
    input.type = inputType;
    input.id = inputId;
    input.name = inputId;
    input.required = true;

    div.appendChild(label);
    div.appendChild(input);

    return div;
}

function envoyerDonnees() {
    // Récupérer les valeurs des champs
    var id = document.getElementById('idIngredient').value;
    var nom = document.getElementById('nomIngredient').value;
    var img = document.getElementById('imgIngredient').value;

    // Construire l'objet à envoyer
    var ingredientData = {
        id: id,
        nom: nom,
        img: img
    };

    // Envoyer les données à l'API
    // Dans la fonction envoyerDonnees
    fetch('http://localhost:3000/ajout_ingredient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ingredientData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Réponse réseau non ok.');
            }
            return response.json(); // ici, assurez-vous que la réponse est bien du JSON
        })
        .then(data => {
            console.log('Succès:', data);
            // Gérer le succès de l'envoi, par exemple en affichant un message
        })
        .catch((error) => {
            console.error('Erreur:', error);
            // Gérer l'erreur éventuelle
        });

}



document.addEventListener('DOMContentLoaded', function () {

    // Ajouter un gestionnaire d'événements sur le bouton "Ajouter"
    document.getElementById('ajouter').addEventListener('click', function () {
        const nbIngredients = parseInt(document.getElementById('nb_ingredient').value);
        creerBouton('creer ingredient', 'CreerIngredient');
        // Appeler la fonction pour ajouter les champs d'ingrédients
        ajouterChampsIngredients(nbIngredients);
        document.getElementById('ajouter').addEventListener('click', function () {
            if (ingredientsEnregistres.length === 0) {
                // Première pression sur le bouton Valider
                enregistrerIngredients();
            } else {
                // Deuxième pression sur le bouton Valider
                envoyerRecetteComplete();
            }
        });
        
    });
});