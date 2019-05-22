import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import {
  Notification
} from 'vue-notifyjs';

Vue.use(Vuex);
Vue.use(Notification);

export const store = new Vuex.Store({
  state: {
    socketConnected: false,
    sparkServer: false,
    sparkSlave: false,
    sparkApp: false,
    sparkBase: "/home/sc2/spark-2.4.0-bin-hadoop2.7/",
    kafkaZookeeper: false,
    kafkaBroker: false,
    kafkaConsumer: false,
    zookeeper: {
      type: "black",
      icon: "pause",
      title: "Kafka-Zookeeper",
      value: "STOPPED",
      logData: "",
      footerText: "Click to Start",
      footerIcon: "ti-reload",
      loading: false
    },
    consumer: {
      type: "black",
      icon: "pause",
      title: "Kafka-Consumer",
      value: "STOPPED",
      logData: "",
      footerText: "Click to Start",
      footerIcon: "ti-reload",
      loading: false
    },
    broker: {
      type: "black",
      icon: "pause",
      title: "Kafka-Broker",
      value: "STOPPED",
      logData: "",
      footerText: "Click to Start",
      footerIcon: "ti-reload",
      loading: false
    },
    sparkServerValue: {
      type: "black",
      icon: "pause",
      title: "Spark-Sever",
      value: "STOPPED",
      logData: "",
      footerText: "Click to Start",
      footerIcon: "ti-reload",
      loading: false
    },
    sparkSlaveValue: {
      type: "black",
      icon: "pause",
      title: "Spark-Slave",
      value: "STOPPED",
      logData: "",
      footerText: "Click to Start",
      footerIcon: "ti-calendar",
      loading: false
    },
    sparkAppValue: {
      type: "black",
      icon: "pause",
      title: "Java Application",
      value: "STOPPED",
      logData: "",
      footerText: "Click to Start",
      footerIcon: "ti-timer",
      loading: false
    },
    appOptions: {
      baseMethod: "bin/spark-submit",
      packages: "",
      master: "",
      class: "project.Main",
      targetJar: "~/apps/step2.jar",
      host: "",
      port: "",
      windowTime: "",
      sliceTime: ""
    },
    inputFiles: [],
    consumerData: {},
    newDataSet: {
      "success" : [],
      "fail" : [],
      "success_regroup" : []
    },
    tmpNewDataSetObj: [], //step4 result data 임시저장장소
    newDataSetObj: [],  //step4 result data
    tmpFailedResult: [],
    failedResult: [],
    tmpOriginalData: [],
    originalData: [],
    tmpTunningData: [],
    tmpChartData: {}
  },
  getters: {
    getSocketConnected: function(state) {
      return state.socketConnected;
    },
    getSparkServer: function(state) {
      return state.sparkServer;
    },
    getSparkServerValue: function(state) {
      return state.sparkServerValue;
    },
    getSparkSlave: function(state) {
      return state.sparkSlave;
    },
    getSparkSlaveValue: function(state) {
      return state.sparkSlaveValue;
    },
    getSparkApp: function(state) {
      return state.sparkApp;
    },
    getSparkAppValue: function(state) {
      return state.sparkAppValue;
    },
    getZookeeperValue: function(state) {
      return state.zookeeper;
    },
    getBrokerValue: function(state) {
      return state.broker;
    },
    getBroker: function(state) {
      return state.kafkaBroker;
    },
    getAppOptions: function(state) {
      return state.appOptions;
    },
    getSparkBase: function(state) {
      return state.sparkBase;
    },
    getConsumerData: function(state) {
      return state.consumerData;
    },
    getNewDataSet: function(state) {
      return state.newDataSet;
    },
    getNewDataSetObj: function(state) {
      return state.newDataSetObj;
    },
    getOriginalData: function(state) {
      return state.originalData;
    },
    getConsumer: function(state) {
      return state.kafkaConsumer;
    },
    getConsumerValue: function(state) {
      return state.consumer;
    },
    getZookeeper: function(state) {
      return state.kafkaZookeeper;
    },
    getTmpChartData: function(state) {
      return state.tmpChartData;
    },
    getInputFiles: function(state) {
      return state.inputFiles;
    }
  },
  mutations: {
    socketConnected: function(state, payload) {
      return state.socketConnected = true;
    },
    socketDisconnected: function(state, payload) {
      return state.socketConnected = false;
    },
    setSparkServerValue: function(state, payload) {
      if (state.sparkServer) {
        state.sparkServerValue.loading = true;
        state.sparkServerValue.value = "LOADING..";
        state.sparkServerValue.footerText = state.sparkServerValue.title + " loading..";
        axios.get('/startMaster')
          .then(response => {
            console.log(response.data);
            if (response.data[0] == 1) {
              state.sparkServerValue.loading = false;
              state.sparkServerValue.logData = response.data[1];
              state.sparkServerValue.icon = "play_arrow";
              state.sparkServerValue.type = "warning";
              state.sparkServerValue.value = "RUNNING";
              state.sparkServerValue.footerText = state.sparkServerValue.title + " is running";
              Notification.notify({
                message: "Notification: Spark Server Started Successfully!",
                icon: "ti-light-bulb",
                horizontalAlign: "right",
                verticalAlign: "top",
                type: "success"
              });
            } else {
              state.sparkServerValue.loading = false;
              state.sparkServerValue.value = "ERROR";
              state.sparkServerValue.footerText = "Please check error log";
              Notification.notify({
                message: "Notification: Spark Server Starting Error!",
                icon: "ti-light-bulb",
                horizontalAlign: "right",
                verticalAlign: "top",
                type: "error"
              });
            }
          })
      } else {
        state.sparkServerValue.loading = true;
        state.sparkServerValue.value = "LOADING..";
        state.sparkServerValue.footerText = state.sparkServerValue.title + " stopping..";
        axios.get('/stopMaster')
          .then(response => {
            console.log(response.data);
            if (response.data[0] == 1) {
              state.sparkServerValue.loading = false;
              state.sparkServerValue.logData = response.data[1];
              state.sparkServerValue.icon = "pause";
              state.sparkServerValue.type = "black";
              state.sparkServerValue.value = "STOPPED";
              state.sparkServerValue.footerText = "Click to Start";
              Notification.notify({
                message: "Notification: Spark Server Stopped Successfully!",
                icon: "ti-light-bulb",
                horizontalAlign: "right",
                verticalAlign: "top",
                type: "warning"
              });
            }
          })
      }
    },
    setSparkServer: function(state, payload) {
      state.sparkServer = !state.sparkServer;
    },
    setSparkSlaveValue: function(state, payload) {
      if (state.sparkSlave) {
        state.sparkSlaveValue.loading = true;
        state.sparkSlaveValue.value = "LOADING..";
        state.sparkSlaveValue.footerText = state.sparkSlaveValue.title + " loading..";
        axios.post('/startSlave', {
            master: 'jungyu:7077'
          })
          .then(response => {
            console.log(response.data);
            if (response.data[0] == 1) {
              state.sparkSlaveValue.loading = false;
              state.sparkSlaveValue.logData = response.data[1];
              state.sparkSlaveValue.icon = "play_arrow";
              state.sparkSlaveValue.type = "success";
              state.sparkSlaveValue.value = "RUNNING";
              state.sparkSlaveValue.footerText = state.sparkSlaveValue.title + " is running";
              Notification.notify({
                message: "Notification: Spark Slave Started Successfully!",
                icon: "ti-light-bulb",
                horizontalAlign: "right",
                verticalAlign: "top",
                type: "success"
              });
            } else {
              state.sparkSlaveValue.loading = false;
              state.sparkSlaveValue.value = "ERROR";
              state.sparkSlaveValue.footerText = "Please check error log";
              Notification.notify({
                message: "Notification: Spark Slave Starting Error!",
                icon: "ti-light-bulb",
                horizontalAlign: "right",
                verticalAlign: "top",
                type: "error"
              });
            }
          })
      } else {
        state.sparkSlaveValue.loading = true;
        state.sparkSlaveValue.value = "LOADING..";
        state.sparkSlaveValue.footerText = state.sparkSlaveValue.title + " stopping..";
        axios.get('/stopSlave')
          .then(response => {
            console.log(response.data);
            if (response.data[0] == 1) {
              state.sparkSlaveValue.loading = false;
              state.sparkSlaveValue.logData = response.data[1];
              state.sparkSlaveValue.icon = "pause";
              state.sparkSlaveValue.type = "black";
              state.sparkSlaveValue.value = "STOPPED";
              state.sparkSlaveValue.footerText = "Click to Start";
              Notification.notify({
                message: "Notification: Spark Slave Stopped Successfully!",
                icon: "ti-light-bulb",
                horizontalAlign: "right",
                verticalAlign: "top",
                type: "warning"
              });
            }
          })
      }
    },
    setSparkSlave: function(state, payload) {
      state.sparkSlave = !state.sparkSlave;
    },
    setSparkAppValue: function(state, payload) {
      if (state.sparkApp) {
        state.sparkAppValue.value = "LOADING..";
        state.sparkAppValue.footerText = state.sparkAppValue.title + " loading..";
        state.sparkAppValue.icon = "play_arrow";
        state.sparkAppValue.type = "black";
        state.sparkAppValue.value = "RUNNING";
        state.sparkAppValue.footerText = state.sparkAppValue.title + " is running";
      } else {
        state.sparkAppValue.icon = "pause";
        state.sparkAppValue.type = "black";
        state.sparkAppValue.value = "STOPPED";
        state.sparkAppValue.footerText = "Click to Start";
      }
    },
    setSparkApp: function(state, payload) {
      state.sparkApp = !state.sparkApp;
    },
    updateAppLog: function(state, payload) {
      state.sparkAppValue.logData = state.sparkAppValue.logData + '\n' + payload.value;
    },
    setZookeeper: function(state, payload) {
      state.kafkaZookeeper = !state.kafkaZookeeper;
    },
    setZookeeperValue: function(state, payload) {
      if(state.kafkaZookeeper) {
        state.zookeeper.loading = true;
        state.zookeeper.value = "LOADING..";
        state.zookeeper.footerText = state.zookeeper.title + " loading..";
        axios.get('/startZookeeper')
          .then(response => {
            console.log(response.data);
            if (response.data == "ready") {
              state.zookeeper.loading = false;
              state.zookeeper.icon = "play_arrow";
              state.zookeeper.type = "warning";
              state.zookeeper.value = "RUNNING";
              state.zookeeper.footerText = state.zookeeper.title + " is running";
              Notification.notify({
                message: "Notification: Kafka Zookeeper Started Successfully!",
                icon: "ti-light-bulb",
                horizontalAlign: "right",
                verticalAlign: "top",
                type: "success"
              });
            }
          });
      } else {
        state.zookeeper.loading = true;
        state.zookeeper.value = "LOADING..";
        state.zookeeper.footerText = state.zookeeper.title + " stopping..";
        axios.get('/stopZookeeper')
          .then(response => {
            console.log(response.data);
            if (response.data[0] == 1) {
              state.zookeeper.loading = false;
              state.zookeeper.icon = "pause";
              state.zookeeper.type = "black";
              state.zookeeper.value = "STOPPED";
              state.zookeeper.footerText = "START";
              Notification.notify({
                message: "Notification: Kafka Zookeeper Stopped Successfully!",
                icon: "ti-light-bulb",
                horizontalAlign: "right",
                verticalAlign: "top",
                type: "warning"
              });
            } else {
              Notification.notify({
                message: "Notification: Kafka Zookeeper Stopping Error!",
                icon: "ti-light-bulb",
                horizontalAlign: "right",
                verticalAlign: "top",
                type: "error"
              });
            }
          });
      }

    },
    updateZookeeperMsg: function(state, payload) {
      state.zookeeper.logData = state.zookeeper.logData + '\n' + payload.value;
    },
    setBroker: function(state, payload) {
      state.kafkaBroker = !state.kafkaBroker;
    },
    setBrokerValue: function(state, payload) {
      if (state.kafkaBroker) {
        state.broker.loading = true;
        state.broker.value = "LOADING..";
        state.broker.footerText = state.broker.title + " loading..";
        axios.get('/startBroker')
          .then(response => {
            console.log(response.data);
            if (response.data == "ready") {
              state.broker.loading = false;
              state.broker.icon = "play_arrow";
              state.broker.type = "success";
              state.broker.value = "RUNNING";
              state.broker.footerText = state.broker.title + " is running";
              Notification.notify({
                message: "Notification: Kafka Broker Started Successfully!",
                icon: "ti-light-bulb",
                horizontalAlign: "right",
                verticalAlign: "top",
                type: "success"
              });
            }
          });
      } else {
        state.broker.loading = true;
        state.broker.value = "LOADING..";
        state.broker.footerText = state.broker.title + " stopping..";
        axios.get('/stopBroker')
          .then(response => {
            console.log(response.data);
            if (response.data[0] == 1) {
              state.broker.loading = false;
              state.broker.icon = "pause";
              state.broker.type = "black";
              state.broker.value = "STOPPED";
              state.broker.footerText = "START";
              Notification.notify({
                message: "Notification: Kafka Broker Stopped Successfully!",
                icon: "ti-light-bulb",
                horizontalAlign: "right",
                verticalAlign: "top",
                type: "warning"
              });
            } else {
              Notification.notify({
                message: "Notification: Kafka Broker Stopping Error!",
                icon: "ti-light-bulb",
                horizontalAlign: "right",
                verticalAlign: "top",
                type: "error"
              });
            }
          });
      }
    },
    updateAppOption: function(state, payload) {
      if (payload.key == 0) state.appOptions.baseMethod = payload.value;
      else if (payload.key == 1) state.appOptions.packages = payload.value;
      else if (payload.key == 2) state.appOptions.master = payload.value;
      else if (payload.key == 4) state.appOptions.class = payload.value;
      else if (payload.key == 5) state.appOptions.targetJar = payload.value;
      else if (payload.key == 6) state.appOptions.host = payload.value;
      else if (payload.key == 7) state.appOptions.port = payload.value;
      else if (payload.key == 8) state.appOptions.windowTime = payload.value;
      else if (payload.key == 9) state.appOptions.sliceTime = payload.value;
    },
    updateSparkBase: function(state, payload) {
      state.sparkBase = payload.value;
    },
    updateConsumerData: function(state, payload) {
      state.consumerData = payload.value;
    },
    updateNewDataSet: function(state, payload) {
        var obj = payload.value;
        state.tmpNewDataSetObj.push(obj);
    },
    updateTmpFailedResult: function(state, payload) {
        var obj = payload.value;
        state.tmpFailedResult.push(obj);
    },
    resultDataPush: function(state, payload) {  // topic delimiter 로 보내라는 신호가 왔을 때
        let tmpResult = state.tmpNewDataSetObj;
        let tmpFailedResult = state.tmpFailedResult;
        let tmpTunning = state.tmpTunningData;
        let resultPercent = ((3*tmpResult.length) / 10) // ((3*tmpResult.length) / 10)
        let resultTunning = ((3*tmpTunning.length) / 10)
        //console.log("length: " + resultPercent + "%");
        //console.log("failed_length: " + 100-resultPercent + "%");

        state.newDataSet.success.push({
          x: Date.now(),
          y: resultPercent // 대그룹화 성공한 개수 (잔존데이터)
        });
        state.newDataSet.success_regroup.push({
          x: Date.now(),
          y: resultTunning // 대그룹화 성공한 개수 (잔존데이터)
        });
        state.newDataSet.fail.push({
          x: Date.now(),
          y: 100-resultPercent // 대그룹화 성공하지 못한 개수 (flag 데이터)
        });

        for (let i=0;i<tmpResult.length;i++) {
          let splited = tmpResult[i].split(',');
          let tmpjson = {
            InTime: splited[0],
            SEXNUM: parseFloat(splited[1]).toFixed(2),
            CITYCODE: parseFloat(splited[2]).toFixed(2),
            AGECODE: parseFloat(splited[3]).toFixed(2),
            HEIGHT_MIN: parseFloat(splited[4]).toFixed(2),
            HEIGHT_MAX: parseFloat(splited[5]).toFixed(2),
            HEIGHT_AVG: parseFloat(splited[6]).toFixed(2),
            HEIGHT_DSTD: parseFloat(splited[7]).toFixed(2),
            WEIGHT_MIN: parseFloat(splited[8]).toFixed(2),
            WEIGHT_MAX: parseFloat(splited[9]).toFixed(2),
            WEIGHT_AVG: parseFloat(splited[10]).toFixed(2),
            WEIGHT_DSTD: parseFloat(splited[11]).toFixed(2),
            BLOODSUGAR_MIN: parseFloat(splited[12]).toFixed(2),
            BLOODSUGAR_MAX: parseFloat(splited[13]).toFixed(2),
            BLOODSUGAR_AVG: parseFloat(splited[14]).toFixed(2),
            BLOODSUGAR_DSTD: parseFloat(splited[15]).toFixed(2),
            SBP_MIN: parseFloat(splited[16]).toFixed(2),
            SBP_MAX: parseFloat(splited[17]).toFixed(2),
            SBP_AVG: parseFloat(splited[18]).toFixed(2),
            SBP_DSTD: parseFloat(splited[19]).toFixed(2),
            DBP_MIN: parseFloat(splited[20]).toFixed(2),
            DBP_MAX: parseFloat(splited[21]).toFixed(2),
            DBP_AVG: parseFloat(splited[22]).toFixed(2),
            DBP_DSTD: parseFloat(splited[23]).toFixed(2),
            DRINK_CNCT: splited[24],
            DRINK_MAX: parseFloat(splited[25]).toFixed(2),
            CIGAR_CNCT: splited[26],
            CIGAR_MAX: parseFloat(splited[27]).toFixed(2),
            SEX_CNCT: splited[28]
          }
          if (tmpjson.Intime != "") state.newDataSetObj.push(tmpjson);
        }
        for (let i=0;i<tmpFailedResult.length;i++) {
          state.failedResult.push(tmpFailedResult[i]);
        }

        state.tmpNewDataSetObj = [];
        state.tmpFailedResult = [];
        state.tmpTunningData = [];
    },
    tmpOriginalDataPush: function(state, payload) {
      state.tmpOriginalData.push(payload.value);
    },
    tmpTunningDataPush: function(state, payload) {
      state.tmpTunningData.push(payload.value);
    },
    originalDataPush: function(state, payload) {
      let tmpData = state.tmpOriginalData;
      for (let i=0;i<tmpData.length;i++) {
        let splited = tmpData[i].split(',');
        let tmpjson = {
          YEAR: splited[0],
          SNUM: parseFloat(splited[1]).toFixed(2),
          SEXNUM: parseFloat(splited[2]).toFixed(2),
          AGECODE: parseFloat(splited[3]).toFixed(2),
          CITYCODE: parseFloat(splited[4]).toFixed(2),
          HEIGHT: parseFloat(splited[5]).toFixed(2),
          WEIGHT: parseFloat(splited[6]).toFixed(2),
          WAIST: parseFloat(splited[7]).toFixed(2),
          EYELEFT: parseFloat(splited[8]).toFixed(2),
          EYERIGHT: parseFloat(splited[9]).toFixed(2),
          SBP: parseFloat(splited[10]).toFixed(2),
          DBP: parseFloat(splited[11]).toFixed(2),
          BLOODSUGAR: parseFloat(splited[12]).toFixed(2),
          CIGAR: parseFloat(splited[13]).toFixed(2),
          DRINK: parseFloat(splited[14]).toFixed(2),
          SEX: parseFloat(splited[15]).toFixed(2),
          COMPLETEPK_: splited[16],
          GID_INDEX_: splited[17],
          BG_INDEX: splited[18],
          InTime: splited[19]
        }
        if (tmpjson.Intime !== "") state.originalData.push(tmpjson);
      }
      state.tmpOriginalData = [];
    },
    setKafkaConsumer: function(state, payload) {
      state.kafkaConsumer = !state.kafkaConsumer;
      if (state.kafkaConsumer) {
        state.consumer.icon = "play_arrow";
        state.consumer.type = "success";
        state.consumer.value = "RUNNING";
        state.consumer.footerText = state.consumer.title + " is running";
        Notification.notify({
          message: "Notification: Kafka Consumer Started Successfully!",
          icon: "ti-light-bulb",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "success"
        });
      } else {
        state.consumer.icon = "pause";
        state.consumer.type = "black";
        state.consumer.value = "STOPPED";
        state.consumer.footerText = "START";
        Notification.notify({
          message: "Notification: Kafka Consumer Stopped Successfully!",
          icon: "ti-light-bulb",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "warning"
        });
      }
    },
    setTmpChartData: function(state,payload) {
      state.tmpChartData = payload.data;
    },
    setInputFiles: function(state, payload) {
      let inputList = payload.value;
      for (let i=0;i<inputList.length;i++) {
        let tmpjson = { text : inputList[i], value : inputList[i]};
        state.inputFiles.push(tmpjson);
      }
      console.log(state.inputFiles);
    }
  },
  actions: {
    connectSocket({
      commit
    }) {
      commit('socketConnected');
    },
    disconnectSocket({
      commit
    }) {
      commit('socketDisconnected');
    },
    toggleSparkServer({
      commit
    }) {
      commit('setSparkServer');
      commit('setSparkServerValue');
    },
    toggleSparkSlave({
      commit
    }) {
      commit('setSparkSlave');
      commit('setSparkSlaveValue');
    },
    toggleSparkApp({
      commit
    }) {
      commit('setSparkApp');
      commit('setSparkAppValue');
    },
    startZookeeper({
      commit
    }) {
      commit('setZookeeper');
      commit('setZookeeperValue');
    },
    toggleBroker({
      commit
    }) {
      commit('setBroker');
      commit('setBrokerValue');
    }
  }
});
