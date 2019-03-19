let maincontroller = require('../controllers/main.controller.js');

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
    app.route('/startApp')
      .get(maincontroller.startApp);
}
