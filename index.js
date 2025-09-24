// Import des dépendances
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swagger_config = require('./config/swagger_config');
require('dotenv').config();

// Import des modules
const database = require('./config/database')
const sondesRoutes = require('./routes/sondes');

// Initialisation de l'api express
const app = express();
const port = process.env.PORT || 3000;

// Config global
app.use(cors({
    origin: '*',
    methods:['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// parsing du body des requêtes
app.use(express.json({limit : '10mb'}));
app.use(express.urlencoded({extended : true}));

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const startServer = async () => {
    try {
        await database.connect();
        console.log('Base de données connectée')

        app.listen(port, () => {
            console.log(`L'api est lancée sur http://localhost:${port}`);
        })

    }catch(error){
        console.log('Erreur de connexion', error);
    }
}

startServer();

// route accueil
app.get('/', (req, res) => {
    res.json({message: "Bienvenue"});
})

// sondes
app.use('/sondes', sondesRoutes);