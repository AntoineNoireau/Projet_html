const express = require('express');
const app = express();
const path = require('path');
const connection = require('./connection');

// Configurez Express pour servir les fichiers statiques du dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/ingredients', (req, res) => {
  const sqlQuery = 'SELECT * FROM ingredients'; // Adaptez cette ligne à votre requête SQL

  connection.query(sqlQuery, (error, results) => {
    if (error) {
      console.error('Erreur lors de la requête :', error);
      res.status(500).send('Erreur interne du serveur');
      return;
    }

    // Supposons que vos résultats sont directement dans le format désiré
    res.json(results);
  });
});

// app.post('/AjoutRecette', (req, res) => {
  
//   const nom = req.body.nom;
//   const image = req.body.image;
//   const video = req.body.video;
//   const ingredients = req.body.liste_ingredients;
//   const liste_ingredients_crees_nom = req.body.liste_ingredients_crees_nom;
//   const liste_ingredients_crees_image = req.body.liste_ingredients_crees_image;
//   let id_ingredient = [];
//   let id_recette = null;



//   console.log(nom);
//   console.log(image);
//   console.log(ingredients);
//   console.log(liste_ingredients_crees_nom);
//   console.log(liste_ingredients_crees_image);

//   for (let i = 0; i < liste_ingredients_crees_nom.length; i++) {
//     const nom = liste_ingredients_crees_nom[i];
//     const image = liste_ingredients_crees_image[i];

//     const sql = 'INSERT INTO ingredients (nom, image) VALUES (?, ?)';
//     connection.query(sql, [nom, image], (err, result) => {
//       if (err) {
//         console.error('Erreur lors de l\'insertion de l\'ingrédient :', err);
//         return;
//       }
//       console.log('Ingrédient inséré avec succès');
//     });
//   }

//   for(let i = 0; i<ingredients.length;i++){
//     const sql_1 = 'SELECT id FROM ingredients WHERE nom = ?';

//     connection.query(sql_1,ingredients[i], (err, result_id) => {
//       if (err) {
//         console.error('Erreur lors de l\'insertion de l\'ingrédient :', err);
//         return;
//       }
//       id_ingredient.push(result_id);
//       console.log('IDs des ingrédients récupérés avec succès :', id_ingredient[i]);
//     });
//   }

//   const sql_2 = 'INSERT INTO recettes (nom, image, url) VALUES (?, ?, ?)';

//   connection.query(sql_2,[nom,image,video],(err, result_recette) =>{
//     if (err) {
//       console.error('Erreur lors de l\'insertion de la recette :', err);
//       return;
//     }
//     id_recette = result_recette;
//     console.log('Recette inséré avec succés !');
//   });

//   for(let i = 0; i<ingredients.length;i++){
//     const sql_3 = 'INSERT INTO recettesingredients (id_recette, id_ingredient, ordre) VALUES (?, ?, ?)';

//     connection.query(sql_3,[id_recette,id_ingredient[i],i+1], (err, result_id) => {
//       if (err) {
//         console.error('Erreur lors de l\'insertion de l\'ordre:', err);
//         return;
//       }
//       console.log('ligne inséré avec succés :', id_ingredient[i]);
//     });
//   }


// });

app.post('/AjoutRecette', (req, res) => {
  const nom = req.body.nom;
  const image = req.body.image;
  const video = req.body.video;
  const ingredients = req.body.liste_ingredients;
  const liste_ingredients_crees_nom = req.body.liste_ingredients_crees_nom;
  const liste_ingredients_crees_image = req.body.liste_ingredients_crees_image;

  console.log(nom);
  console.log(image);
  console.log(ingredients);
  console.log(liste_ingredients_crees_nom);
  console.log(liste_ingredients_crees_image);

  // Vérifier si la recette existe déjà
  connection.query('SELECT * FROM recettes WHERE nom = ?', [nom], (err, results) => {
    if (err) {
      console.error('Erreur lors de la vérification de l\'existence de la recette :', err);
      return res.send('ERROR');
    }
    if (results.length > 0) {
      return res.send('NON'); // La recette existe déjà
    }

    // Insérer les nouveaux ingrédients
    for (let i = 0; i < liste_ingredients_crees_nom.length; i++) {
      const nomIngredient = liste_ingredients_crees_nom[i];
      const imageIngredient = liste_ingredients_crees_image[i];
      const sql = 'INSERT INTO ingredients (nom, image) VALUES (?, ?)';
      connection.query(sql, [nomIngredient, imageIngredient], (err, result) => {
        if (err) {
          console.error('Erreur lors de l\'insertion de l\'ingrédient :', err);
          return res.send('ERROR');
        }
        console.log('Ingrédient inséré avec succès');
      });
    }

    // Insérer la recette
    connection.query('INSERT INTO recettes (nom, image, url) VALUES (?, ?, ?)', [nom, image, video], (err, resultRecette) => {
      if (err) {
        console.error('Erreur lors de l\'insertion de la recette :', err);
        return res.send('ERROR');
      }
      const idRecette = resultRecette.insertId;
      console.log('Recette insérée avec succès ! ID:', idRecette);

      // Une fois la recette insérée, récupérer les IDs des ingrédients et créer les liens
      let completedQueries = 0;
      ingredients.forEach((ingredient, index) => {
        connection.query('SELECT id FROM ingredients WHERE nom = ?', [ingredient], (err, results) => {
          if (err || results.length === 0) {
            console.error('Erreur lors de la récupération de l\'ID de l\'ingrédient :', err);
            return res.send('ERROR');
          }
          const idIngredient = results[0].id;

          connection.query('INSERT INTO recettesingredients (id_recette, id_ingredient, ordre) VALUES (?, ?, ?)', [idRecette, idIngredient, index + 1], (err, resultRelation) => {
            if (err) {
              console.error('Erreur lors de l\'insertion de la relation recette-ingrédient:', err);
              return res.send('ERROR');
            }
            console.log('Relation recette-ingrédient insérée avec succès pour l\'ingrédient ID:', idIngredient);
            completedQueries++;
            if (completedQueries === ingredients.length) {
              return res.send('OK');
            }
          });
        });
      });
    });
  });
});



