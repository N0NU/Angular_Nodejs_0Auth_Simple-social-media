let express = require('express');
let router = express.Router();
let userController = require('../controller/userController')

router.post('/createuser', userController.createUser);
router.get('/currentuser/:id', userController.getUser)

module.exports = router;
