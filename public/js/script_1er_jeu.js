///////////////////////////////////////// Connexion BDD /////////////////////////////////////////

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',     
    password: 'password',  
    database: 'ma_base_de_donnees' 
});

connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});

///////////////////////////////////////// Requetes /////////////////////////////////////////

connection.query('SELECT COUNT(*) AS total_recettes FROM recettes', (err, rows) => {
    if (err) {
        console.error('Erreur lors de l\'exécution de la requête:', err);
        return;
    }

    const totalRecettes = rows[0].total_recettes;
    const idAleatoire = Math.floor(Math.random() * totalRecettes) + 1;

    connection.query('SELECT nom_recette FROM recettes WHERE id_recette = ?', [idAleatoire], (err, rows) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête:', err);
            return;
        }

        if (rows.length > 0) {
            const nomRecette = rows[0].nom_recette;
            document.getElementById('recette').innerText = nomRecette;
        } else {
            console.log('Aucune recette trouvée avec cet identifiant.');
        }
    });
});

//////////////////////////////////////Déconnexion BDD//////////////////////////////////////

process.on('SIGINT', () => {
    connection.end();
    console.log('Connexion à la base de données fermée');
});

module.exports = connection;

