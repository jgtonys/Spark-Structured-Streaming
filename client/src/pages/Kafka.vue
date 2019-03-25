<template>
<div class="row">
  <div class="col-md-12">
    <div class="m-3 p-3">
      <div class="row">
        <div class="col-4">
          <div class="card">
            <div class="card-header">
              <i :class="this.broker.icon"></i> {{this.broker.value}}
            </div>
            <div class="card-body">
              <h5 class="card-title">{{this.broker.title}}</h5>
              <p class="card-text">Kafka server makes broker which enables kafka producer and client communicate via topic.</p>
              <button type="button" class="btn btn-primary" v-on:click="toggleBroker()">{{this.broker.footerText}}</button>
            </div>
          </div>
        </div>
        <div class="col-4" v-if="this.brokerStatus">
          <div class="card">
            <div class="card-header">
              <i :class="this.producer.icon"></i> {{this.producer.value}}
            </div>
            <div class="card-body">
              <h5 class="card-title">{{this.producer.title}}</h5>
              <p class="card-text">Kafka producer gives java spark structured application multiple set of inputs to calculate.</p>
              <button type="button" class="btn btn-primary" v-on:click="startProducer()">{{this.producer.footerText}}</button>
            </div>
          </div>
        </div>
        <div class="col-4" v-if="this.brokerStatus">
          <div class="card">
            <div class="card-header">
              <i :class="this.producer.icon"></i> {{this.producer.value}}
            </div>
            <div class="card-body">
              <h5 class="card-title">Kafka Consumer</h5>
              <p class="card-text">blabla</p>
              <button type="button" class="btn btn-primary" v-on:click="startConsumer()">{{this.producer.footerText}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {
  mapGetters
} from 'vuex';

export default {
  data() {
    return {

    };
  },
  methods: {
    startProducer: function() {
      this.$store.dispatch('startProducer');
    },
    toggleBroker: function() {
      this.$store.dispatch('toggleBroker');
    },
    startConsumer: function() {
      this.$socket.emit('consumer',"test3");
    },
  },
  computed: mapGetters({
    producer: 'getProducerValue',
    broker: 'getBrokerValue',
    brokerStatus: 'getBroker'
  })
};
</script>
<style>
</style>
