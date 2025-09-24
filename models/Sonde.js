const mongoose = require('mongoose');

const sondeSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },

    // Propriétaire de la sonde
        owner: {
            type: String,
            required: true,
            default: 'sonde'
        },

    // id du capteur physique
        device_id: {
            type: String,
            required: true
        },

    // Hauteur mesurée en mètre
        haut: {
            type: String,
            required: true
        },

    // Type de mesure effectuée
        type: {
            type: String,
            required: true,
            default: 'distance'
        },

    // Tension de la batterie de la sonde
        volt: {
            type: String,
            required: true
        },

    // Date et heure de réception de la mesure
        received_at: {
            type: String,
            required: true
        },

    // Date et heure de l'insertion dans la bdd
        inserted_at: {
            type: Date,
            required: true
        }

}, {
    collection: 'sondes',
    versionKey: false
    }

);

// Index pour optimiser les requêtes
// On filtre d'abord par bridge
sondeSchema.index({device_id: 1, received_at: -1});

// Index temporel global
sondeSchema.index({received_at: -1});

// index d'insertion (si on le souhaite)
sondeSchema.index({inserted_at: -1});

// Méthodes d'instance
// hauteur en float
sondeSchema.methods.getNumericHeight = function () {
    return parseFloat(this.haut);
}
//volts en float
sondeSchema.methods.getNumericHeight = function () {
    return parseFloat(this.volt.replace(' V', '').trim());
}

// Méthode statique de classe
/**
 * Récupère toutes les mesures d'un appareil, triée par date décroissante
 * @param {string} deviceId ID de l'appareil à chercher
 * @returns {Query} query mongoose pour les mesures de l'appareil
 */

sondeSchema.statics.findByDevice = function(deviceId) {
    return this.find({device_id: deviceId}).sort({received_at: -1});
};

// export
module.exports = mongoose.model('Sonde', sondeSchema)