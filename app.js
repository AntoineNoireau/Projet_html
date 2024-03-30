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

app.post('/AjoutRecette', (req, res) => {
  
  const nom = req.body.nom;
  const image = req.body.image;

  // Requête SQL d'insertion des ingrédients
  const sqlInsertQuery = 'INSERT INTO recettes (nom,url) VALUES (?,?)';

  // Exécution de la requête d'insertion pour chaque ingrédient
  connection.query(sqlInsertQuery, [nom, image], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion de la recette', nom, ':', err); // Correction de la référence à ingredient
      return;
    }
    const id_recette = result.insertId;
    console.log('Recette', nom, 'insérée avec succès !');
  });

  const liste_ingredients = req.body.liste_ingredients;

  // Requête SQL pour récupérer les IDs des ingrédients
  const sqlSelectQuery = 'SELECT id FROM ingredients WHERE nom IN (?)';
  
  // Exécution de la requête SQL
  connection.query(sqlSelectQuery, [liste_ingredients], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des IDs des ingrédients :', err);
      return;
    }
  
    // Extraire les IDs des résultats de la requête
    const ids_ingrédients = results.map(result => result.id);
  
    // Utiliser les IDs des ingrédients, par exemple, les stocker dans une variable ou les renvoyer au client
    console.log('IDs des ingrédients :', ids_ingrédients);
  });  
  // Envoyer une réponse au client
  res.json({ message: 'Ingrédients insérés avec succès !' });
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
