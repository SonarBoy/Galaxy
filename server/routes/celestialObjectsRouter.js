let express = require('express');
let router = express.Router();
let celestialObjects = require('../controllers/celestialObjectsController');


router.get('/celestialObjects', celestialObjects.getCelestialObjectsList);

//! PLEASE FIX ALL METHOD NAMES AND GET THIS WORKING BY TOMMOROW

/*
//! Issues
router.get('/add',celestialObjects.getGalaxyAdd);
router.post('/add',celestialObjects.postGalaxyAdd);

//! Issues 
router.get('/edit/:id',celestialObjects.getGalaxyEdit);
router.post('/edit/:id',celestialObjects.postGalaxyEdit);

router.get('/delete/:id',celestialObjects.getGalaxyDelete);

*/

module.exports = router;