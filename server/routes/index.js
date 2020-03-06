let express = require('express');
let router = express.Router();
let indexController = require('../controllers/indexController');


router.post('/login', indexController.processLoginPage);
router.post('/register',indexController.processRegisterPage);
router.get('/logout',indexController.performLogout);

module.exports = router;