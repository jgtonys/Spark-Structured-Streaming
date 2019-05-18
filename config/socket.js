const kafka = require('kafka-node');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('application socket initiated');
    socket.on('application', (options, input, basecwd) => {
      console.log(options);
      var cmd = options.baseMethod + " --class " + options.class + " " + options.targetJar + " emp1.csv";

      /*
      var cmd = options.baseMethod +
        //" --packages " + options.packages +
        //" --master spark://" + options.master +
        " --class " + options.class +
        " " + options.targetJar +
        //" " + options.host +
        //" " + options.port +
        //" " + options.windowTime +
        //" " + options.sliceTime;
      */

      console.log(cmd);

      const exec = require('child_process').exec;
      var bashscript = exec(cmd, {
        cwd: basecwd
      });

      bashscript.stdout.on('data', function(data) {
        io.emit('application', data);
      });

      bashscript.stderr.on('data', function(data) {
        io.emit('application', data);
      });
    });

    socket.on('result', (payload) => {
      console.log("Kafka Listen at topic : ",payload);
      var Consumer = kafka.Consumer;
      var client = new kafka.KafkaClient();
      var consumer = new Consumer(client, [{
        topic: payload,
        partition: 0
      }], {
        autoCommit: true
      });

      consumer.on('message', function(message) {
        io.emit('result', message);
      });

      consumer.on('error', function(err) {
        io.emit('result', err);
      })

      consumer.on('offsetOutOfRange', function(err) {
        io.emit('result', err);
      })
    });

    socket.on('failedResult', (payload) => {
      console.log("Kafka Listen at topic : ",payload);
      var Consumer = kafka.Consumer;
      var client = new kafka.KafkaClient();
      var consumer = new Consumer(client, [{
        topic: payload,
        partition: 0
      }], {
        autoCommit: true
      });

      consumer.on('message', function(message) {
        io.emit('failedResult', message);
      });

      consumer.on('error', function(err) {
        io.emit('failedResult', err);
      })

      consumer.on('offsetOutOfRange', function(err) {
        io.emit('failedResult', err);
      })
    });

    socket.on('delimiter', (payload) => {
      console.log("Kafka-result delimiter Listen at topic : ",payload);
      var Consumer = kafka.Consumer;
      var client = new kafka.KafkaClient();
      var consumer = new Consumer(client, [{
        topic: payload,
        partition: 0
      }], {
        autoCommit: true
      });

      consumer.on('message', function(message) {
        io.emit('delimiter', message);
      });

      consumer.on('error', function(err) {
        io.emit('delimiter', err);
      })

      consumer.on('offsetOutOfRange', function(err) {
        io.emit('delimiter', err);
      })
    });
  });
};
