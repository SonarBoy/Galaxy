let express = require('express');
let router = express.Router();
let celestialObjects = require('../controllers/celestialObjectsController');


router.get('/', celestialObjects.getCelestialObjectsList);

//! PLEASE FIX ALL METHOD NAMES AND GET THIS WORKING BY TOMMOROW


//! Issues
router.get('/add',celestialObjects.getCelestialObjectsAdd);
router.post('/add',celestialObjects.postCelestialObjectsAdd);

//! Issues 
router.get('/edit/:id',celestialObjects.getCelestialObjectsEdit);
router.post('/edit/:id',celestialObjects.postCelestialObjectsEdit);

router.get('/delete/:id',celestialObjects.getCelestialObjectsDelete);



module.exports = router;