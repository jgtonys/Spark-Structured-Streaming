const kafka = require('kafka-node');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('application socket initiated');
    socket.on('application', (options, input, basecwd) => {
      console.log(options);
      //var cmd = options.baseMethod + " --class " + options.class + " " + options.targetJar + " emp1.csv";
      var cmd = "python input_new.py " + input + " 10 2000"

      console.log(cmd);

      const exec = require('child_process').exec;
      var bashscript = exec(cmd, {
        cwd: basecwd
      });

      bashscript.stdout.on('data', function(data) {
        io.emit('application', data);
      });

      bashscript.stdout.on('end', function(data) {
        console.log("Application ended.");
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

    socket.on('original', (payload) => {
      console.log("Kafka-origial Listen at topic : ",payload);
      var Consumer = kafka.Consumer;
      var client = new kafka.KafkaClient();
      var consumer = new Consumer(client, [{
        topic: payload,
        partition: 0
      }], {
        autoCommit: true
      });

      consumer.on('message', function(message) {
        io.emit('original', message);
      });

      consumer.on('error', function(err) {
        io.emit('original', err);
      })

      consumer.on('offsetOutOfRange', function(err) {
        io.emit('original', err);
      })
    });

    socket.on('tunning', (payload) => {
      console.log("Kafka-origial-tunning Listen at topic : ",payload);
      var Consumer = kafka.Consumer;
      var client = new kafka.KafkaClient();
      var consumer = new Consumer(client, [{
        topic: payload,
        partition: 0
      }], {
        autoCommit: true
      });

      consumer.on('message', function(message) {
        io.emit('tunning', message);
      });

      consumer.on('error', function(err) {
        io.emit('tunning', err);
      })

      consumer.on('offsetOutOfRange', function(err) {
        io.emit('tunning', err);
      })
    });
  });
};
