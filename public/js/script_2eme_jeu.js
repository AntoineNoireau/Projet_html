let nombreColonnes;

var numRecette = "";
var nbTour = 1;


////////////////////affichage recette////////////////////////
fetch("http://localhost:3000/jeu_2")
    .then(response => response.json())
    .then(data => {

        numRecette = data.recette[0].id
        nombreColonnes = data.listerep.filter(item => item.id_recette === numRecette).length;

        const ingredientsIds = data.listerep
            .filter(item => item.id_recette === numRecette)
            .map(item => item.id_ingredient);

        var tableauHtml = '<table> <tr>';

        ingredientsIds.forEach(ingredientId => {
            const ingredient = data.ingredients.find(ingredient => ingredient.id === ingredientId);

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

        document.getElementById('tableContainer').innerHTML = tableauHtml;

        const jsonRecettes = data.recette;

        var nomRecette = data.recette.filter(item => item.id === numRecette)[0].nom;

        let recetteChar = nomRecette.split('');
        let recetteCharSize = recetteChar.length;
        var recetteTableauHtml = '<table><tr>';

        for (i = 0; i < recetteCharSize; i++) {
            recetteTableauHtml += '<td> <input type="text" id="' + (i + 1) + '" minlength="0" maxlength="1" size="1" /></td>';
        }
        recetteTableauHtml += '<td><button onclick="verifRecette(\'' + nomRecette + '\')">Valider</button></td>';
        recetteTableauHtml += '</tr>';

        recetteTableauHtml += '</table>';

        document.getElementById('tableJeu1').innerHTML = recetteTableauHtml;

        var lastRowInputs = document.querySelectorAll("#tableJeu1 input[type='text']");
        var lastRowFirstInput = lastRowInputs[lastRowInputs.length - recetteCharSize];
        lastRowFirstInput.focus();

        lastRowInputs.forEach(function (input, index) {
            input.addEventListener('input', function () {
                if (this.value.length === this.maxLength) {
                    if (index < lastRowInputs.length - 1) {
                        lastRowInputs[index + 1].focus();
                    }
                } else if (this.value.length > 0 && index < lastRowInputs.length - 1) {
                    lastRowInputs[index + 1].focus();
                }
            });

            input.addEventListener('keydown', function (event) {
                if (event.key === "Backspace" && this.value.length === 0 && index > 0) {
                    lastRowInputs[index - 1].focus();
                }
            });
        });

    })
    .catch(error => console.error('Erreur', error));

//////////////////////////Jeu///////////////////////////////////

// fetch("http://localhost:3000/recettes")
//     .then(response => response.json())
//     .then(data => {
//         const jsonRecettes = data;

//         var nomRecette = data.filter(item => item.id === numRecette)[0].nom;

//         let recetteChar = nomRecette.split('');
//         let recetteCharSize = recetteChar.length;
//         var recetteTableauHtml = '<table><tr>';

//         for (i = 0; i < recetteCharSize; i++) {
//             recetteTableauHtml += '<td> <input type="text" id="' + (i + 1) + '" minlength="0" maxlength="1" size="1" /></td>';
//         }
//         recetteTableauHtml += '<td><button onclick="verifRecette(\'' + nomRecette + '\')">Valider</button></td>';
//         recetteTableauHtml += '</tr>';

//         recetteTableauHtml += '</table>';

//         document.getElementById('tableJeu1').innerHTML = recetteTableauHtml;

//         var lastRowInputs = document.querySelectorAll("#tableJeu1 input[type='text']");
//         var lastRowFirstInput = lastRowInputs[lastRowInputs.length - recetteCharSize];
//         lastRowFirstInput.focus();

//         lastRowInputs.forEach(function (input, index) {
//             input.addEventListener('input', function () {
//                 if (this.value.length === this.maxLength) {
//                     if (index < lastRowInputs.length - 1) {
//                         lastRowInputs[index + 1].focus();
//                     }
//                 } else if (this.value.length > 0 && index < lastRowInputs.length - 1) {
//                     lastRowInputs[index + 1].focus();
//                 }
//             });

//             input.addEventListener('keydown', function (event) {
//                 if (event.key === "Backspace" && this.value.length === 0 && index > 0) {
//                     lastRowInputs[index - 1].focus();
//                 }
//             });
//         });
//     })
//     .catch(error => console.error('Erreur', error));

function verifRecette(nomRecette) {
    let recetteChar = nomRecette.split('');
    var count = 0;
    var lettresCorrectes = new Array(recetteChar.length).fill("");

    for (i = 0; i < recetteChar.length; i++) {
        var case1 = document.getElementById(i + 1 + (nbTour - 1) * recetteChar.length);

        if (case1.value.toLowerCase() === recetteChar[i]) {

            case1.readOnly = true;
            case1.style.backgroundColor = "green";
            lettresCorrectes[i] = recetteChar[i];
            count++;
        }
    }
    for (i = 0; i < recetteChar.length; i++) {

        var case1 = document.getElementById(i + 1 + (nbTour - 1) * recetteChar.length);
        if (case1.style.backgroundColor != "green") {
            for (j = 0; j < recetteChar.length; j++) {
                if (lettresCorrectes[j] === "") {
                    if (j !== i && case1.value.toLowerCase() === recetteChar[j]) {
                        case1.readOnly = true;
                        case1.style.backgroundColor = "orange";
                        lettresCorrectes[j] = recetteChar[i];
                        break;
                    }
                }
            }
        }
    }

    if (count == recetteChar.length) {
        victoire();
    } else {
        if (nbTour == 6) {
            perdu();
        } else {
            nbTour++;
            nouvelleLigne(nomRecette, nbTour);
        }
    }
}

function nouvelleLigne(nomRecette, nb) {
    let recetteChar = nomRecette.split('');
    let recetteCharSize = recetteChar.length;
    var recetteTableauHtml = '<table><tr>';
    for (i = 0; i < recetteCharSize; i++) {
        recetteTableauHtml += '<td> <input type="text" id="' + (i + 1 + (nb - 1) * recetteCharSize) + '" minlength="0" maxlength="1" size="1" /></td>';
    }
    recetteTableauHtml += '</tr>';

    recetteTableauHtml += '</table>';

    document.getElementById('tableJeu' + nb).innerHTML = recetteTableauHtml;

    var lastRowInputs = document.querySelectorAll("#tableJeu" + nb + " input[type='text']");
    var lastRowFirstInput = lastRowInputs[lastRowInputs.length - recetteCharSize];
    lastRowFirstInput.focus();

    var lastRowInputs = document.querySelectorAll("#tableJeu" + nb + " input[type='text']");
    var lastRowFirstInput = lastRowInputs[lastRowInputs.length - recetteCharSize];
    lastRowFirstInput.focus();

    lastRowInputs.forEach(function (input, index) {
        input.addEventListener('input', function () {
            if (this.value.length === this.maxLength) {
                if (index < lastRowInputs.length - 1) {
                    lastRowInputs[index + 1].focus();
                }
            } else if (this.value.length > 0 && index < lastRowInputs.length - 1) {
                lastRowInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', function (event) {
            if (event.key === "Backspace" && this.value.length === 0 && index > 0) {
                lastRowInputs[index - 1].focus();
            }
        });
    });
}
function victoire() {
    alert("Vous avez gagné");
}
function perdu() {
    alert("Vous avez perdu");

}


document.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        document.querySelector("#tableJeu1 button").click();
    }
});