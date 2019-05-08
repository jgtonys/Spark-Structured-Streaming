const kafka = require('kafka-node');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Socket initiated!');
    socket.on('test', (options, basecwd) => {
      var cmd = options.baseMethod +
        " --packages " + options.packages +
        " --master spark://" + options.master +
        " --class " + options.class +
        " " + options.targetJar +
        " " + options.host +
        " " + options.port +
        " " + options.windowTime +
        " " + options.sliceTime;

      const exec = require('child_process').exec;
      var bashscript = exec(cmd, {
        cwd: basecwd
      });

      bashscript.stdout.on('data', function(data) {
        io.emit('test', data);
      });

      bashscript.stderr.on('data', function(data) {
        io.emit('test', data);
      });
    });

    socket.on('consumer', (payload) => {
      console.log("Kafka-Consumer Listen at topic : ",payload);
      var Consumer = kafka.Consumer;
      var client = new kafka.KafkaClient();
      var consumer = new Consumer(client, [{
        topic: payload,
        partition: 0
      }], {
        autoCommit: false
      });

      consumer.on('message', function(message) {
        io.emit('consumer', message);
      });

      consumer.on('error', function(err) {
        io.emit('consumer', err);
      })

      consumer.on('offsetOutOfRange', function(err) {
        io.emit('consumer', err);
      })
    });
  });
};
