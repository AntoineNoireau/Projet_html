const express = require('express');
const app = express();
const path = require('path');

// Configurez Express pour servir les fichiers statiques du dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Démarrer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
