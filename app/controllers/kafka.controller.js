const async = require('async');
const _ = require('lodash');
const path = require('path');
const kafka = require('kafka-node');


var producer;

module.exports.producerOn = (req, res, next) => {
  console.log("Kafka-Producer Start!");
  var Producer = kafka.Producer;
  var client = new kafka.KafkaClient();
  producer = new Producer(client);
  producer.on('ready', function() {
    res.send("ready");
  });
};


module.exports.sendMsg = (req, res, next) => {
  console.log(req.body);
  let payloads = [{
    topic: req.body.topic,
    messages: req.body.messages,
    partition: 0
  }];
  producer.send(payloads, function(err, data) {
    res.json(data);
  });
};

module.exports.startBroker = (req, res, next) => {
  flag = false;
  const exec = require('child_process').exec;
  var checkscript = exec("netstat -ntlp | grep 9092", {
      cwd: "/home/jungyu/kafka/"
    },
    (error, stdout, stderr) => {
      if (error !== null) {
        console.log("Kafka-Broker Start!");
        var yourscript = exec("bin/kafka-server-start.sh config/server.properties", {
            cwd: "/home/jungyu/kafka/"
          });
      } else {
        if(stdout.indexOf("0.0.0.0:9092")>=0) flag = true;console.log("exist!");
      }
    });
  res.send("ready");
};

module.exports.stopBroker = (req, res, next) => {
  const exec = require('child_process').exec;

  var startscript = exec("bin/kafka-server-stop.sh", {
      cwd: "/home/jungyu/kafka/"
    },
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
  console.log("stop broker");
};

/*
const exec = require('child_process').exec;
var bashscript = exec("bin/spark-submit --master spark://jungyu:7077 --class testStructuredStreaming.JavaWordCount testcase/testStructuredStreaming-0.0.1.jar localhost 9999", {cwd: "/home/jungyu/spark-2.4.0-bin-hadoop2.7/"});
*/