app.get('/recettes-ingredients', (req, res) => {
  const sqlQuery = 'SELECT * FROM recettesingredients'; // Adaptez cette ligne à votre requête SQL

  connection.query(sqlQuery, (error, results) => {
    if (error) {
      console.error('Erreur lors de la requête :', error);
      res.status(500).send('Erreur interne du serveur');
      return;
    }

    // Supposons que vos résultats sont directement dans le format désiré
    res.json(results);
  });
});

app.post('/id-recette-ingredient', (req, res) => {

  const liste_ingredients = req.body.ingredients;

  const sqlQuery = "SELECT id_recette FROM (SELECT id_recette, COUNT(*) AS count_ingredients FROM recettesingredients WHERE id_ingredient IN (SELECT id FROM ingredients WHERE nom IN (?)) GROUP BY id_recette) AS counts WHERE count_ingredients = (SELECT COUNT(*) FROM recettesingredients WHERE id_recette = counts.id_recette)";

  connection.query(sqlQuery, [liste_ingredients], (error, results) => {
    if (error) {
      console.error('Erreur lors de la requête :', error);
      res.status(500).send('Erreur interne du serveur');
      return;
    }

    // Supposons que vos résultats sont directement dans le format désiré
    res.json(results);
  });
});

app.post('/id-recette-ingredient-suite', (req, res) => {

    // ID de recette 
    var RecetteId = []
    for(i = 0 ; i < req.body.id.length ; i++)
    {
      RecetteId[i] = req.body.id[i].id_recette;
    }
    // Obtenir les informations de la recette aléatoire
    connection.query(`SELECT * FROM recettes WHERE id IN (${RecetteId.join(',')})`, (error, Recettes) => {
      if (error) {
        console.error('Erreur lors de la requête des recettes :', error);
        res.status(500).send('Erreur interne du serveur');
        return;
      }
    
      // Obtenir les ingrédients de chaque recette
      connection.query(`SELECT * FROM recettesingredients WHERE id_recette IN (${RecetteId.join(',')})`, (error, ListesRep) => {
        if (error) {
          console.error('Erreur lors de la requête des ingrédients de la recette :', error);
          res.status(500).send('Erreur interne du serveur');
          return;
        }
    
        // Obtenir tous les ingrédients des recettes
        connection.query(`SELECT * FROM ingredients WHERE id IN (SELECT id_ingredient FROM recettesingredients WHERE id_recette IN (${RecetteId.join(',')}))`, (error, Ingredients) => {
          if (error) {
            console.error('Erreur lors de la requête des ingrédients :', error);
            res.status(500).send('Erreur interne du serveur');
            return;
          }
    
          // Envoyer les données des recettes et des ingrédients
          res.json({
            recette: Recettes,
            listerep: ListesRep,
            ingredients: Ingredients
          });
        });
      });
    });
});

app.get('/recettes', (req, res) => {
  const sqlQuery = 'SELECT * FROM recettes'; // Adaptez cette ligne à votre requête SQL

  connection.query(sqlQuery, (error, results) => {
    if (error) {
      console.error('Erreur lors de la requête :', error);
      res.status(500).send('Erreur interne du serveur');
      return;
    }

    // Supposons que vos résultats sont directement dans le format désiré
    res.json(results);
  });
});

