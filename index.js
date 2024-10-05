const express = require('express');
const app = express();
const PORT = 3000;

// Middleware pour lire les JSON
app.use(express.json());
app.use(express.static('public')); // Pour servir les fichiers statiques

// Route GET
app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');
});

// Route POST
app.post('/data', (req, res) => {
  const data = req.body;
  res.json({
    message: 'Données reçues avec succès',
    data: data
  });
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});


