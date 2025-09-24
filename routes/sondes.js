const router = express.Router();
const express = require("express");
const sondeController = require("../controllers/sondeController");

/**
 * @swagger
 * tags:
 *   name: Sondes
 *   description: Endpoints liés aux mesures des sondes
 */

//toutes les sondes
/**
 * @swagger
 * /sondes:
 *   get:
 *     summary: Récupère toutes les mesures
 *     responses:
 *       200:
 *         description: Liste de toutes les mesures
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/', sondeController.getAllSondes);

// tous les identifiants (device_id)
// toutes les mesures d'un bridge
// la dernière mesure d'un pont
// une mesure via son id
// supprime une mesure par son id

module.exports = router;