app.get('/jeu_1', (req, res) => {
  // Obtenir tous les ID de recette
  connection.query('SELECT id FROM recettes', (error, recettes) => {
    if (error) {
      console.error('Erreur lors de la requête des recettes :', error);
      res.status(500).send('Erreur interne du serveur');
      return;
    }

    // Choisir un ID de recette aléatoire
    const randomRecetteId = recettes[Math.floor(Math.random() * recettes.length)].id;

    // Obtenir les informations de la recette aléatoire
    connection.query(`SELECT * FROM recettes WHERE id = ${randomRecetteId}`, (error, randomRecette) => {
      if (error) {
        console.error('Erreur lors de la requête de la recette aléatoire :', error);
        res.status(500).send('Erreur interne du serveur');
        return;
      }

      // Obtenir les réponses de la recette aléatoire
      connection.query(`SELECT * FROM recettesingredients WHERE id_recette = ${randomRecetteId}`, (error, ListRep) => {
        if (error) {
          console.error('Erreur lors de la requête des ingrédients de la recette :', error);
          res.status(500).send('Erreur interne du serveur');
          return;
        }



        // Ajouter 5 ingrédients aléatoires qui ne sont pas dans la recette
        connection.query('SELECT * FROM ingredients WHERE id IN (SELECT id_ingredient FROM recettesingredients WHERE id_recette = ?)', [randomRecetteId], (error, ingredients) => {
          if (error) {
            console.error('Erreur lors de la requête des ingrédients :', error);
            res.status(500).send('Erreur interne du serveur');
            return;
          }
          connection.query('SELECT * FROM ingredients WHERE id NOT IN (SELECT id_ingredient FROM recettesingredients WHERE id_recette = ?) ORDER BY RAND() LIMIT 5', [randomRecetteId], (error, randomIngredients) => {
            if (error) {
              console.error('Erreur lors de la requête des ingrédients aléatoires :', error);
              res.status(500).send('Erreur interne du serveur');
              return;
            }

            // Envoyer la recette aléatoire et les ingrédients (y compris les aléatoires)
            res.json({
              recette: randomRecette,
              listerep: ListRep,
              ingredients: ingredients.concat(randomIngredients)
            });
          });
        });
      });
    });
  });
});

app.get('/jeu_2', (req, res) => {
  // Obtenir tous les ID de recette
  connection.query('SELECT id FROM recettes', (error, recettes) => {
    if (error) {
      console.error('Erreur lors de la requête des recettes :', error);
      res.status(500).send('Erreur interne du serveur');
      return;
    }

    // Choisir un ID de recette aléatoire
    const randomRecetteId = recettes[Math.floor(Math.random() * recettes.length)].id;

    // Obtenir les informations de la recette aléatoire
    connection.query(`SELECT * FROM recettes WHERE id = ${randomRecetteId}`, (error, randomRecette) => {
      if (error) {
        console.error('Erreur lors de la requête de la recette aléatoire :', error);
        res.status(500).send('Erreur interne du serveur');
        return;
      }

      // Obtenir les réponses de la recette aléatoire
      connection.query(`SELECT * FROM recettesingredients WHERE id_recette = ${randomRecetteId}`, (error, ListRep) => {
        if (error) {
          console.error('Erreur lors de la requête des ingrédients de la recette :', error);
          res.status(500).send('Erreur interne du serveur');
          return;
        }



        // Ajouter 5 ingrédients aléatoires qui ne sont pas dans la recette
        connection.query('SELECT * FROM ingredients WHERE id IN (SELECT id_ingredient FROM recettesingredients WHERE id_recette = ?)', [randomRecetteId], (error, ingredients) => {
          if (error) {
            console.error('Erreur lors de la requête des ingrédients :', error);
            res.status(500).send('Erreur interne du serveur');
            return;
          }

          // Envoyer la recette aléatoire et les ingrédients (y compris les aléatoires)
          res.json({
            recette: randomRecette,
            listerep: ListRep,
            ingredients: ingredients
          });
        });
      });
    });
  });
});

app.get('/ingredients', (req, res) => {
  const sqlQuery = 'SELECT * FROM ingredients'; // Adaptez cette ligne à votre requête SQL

  connection.query(sqlQuery, (error, results) => {
    if (error) {
      console.error('Erreur lors de la requête :', error);
      res.status(500).send('Erreur interne du serveur');
      return;
    }

    // Supposons que vos résultats sont directement dans le format désiré
    res.json(results);
  });
});

