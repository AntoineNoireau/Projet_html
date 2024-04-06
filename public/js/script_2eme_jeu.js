let nombreColonnes;

var numRecette = "";
var nbTour = 1;
var difficulte = 1;

window.onload = function() {
    const sliderValue = localStorage.getItem("sliderValue");
    if (sliderValue !== null) {
        difficulte = parseInt(sliderValue);
    }
  };

let ingredientsIds;
let ingredient;
let indexIngredientAAjoute = [];
let ingredientAAjoute = [];

////////////////////affichage recette////////////////////////
fetch("http://localhost:3000/jeu_2")
    .then(response => response.json())
    .then(data => {

        numRecette = data.recette[0].id
        nombreColonnes = data.listerep.filter(item => item.id_recette === numRecette).length;

        ingredientsIds = data.listerep
        .filter(item => item.id_recette === numRecette)
        .map(item => item.id_ingredient)
        .sort((a, b) => {
            const ordreA = data.listerep.find(e => e.id_ingredient === a && e.id_recette === numRecette)?.ordre;
            const ordreB = data.listerep.find(e => e.id_ingredient === b && e.id_recette === numRecette)?.ordre;
            
            return ordreA - ordreB;
        });


        var tableauHtml = '<table> <tr>';

        if(difficulte === 1)
        {
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
        }
        else if (difficulte === 2) {
        
            ingredientsIds.forEach((ingredientId, index) => {
                const ingredient = data.ingredients.find(ingredient => ingredient.id === ingredientId);
        
                if (ingredient) {
                    if (index  % 2 === 0 || indexIngredientAAjoute.lenght <=5) {
                        tableauHtml += '<td><img id="'+ (100+index+1) +'" src="' + ingredient.image + '"></td>';
                    } else {
                        tableauHtml += '<td><img id="'+ (100+index+1) +'" src="png/point_interrogation_image.png"></td>';
                    }
                }
            });
        
            tableauHtml += '</tr><tr>';
        
            ingredientsIds.forEach((ingredientId, index) => {
                const ingredient = data.ingredients.find(ingredient => ingredient.id === ingredientId);
        
                if (ingredient) {
                    if (index  % 2 === 0 || indexIngredientAAjoute.lenght <=5) {
                        tableauHtml += '<td id="'+ (100+index+1+ingredientsIds.length)+'">' + ingredient.nom + '</td>';
                    } else {
                        tableauHtml += '<td id="'+ (100+index+1+ingredientsIds.length)+'">???</td>';
                        indexIngredientAAjoute.push(index+1);
                        ingredientAAjoute.push(ingredient);
                    }
                }
            });
        } 
        else if (difficulte === 3) {
        
            ingredientsIds.forEach((ingredientId, index) => {
                const ingredient = data.ingredients.find(ingredient => ingredient.id === ingredientId);
        
                if (ingredient) {
                    if (index  % 2 === 0 || indexIngredientAAjoute.lenght <=5) {
                        tableauHtml += '<td><img id="'+ (100+index+1) +'" src="' + ingredient.image + '"></td>';
                    } else {
                        tableauHtml += '<td><img id="'+ (100+index+1) +'" src="png/point_interrogation_image.png"></td>';
                        console.log(ingredientAAjoute);
                    }
                }
            });
        
            tableauHtml += '</tr><tr>';
        
            ingredientsIds.forEach((ingredientId, index) => {
                const ingredient = data.ingredients.find(ingredient => ingredient.id === ingredientId);
        
                if (ingredient) {
                    if (index  % 2 === 0 || indexIngredientAAjoute.lenght <=5) {
                        tableauHtml += '<td id="'+ (100+index+1+ingredientsIds.length)+'">' + ingredient.nom + '</td>';
                    } else {
                        tableauHtml += '<td id="'+ (100+index+1+ingredientsIds.length)+'">???</td>';
                        indexIngredientAAjoute.push(index+1);
                        ingredientAAjoute.push(ingredient);
                    }
                }
            });
        }      

        tableauHtml += '</tr>';
        tableauHtml += '</table>';

        document.getElementById('tableContainer').innerHTML = tableauHtml;

        ////////////////////première ligne jeu/////////////////////

        const jsonRecettes = data.recette;

        var nomRecette = data.recette.filter(item => item.id === numRecette)[0].nom;

        let recetteChar = nomRecette.split('');
        let recetteCharSize = recetteChar.length;
        var recetteTableauHtml = '<table><tr>';

        for (i = 0; i < recetteCharSize; i++) {
            recetteTableauHtml += '<td> <input type="text" id="' + (i + 1) + '" minlength="0" maxlength="1" size="1" /></td>';
        }
        recetteTableauHtml += '<td><button class="custom-btn btn-7 smaller" onclick="verifRecette(\'' + nomRecette + '\')">Valider</button></td>';
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
                    else{
                        case1.readOnly = true;
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
    updateImage();
}

function updateImage()
{
    var id = indexIngredientAAjoute[0];
    if(indexIngredientAAjoute.length != 0)
    {
        let image = document.querySelector("#tableContainer img[id='"+(100+id)+"']");
        let nom = document.querySelector("#tableContainer td[id='"+(100+id+ingredientsIds.length)+"']");
        if (image) {
            image.src = ingredientAAjoute[0].image;
            nom.textContent = ingredientAAjoute[0].nom;
        }    
        indexIngredientAAjoute.shift();    
        ingredientAAjoute.shift(); 
    }
    if(difficulte ===3)
    {
        var ID;
        if((100+id+1) <= (100+ingredientsIds.length))
        {
            ID = 100+id+1;
        } 
        else{ID = 101}
        let image = document.querySelector("#tableContainer img[id='"+(ID)+"']");
        let nom = document.querySelector("#tableContainer td[id='"+(ID+ingredientsIds.length)+"']");
        if (image) {
            
            var ingre = {nom: nom.textContent, image: image.src }
            ingredientAAjoute.push(ingre)
            image.src = '/png/point_interrogation_image.png';
            nom.textContent = '???';
        } 
        indexIngredientAAjoute.push(ID-100);
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
    explodeConfetti();
}

function perdu() {
    generateEmojiExplosion();
}

document.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        document.querySelector("#tableJeu1 button").click();
    }
});

