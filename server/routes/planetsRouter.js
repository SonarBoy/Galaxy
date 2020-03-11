let express = require('express');
let router = express.Router();

let planetController = require('../controllers/planetController');

router.get('/',planetController.getPlanetList);

//! This maybe an issue.
router.get('/add',planetController.addPlanetGet);
router.post('/add',planetController.addPlanetPost);


//! This maybe an issue
router.get('/edit/:id',planetController.editPlanetGet);
router.post('/edit/:id',planetController.editPlanetPost);

router.get('/delete/:id',planetController.deletePlanet);

module.exports = router;