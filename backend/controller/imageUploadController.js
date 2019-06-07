var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '../frontend/src/assets')
  },
  filename: function (req, file, callback) {
    //   callback(null, file.fieldname + '-' + Date.now() + "_" + file.originalname)
    callback(null, file.originalname)

  }
})
var upload = multer({ storage: storage }, { limits: { fieldNameSize: 10 } }).any();

router.post('/', function (req, res) {
  console.log(req.body)
  upload(req, res, function (err, data) {
    if (err) {
      console.log(err)
    } else {
      console.log(data, 'img')
      res.send('uploaded')
    }

  })
})
module.exports = router;