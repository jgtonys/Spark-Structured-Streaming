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
    sparkBase: "/home/sc2/spark-2.4.2-bin-hadoop2.7/",
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
      "G_SBP_DSTD" : [],
      "G_DBP_DSTD" : []
    },
    newDataSetObj: [],
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
      //console.log(payload.value.slice(0, 20));
      //if (payload.value.slice(0, 20) == "Query made progress:") {
        //var obj = JSON.parse(payload.value.slice(21));
        var obj = JSON.parse(payload.value);
        console.log(obj);
        state.newDataSet.G_SBP_DSTD.push({
          x: Date.now(),
          y: obj.G_SBP_DSTD // obj.numInputRows
        });
        state.newDataSet.G_DBP_DSTD.push({
          x: Date.now(),
          y: obj.G_DBP_DSTD // obj.numInputRows
        });
        state.newDataSetObj.push(obj);
      //}

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
      console.log("yes");
      state.inputFiles = payload.value;
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
