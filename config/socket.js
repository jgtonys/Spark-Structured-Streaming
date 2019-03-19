

module.exports = (io) => {
  io.on('connection', (socket) => { // 웹소켓 연결 시
    console.log('Socket initiated!');
    socket.on('test', (data) => {
      console.log('application submitted!');

      const exec = require('child_process').exec;
      var bashscript = exec("bin/spark-submit --master spark://jungyu:7077 --class testStructuredStreaming.JavaWordCount testcase/testStructuredStreaming-0.0.1.jar localhost 9999", {cwd: "/home/jungyu/spark-2.4.0-bin-hadoop2.7/"});

      ///home/jungyu/spark-2.4.0-bin-hadoop2.7/bin/spark-submit --master spark://jungyu:7077 --class testStructuredStreaming.JavaWordCount testcase/testStructuredStreaming-0.0.1.jar localhost 9999

      bashscript.stdout.on('data', function(data){
          io.emit('test',data);
      });

      bashscript.stderr.on('data', function(data){
          io.emit('test',data);
      });

      /*var spawn = require('child_process').spawn;
      var process = spawn('sh', [ '/home/jungyu/spark-2.4.0-bin-hadoop2.7/bin/spark-submit --master spark://jungyu:7077 --class testStructuredStreaming.JavaWordCount testcase/testStructuredStreaming-0.0.1.jar localhost 9999' ]);
      var donePercent = 0;
      process.stdout.setEncoding('utf-8');
      process.stdout.on('data', function (d) {
          io.emit('test', {donePercent: (donePercent = donePercent + 12), data: d});
      });
      process.stderr.setEncoding('utf-8');
      process.stderr.on('data', function (d) {
          io.emit('test', d);
      });*/
    });
  });
};
