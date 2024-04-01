document.addEventListener('DOMContentLoaded', function () {
    var current_nb = 0;

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
    fetch("http://localhost:3000/consulter")
    .then(response => response.json())
    .then(data => {

        

    })
    .catch(error => console.error('Erreur', error));
}