const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'foodus'
});

connection.connect(err => {
  if (err) {
    console.error('Erreur de connexion: ' + err.stack);
    return;
  }
  console.log('Connecté avec l\'ID ' + connection.threadId);
});

module.exports = connection;
// connection.end();
