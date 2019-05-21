let express = require('express');
let router = express.Router();
let userController = require('../controller/userController')

router.post('/createuser', userController.createUser);

module.exports = router;
