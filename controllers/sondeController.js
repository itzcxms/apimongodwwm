const Sonde = require("../models/Sonde");
const mongoose = require("mongoose");

class SondeController {
    // toutes les sondes
    // GET /sondes
    async getAllSondes(req, res) {
        try {
            const sondes = await Sonde.find();
            res.send(sondes);
        } catch (error) {
            res.status(500).json({message: "Erreur"});
        }
    }
}

    // tous les identifiants (device_id)


    // toutes les mesures d'un bridge


    // la dernière mesure d'un pont


    // une mesure via son id


    // supprime une mesure par son id



module.exports = new SondeController();