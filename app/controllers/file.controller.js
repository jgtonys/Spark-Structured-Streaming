const multer = require('multer');
var fs = require('fs');
var moment = require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/files/')
  },
  filename: function (req, file, cb) {
    cb(null, moment().format('YYYY-MM-DD HH시mm분ss초') + '-' + file.originalname)
  }
})

module.exports.upload = multer({ storage: storage })

module.exports.showList = (req, res, next) => {
  fs.readdir('uploads/files/', function(err, items) {
    res.send(items);
  });
}


/*
module.exports.downloadPortfolio = (req, res, next) => {
  Filepath = "./uploads/portfolio/" + req.params.id;
  res.download(Filepath);
}

module.exports.downloadReport = (req, res, next) => {
  Filepath = "./uploads/report/" + req.params.id;
  res.download(Filepath);
}

module.exports.downloadSpec = (req, res, next) => {
  Filepath = "./uploads/teamspec/" + req.params.id;
  res.download(Filepath);
}
*/
