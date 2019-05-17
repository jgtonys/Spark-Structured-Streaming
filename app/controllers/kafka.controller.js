const async = require('async');
const _ = require('lodash');
const path = require('path');
const kafka = require('kafka-node');
let localData = require('../../config/localData');
let testJson = require('../../config/testJson');


var producer;
var client = new kafka.KafkaClient();


client.loadMetadataForTopics(["step2","step3","step4","step4_2"], (err, resp) => {
  console.log(JSON.stringify(resp))
});

module.exports.producerOn = (req, res, next) => {
  console.log("Kafka-Producer Start!");
  var Producer = kafka.Producer;
  producer = new Producer(client);
  producer.on('ready', function() {
    res.send("ready");
  });
};

// For Debuging json files

/*
var fs = require('fs');
var dir = 'jsons';
let json_array = [];
let json_tmp = '';

var files = fs.readdirSync(dir);
for (var i = 0; i < files.length; i++) {
  var file = files[i];
  var suffix = file.substr(file.length - 5, file.length);

  if (suffix === '.json') {
    fs.readFile(dir + '/' + file, function(err, buf) {
      json_tmp = buf.toString();
      json_array.push(json_tmp);
    });
  }
}

console.log(json_array.length);

*/

// for debugging end


module.exports.sendMsg = (req, res, next) => {
  let num = Math.floor(Math.random() * 40) // for test
  let payloads = [{
    topic: req.body.topic,
    messages: testJson.testdata[num], //req.body messages
    partition: 0
  }];

  producer.send(payloads, function(err, data) {
    res.json(data);
  });
};

module.exports.startBroker = (req, res, next) => {
  flag = false;
  console.log(localData.kafka.cwd);
  const exec = require('child_process').exec;
  var checkscript = exec("netstat -ntlp | grep 9092", {
      cwd: localData.kafka.cwd
    },
    (error, stdout, stderr) => {
      if (error !== null) {
        console.log("Kafka-Broker Start!");
        var yourscript = exec("bin/kafka-server-start.sh config/server.properties", {
          cwd: localData.kafka.cwd
        });
      } else {
        if (stdout.indexOf("0.0.0.0:9092") >= 0) flag = true;
        console.log("exist!");
      }
    });
  res.send("ready");
};

module.exports.stopBroker = (req, res, next) => {
  const exec = require('child_process').exec;

  var startscript = exec("bin/kafka-server-stop.sh", {
      cwd: localData.kafka.cwd
    },
    (error, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      if (error !== null) {
        res.send([0, `exec error: ${error} \n ${stderr}`]);
      } else {
        res.send([1, stdout]);
      }
    });
  console.log("stop broker");
};
