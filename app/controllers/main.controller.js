const async = require('async');
const _ = require('lodash');
const path = require('path');



module.exports.mainpage = (req, res, next) => {
  res.render('index');
};


module.exports.startMaster = (req, res, next) => {
  const exec = require('child_process').exec;
  var yourscript = exec('/home/jungyu/spark-2.4.0-bin-hadoop2.7/sbin/start-master.sh',
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
  var yourscript = exec('/home/jungyu/spark-2.4.0-bin-hadoop2.7/sbin/start-slave.sh ' + req.body.master,
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
  var yourscript = exec('/home/jungyu/spark-2.4.0-bin-hadoop2.7/sbin/stop-master.sh',
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
  var yourscript = exec('/home/jungyu/spark-2.4.0-bin-hadoop2.7/sbin/stop-slave.sh',
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


/*var executeScript = function (socket) {
    var spawn = require('child_process').spawn;
    var process = spawn('sh', [ '/home/jungyu/spark-2.4.0-bin-hadoop2.7/bin/spark-submit --class testStructuredStreaming.JavaWordCount testcase/testStructuredStreaming-0.0.1.jar localhost 9999' ]);
    var donePercent = 0;
    process.stdout.setEncoding('utf-8');
    process.stdout.on('data', function (data) {
        socket.emit('logs', {donePercent: (donePercent = donePercent + 12), data: data});
    });
    process.stderr.setEncoding('utf-8');
    process.stderr.on('data', function (data) {
        socket.emit('err-logs', data);
    });
};*/

module.exports.startApp = (req, res, next) => {

  /*const exec = require('child_process').exec;
  var yourscript = exec('/home/jungyu/spark-2.4.0-bin-hadoop2.7/bin/spark-submit --class testStructuredStreaming.JavaWordCount testcase/testStructuredStreaming-0.0.1.jar localhost 9999',
    (error, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      if (error !== null) {
        res.send([0,`exec error: ${error} \n ${stderr}`]);
      }
      else {
        res.send([1,stdout]);
      }
    });*/
};
