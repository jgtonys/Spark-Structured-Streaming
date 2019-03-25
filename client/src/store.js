import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    socketConnected: false,
    sparkServer : false,
    sparkSlave : false,
    sparkApp : false,
    sparkBase : "/home/jungyu/spark-2.4.0-bin-hadoop2.7/",
    kafkaProducer : false,
    kafkaBroker: false,
    producer : {
      type: "grey",
      icon: "ti-control-pause",
      title: "Kafka-Producer",
      value: "STOPPED",
      logData: "",
      footerText: "Click to Start",
      footerIcon: "ti-reload"
    },
    broker : {
      type: "grey",
      icon: "ti-control-pause",
      title: "Kafka-Broker",
      value: "STOPPED",
      logData: "",
      footerText: "Click to Start",
      footerIcon: "ti-reload"
    },
    sparkServerValue : {
      type: "grey",
      icon: "ti-control-pause",
      title: "Spark-Sever",
      value: "STOPPED",
      logData: "",
      footerText: "Click to Start",
      footerIcon: "ti-reload"
    },
    sparkSlaveValue : {
      type: "grey",
      icon: "ti-control-pause",
      title: "Spark-Slave",
      value: "STOPPED",
      logData: "",
      footerText: "Click to Start",
      footerIcon: "ti-calendar"
    },
    sparkAppValue: {
      type: "grey",
      icon: "pause_circle_outline",
      title: "Java Application",
      value: "STOPPED",
      logData: "",
      footerText: "Click to Start",
      footerIcon: "ti-timer"
    },
    appOptions: {
      baseMethod: "bin/spark-submit",
      packages: "org.apache.spark:spark-sql-kafka-0-10_2.11:2.4.0",
      master: "jungyu:7077",
      class: "testStructuredStreamingKafka.JavaWordCount",
      targetJar: "../eclipse-workspace/testStructuredStreamingKafka/target/testStructuredStreaming-0.0.1.jar",
      host: "localhost",
      port: "9999",
      windowTime: "60",
      sliceTime: "10"
    },
    consumerData: {},
    newDataSet: [{
      label: 'Dataset 1 (linear interpolation)',
      backgroundColor: "blue",
      borderColor: "red",
      fill: false,
      lineTension: 0,
      borderDash: [8, 4],
      data: []
    }, {
      label: 'Dataset 2 (cubic interpolation)',
      backgroundColor: "blue",
      borderColor: "blue",
      fill: false,
      cubicInterpolationMode: 'monotone',
      data: []
    }]
  },
  getters: {
    getSocketConnected: function (state) {
      return state.socketConnected;
    },
    getSparkServer: function (state) {
      return state.sparkServer;
    },
    getSparkServerValue: function (state) {
      return state.sparkServerValue;
    },
    getSparkSlave: function (state) {
      return state.sparkSlave;
    },
    getSparkSlaveValue: function (state) {
      return state.sparkSlaveValue;
    },
    getSparkApp: function (state) {
      return state.sparkApp;
    },
    getSparkAppValue: function (state) {
      return state.sparkAppValue;
    },
    getProducerValue: function (state) {
      return state.producer;
    },
    getBrokerValue: function (state) {
      return state.broker;
    },
    getBroker: function (state) {
      return state.kafkaBroker;
    },
    getAppOptions: function (state) {
      return state.appOptions;
    },
    getSparkBase: function (state) {
      return state.sparkBase;
    },
    getConsumerData: function (state) {
      return state.consumerData;
    },
    getNewDataSet: function (state) {
      return state.newDataSet;
    }
  },
  mutations: {
    socketConnected: function (state, payload) {
      return state.socketConnected = true;
    },
    socketDisconnected: function (state, payload) {
      return state.socketConnected = false;
    },
    setSparkServerValue: function (state,payload) {
      if(state.sparkServer) {
        state.sparkServerValue.value = "LOADING..";
        state.sparkServerValue.footerText = state.sparkServerValue.title + " loading..";
        axios.get('/startMaster')
        .then(response => {
          console.log(response.data);
          if(response.data[0] == 1) {
            state.sparkServerValue.logData = response.data[1];
            state.sparkServerValue.icon = "ti-control-play";
            state.sparkServerValue.type = "warning";
            state.sparkServerValue.value = "RUNNING";
            state.sparkServerValue.footerText = state.sparkServerValue.title + " is running";
          }
          else {
            state.sparkServerValue.value = "ERROR";
            state.sparkServerValue.footerText = "Please check error log";
          }
        })
      }
      else {
        state.sparkServerValue.value = "LOADING..";
        state.sparkServerValue.footerText = state.sparkServerValue.title + " stopping..";
        axios.get('/stopMaster')
        .then(response => {
          console.log(response.data);
          if(response.data[0] == 1) {
            state.sparkServerValue.logData = response.data[1];
            state.sparkServerValue.icon = "ti-control-pause";
            state.sparkServerValue.type = "grey";
            state.sparkServerValue.value = "STOPPED";
            state.sparkServerValue.footerText = "Click to Start";
          }
        })
      }
    },
    setSparkServer: function (state,payload) {
      state.sparkServer = !state.sparkServer;
    },
    setSparkSlaveValue: function (state,payload) {
      if(state.sparkSlave) {
        state.sparkSlaveValue.value = "LOADING..";
        state.sparkSlaveValue.footerText = state.sparkSlaveValue.title + " loading..";
        axios.post('/startSlave', {
          master: 'jungyu:7077'
        })
        .then(response => {
          console.log(response.data);
          if(response.data[0] == 1) {
            state.sparkSlaveValue.logData = response.data[1];
            state.sparkSlaveValue.icon = "ti-control-play";
            state.sparkSlaveValue.type = "success";
            state.sparkSlaveValue.value = "RUNNING";
            state.sparkSlaveValue.footerText = state.sparkSlaveValue.title + " is running";
          }
          else {
            state.sparkSlaveValue.value = "ERROR";
            state.sparkSlaveValue.footerText = "Please check error log";
          }
        })
      }
      else {
        state.sparkSlaveValue.value = "LOADING..";
        state.sparkSlaveValue.footerText = state.sparkSlaveValue.title + " stopping..";
        axios.get('/stopSlave')
        .then(response => {
          console.log(response.data);
          if(response.data[0] == 1) {
            state.sparkSlaveValue.logData = response.data[1];
            state.sparkSlaveValue.icon = "ti-control-pause";
            state.sparkSlaveValue.type = "grey";
            state.sparkSlaveValue.value = "STOPPED";
            state.sparkSlaveValue.footerText = "Click to Start";
          }
        })
      }
    },
    setSparkSlave: function (state,payload) {
      state.sparkSlave = !state.sparkSlave;
    },
    setSparkAppValue: function (state,payload) {
      if(state.sparkApp) {
        state.sparkAppValue.value = "LOADING..";
        state.sparkAppValue.footerText = state.sparkAppValue.title + " loading..";
        state.sparkAppValue.icon = "ti-control-play";
        state.sparkAppValue.type = "danger";
        state.sparkAppValue.value = "RUNNING";
        state.sparkAppValue.footerText = state.sparkAppValue.title + " is running";
      }
      else {
        state.sparkAppValue.icon = "ti-control-pause";
        state.sparkAppValue.type = "grey";
        state.sparkAppValue.value = "STOPPED";
        state.sparkAppValue.footerText = "Click to Start";
      }
    },
    setSparkApp: function (state,payload) {
      state.sparkApp = !state.sparkApp;
    },
    updateAppLog: function (state,payload) {
      state.sparkAppValue.logData = state.sparkAppValue.logData + '\n' + payload.value;
      console.log("blabla : " + payload.value);
    },
    setProducer: function (state,payload) {
      state.kafkaProducer = !state.kafkaProducer;
    },
    setProducerValue: function (state,payload) {
      axios.get('/startProducer')
      .then(response => {
        console.log(response.data);
        if(response.data == "ready") {
          state.producer.value = "LOADING..";
          state.producer.footerText = state.producer.title + " loading..";
          state.producer.icon = "ti-control-play";
          state.producer.type = "danger";
          state.producer.value = "RUNNING";
          state.producer.footerText = state.producer.title + " is running";
        }
      })
    },
    updateProducerMsg: function (state,payload) {
      state.producer.logData = state.producer.logData + '\n' + payload.value;
    },
    setBroker: function (state,payload) {
      state.kafkaBroker = !state.kafkaBroker;
    },
    setBrokerValue: function (state,payload) {
      if(state.kafkaBroker) {
        state.broker.value = "LOADING..";
        state.broker.footerText = state.broker.title + " loading..";
        axios.get('/startBroker');
        state.broker.icon = "ti-control-play";
        state.broker.type = "success";
        state.broker.value = "RUNNING";
        state.broker.footerText = state.broker.title + " is running";
      }
      else {
        state.broker.value = "LOADING..";
        state.broker.footerText = state.broker.title + " stopping..";
        axios.get('/stopBroker');
        state.broker.icon = "ti-control-pause";
        state.broker.type = "grey";
        state.broker.value = "STOPPED";
        state.broker.footerText = "Click to Start";

      }
    },
    updateAppOption: function(state,payload) {
      if(payload.key == 0) state.appOptions.baseMethod = payload.value;
      else if(payload.key == 1) state.appOptions.packages = payload.value;
      else if(payload.key == 2) state.appOptions.master = payload.value;
      else if(payload.key == 3) state.appOptions.class = payload.value;
      else if(payload.key == 4) state.appOptions.targetJar = payload.value;
      else if(payload.key == 5) state.appOptions.host = payload.value;
      else if(payload.key == 6) state.appOptions.port = payload.value;
      else if(payload.key == 7) state.appOptions.windowTime = payload.value;
      else if(payload.key == 8) state.appOptions.sliceTime = payload.value;
    },
    updateSparkBase: function(state,payload) {
      state.sparkBase = payload.value;
    },
    updateConsumerData: function(state,payload) {
      state.consumerData = payload.value;
    },
    updateNewDataSet: function(state,payload) {
      state.newDataSet[0].data.push(payload.value);
      console.log(state.newDataSet[0].data);
    }
  },
  actions: {
    connectSocket ({ commit }) {
      commit('socketConnected');
    },
    disconnectSocket ({ commit }) {
      commit('socketDisconnected');
    },
    toggleSparkServer ({ commit }) {
      commit('setSparkServer');
      commit('setSparkServerValue');
    },
    toggleSparkSlave ({ commit }) {
      commit('setSparkSlave');
      commit('setSparkSlaveValue');
    },
    toggleSparkApp ({ commit }) {
      commit('setSparkApp');
      commit('setSparkAppValue');
    },
    startProducer ({ commit }) {
      commit('setProducer');
      commit('setProducerValue');
    },
    toggleBroker ({ commit }) {
      commit('setBroker');
      commit('setBrokerValue');
    }
  }
});
