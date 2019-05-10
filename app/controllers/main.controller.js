const async = require('async');
const _ = require('lodash');
const path = require('path');
let localData = require('../../config/localData');

module.exports.mainpage = (req, res, next) => {
  res.render('index');
};

module.exports.startMaster = (req, res, next) => {
  const exec = require('child_process').exec;
  var yourscript = exec(localData.spark.start_master,
    (error, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      if (error !== null) {
        res.send([0,`exec error: ${error} \n ${stderr}`]);
      }
      else {
        res.send([1,stdout]);
      }
    });
};

module.exports.startSlave = (req, res, next) => {
  const exec = require('child_process').exec;
  var yourscript = exec(localData.spark.start_slave + ' ' + req.body.master,
    (error, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      if (error !== null) {
        res.send([0,`exec error: ${error} \n ${stderr}`]);
      }
      else {
        res.send([1,stdout]);
      }
    });
};

module.exports.stopMaster = (req, res, next) => {
  const exec = require('child_process').exec;
  var yourscript = exec(localData.spark.stop_master,
    (error, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      if (error !== null) {
        res.send([0,`exec error: ${error} \n ${stderr}`]);
      }
      else {
        res.send([1,stdout]);
      }
    });
};

module.exports.stopSlave = (req, res, next) => {
  const exec = require('child_process').exec;
  var yourscript = exec(localData.spark.stop_slave,
    (error, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      if (error !== null) {
        res.send([0,`exec error: ${error} \n ${stderr}`]);
      }
      else {
        res.send([1,stdout]);
      }
    });
};

module.exports.runPython = (req, res, next) => {
  const exec = require('child_process').exec;
  var yourscript = exec(localData.python.run_input,
    (error, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      if (error !== null) {
        res.send([0,`exec error: ${error} \n ${stderr}`]);
      }
      else {
        res.send([1,stdout]);
      }
    });
};

module.exports.uploadInput = (req, res, next) => {
  console.log(req.body);
  console.log(req.files);
  res.send("okay");
};
