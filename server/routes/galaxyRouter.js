let express = require('express');
let router = express.Router();
let galaxyController = require('../controllers/galaxyController');


router.get('/', galaxyController.getGalaxyList);

//! Issues
router.get('/add',galaxyController.getGalaxyAdd);
router.post('/add',galaxyController.postGalaxyAdd);

//! Issues 
router.get('/edit/:id',galaxyController.getGalaxyEdit);
router.post('/edit/:id',galaxyController.postGalaxyEdit);

router.get('/delete/:id',galaxyController.getGalaxyDelete);

module.exports = router;