const express = require('express');
const app = express();
const PORT = 3000;

// Middleware pour lire les JSON
app.use(express.json());

// Route GET
app.get('/', (req, res) => {
  res.send('Bienvenue dans mon API Node.js');
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

