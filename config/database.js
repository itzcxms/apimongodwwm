const mongoose = require('mongoose');

/* Création d'une classe de gestion de la DB mongo */

class Database {
    /**
     * Constructeur de la class DB
     * Initialise la propriété de connexion a nul
     *
     **/
    constructor() {
        this.connection = null; // La connexion Mongoose
    }
    /**
     * Permet d'établir la connexion a la DB
     *
     * configuration de la connexion
     * -
     * -
     *
     * @returns {Promise<Connection>} la connexion soit établie
     * @throws {Error} si échec de connexion
     **/
    async connect(){
        try {
            // Tentative de connexion
            this.connection = await mongoose.connect(process.env.MONGODB_URI, {
                dbName: process.env.DB_NAME
            })

            console.log('Connecté à MongoDB')
        }catch (error){
            console.error('Erreur de connexion', error.message);

            throw error;
        }
    }

    /**
     *
     * Récupére l'objet de connexion Mongoose
     *
     * @return {Connection} objet de connexion Mongoose
     */
    getConnection(){
        return mongoose.connection;
    }

    /**
     * Fermeture de la connexion à MongoDB
     *
     *
     * @returns {Promise<void>}
     */
    async close(){
        if (this.connection){
            await mongoose.connection.close();
            console.log('Fermeture de la connexion MongoDB');
            this.connection = null;
        }
    }
}

// Export d'une instance unique
module.exports = new Database();