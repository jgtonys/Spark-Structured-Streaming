let maincontroller = require('../controllers/main.controller.js');
let kafkacontroller = require('../controllers/kafka.controller.js');
let filecontroller = require('../controllers/file.controller.js');

module.exports = (app) => {
    app.route('/')
      .get(maincontroller.mainpage);
    app.route('/startMaster')
      .get(maincontroller.startMaster);
    app.route('/startSlave')
      .post(maincontroller.startSlave);
    app.route('/stopMaster')
      .get(maincontroller.stopMaster);
    app.route('/stopSlave')
      .get(maincontroller.stopSlave);
    app.route('/startProducer')
      .get(kafkacontroller.producerOn);
    app.route('/sendMsg')
      .post(kafkacontroller.sendMsg);
    app.route('/startBroker')
      .get(kafkacontroller.startBroker);
    app.route('/stopBroker')
      .get(kafkacontroller.stopBroker);
    app.route('/runPython')
      .post(maincontroller.runPython);
    app.route('/uploadInputFile')
      .post(filecontroller.upload.any(),maincontroller.uploadInput);
    app.route('/showList')
      .get(filecontroller.showList);
}
