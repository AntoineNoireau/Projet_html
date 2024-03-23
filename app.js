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

app.post('/ajout_ingredient', (req, res) => {
  const id = req.body.id; // Récupérer l'ID depuis le corps de la requête POST
  const nom = req.body.nom; // Récupérer le nom depuis le corps de la requête POST
  const image = req.body.img; // Récupérer l'URL depuis le corps de la requête POST, et changer à 'img' si nécessaire
  console.log(id);
  console.log(nom);
  console.log(image);
  // Requête SQL d'insertion
  const sql = "INSERT INTO ingredients (id, nom, image) VALUES (?, ?, ?)";
  
  // Exécution de la requête avec les valeurs récupérées
  connection.query(sql, [id, nom, image], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion :", err);
      res.status(500).json({ error: "Erreur lors de l'insertion de l'ingrédient" });
    } else {
      console.log("Ingrédient inséré avec succès !");
      res.status(201).json({ message: "Ingrédient inséré avec succès !" });
    }    
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
