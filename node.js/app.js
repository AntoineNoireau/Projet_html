const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root', 
  password : '', 
  database : 'foodus', 
  port: 3306
});

connection.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données: ' + err.stack);
    return;
  }
  console.log('Connecté à la base de données avec l\'ID ' + connection.threadId);
});

app.get('/recette/:id', (req, res) => {
    const id = req.params.id;
  
    connection.query('SELECT * FROM recettes WHERE id = ?', [id], (error, results, fields) => {
      if (error) {
        res.status(500).send('Erreur lors de la récupération des données');
        return;
      }

      if (results.length > 0) {
        res.json(results);
      } else {
        res.status(404).send('Recette non trouvée');
      }
    });
  });
  

const port = 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