app.get('/recettes-ingredients', (req, res) => {
  const sqlQuery = 'SELECT * FROM recettesingredients'; // Adaptez cette ligne à votre requête SQL

  connection.query(sqlQuery, (error, results) => {
    if (error) {
      console.error('Erreur lors de la requête :', error);
      res.status(500).send('Erreur interne du serveur');
      return;
    }

    // Supposons que vos résultats sont directement dans le format désiré
    res.json(results);
  });
});

app.get('/recettes', (req, res) => {
  const sqlQuery = 'SELECT * FROM recettes'; // Adaptez cette ligne à votre requête SQL

  connection.query(sqlQuery, (error, results) => {
    if (error) {
      console.error('Erreur lors de la requête :', error);
      res.status(500).send('Erreur interne du serveur');
      return;
    }

    // Supposons que vos résultats sont directement dans le format désiré
    res.json(results);
  });
});

app.get('/jeu_1', (req, res) => {
  // Obtenir tous les ID de recette
  connection.query('SELECT id FROM recettes', (error, recettes) => {
    if (error) {
      console.error('Erreur lors de la requête des recettes :', error);
      res.status(500).send('Erreur interne du serveur');
      return;
    }

    // Choisir un ID de recette aléatoire
    const randomRecetteId = recettes[Math.floor(Math.random() * recettes.length)].id;

    // Obtenir les informations de la recette aléatoire
    connection.query(`SELECT * FROM recettes WHERE id = ${randomRecetteId}`, (error, randomRecette) => {
      if (error) {
        console.error('Erreur lors de la requête de la recette aléatoire :', error);
        res.status(500).send('Erreur interne du serveur');
        return;
      }

      // Obtenir les réponses de la recette aléatoire
      connection.query(`SELECT * FROM recettesingredients WHERE id_recette = ${randomRecetteId}`, (error, ListRep) => {
        if (error) {
          console.error('Erreur lors de la requête des ingrédients de la recette :', error);
          res.status(500).send('Erreur interne du serveur');
          return;
        }



        // Ajouter 5 ingrédients aléatoires qui ne sont pas dans la recette
        connection.query('SELECT * FROM ingredients WHERE id IN (SELECT id_ingredient FROM recettesingredients WHERE id_recette = ?)', [randomRecetteId], (error, ingredients) => {
          if (error) {
            console.error('Erreur lors de la requête des ingrédients :', error);
            res.status(500).send('Erreur interne du serveur');
            return;
          }
          connection.query('SELECT * FROM ingredients WHERE id NOT IN (SELECT id_ingredient FROM recettesingredients WHERE id_recette = ?) ORDER BY RAND() LIMIT 5', [randomRecetteId], (error, randomIngredients) => {
            if (error) {
              console.error('Erreur lors de la requête des ingrédients aléatoires :', error);
              res.status(500).send('Erreur interne du serveur');
              return;
            }

            // Envoyer la recette aléatoire et les ingrédients (y compris les aléatoires)
            res.json({
              recette: randomRecette,
              listerep: ListRep,
              ingredients: ingredients.concat(randomIngredients)
            });
          });
        });
      });
    });
  });
});

app.get('/jeu_2', (req, res) => {
  // Obtenir tous les ID de recette
  connection.query('SELECT id FROM recettes', (error, recettes) => {
    if (error) {
      console.error('Erreur lors de la requête des recettes :', error);
      res.status(500).send('Erreur interne du serveur');
      return;
    }

    // Choisir un ID de recette aléatoire
    const randomRecetteId = recettes[Math.floor(Math.random() * recettes.length)].id;

    // Obtenir les informations de la recette aléatoire
    connection.query(`SELECT * FROM recettes WHERE id = ${randomRecetteId}`, (error, randomRecette) => {
      if (error) {
        console.error('Erreur lors de la requête de la recette aléatoire :', error);
        res.status(500).send('Erreur interne du serveur');
        return;
      }

      // Obtenir les réponses de la recette aléatoire
      connection.query(`SELECT * FROM recettesingredients WHERE id_recette = ${randomRecetteId}`, (error, ListRep) => {
        if (error) {
          console.error('Erreur lors de la requête des ingrédients de la recette :', error);
          res.status(500).send('Erreur interne du serveur');
          return;
        }



        // Ajouter 5 ingrédients aléatoires qui ne sont pas dans la recette
        connection.query('SELECT * FROM ingredients WHERE id IN (SELECT id_ingredient FROM recettesingredients WHERE id_recette = ?)', [randomRecetteId], (error, ingredients) => {
          if (error) {
            console.error('Erreur lors de la requête des ingrédients :', error);
            res.status(500).send('Erreur interne du serveur');
            return;
          }

          // Envoyer la recette aléatoire et les ingrédients (y compris les aléatoires)
          res.json({
            recette: randomRecette,
            listerep: ListRep,
            ingredients: ingredients
          });
        });
      });
    });
  });
});




// Démarrer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
