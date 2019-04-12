<template>
<div class="row">
  <div class="col-md-12">
    <div class="m-3 p-3">
      <div class="row">

        <div class="col-4">
          <stats-card>
            <div class="icon-big" slot="header">
              <v-btn flat fab block :color="this.broker.type" v-on:click="toggleBroker()" :loading="this.broker.loading" :disabled="this.broker.loading">
                <v-icon size="50px">{{this.broker.icon}}</v-icon>
              </v-btn>
            </div>
            <div class="numbers" slot="content">
              <p>{{this.broker.title}}</p>
              {{this.broker.value}}
            </div>
            <div class="stats" slot="footer">
              <i :class="this.broker.footerIcon"></i> {{this.broker.footerText}}
            </div>
          </stats-card>
        </div>

        <div class="col-4" v-if="this.brokerStatus">
          <stats-card>
            <div class="icon-big" slot="header">
              <v-btn flat fab block :color="this.producer.type" v-on:click="startProducer()" :loading="this.producer.loading" :disabled="this.producer.loading">
                <v-icon size="50px">{{this.producer.icon}}</v-icon>
              </v-btn>
            </div>
            <div class="numbers" slot="content">
              <p>{{this.producer.title}}</p>
              {{this.producer.value}}
            </div>
            <div class="stats" slot="footer">
              <i :class="this.producer.footerIcon"></i> {{this.producer.footerText}}
            </div>
          </stats-card>
        </div>
        <div class="col-4" v-if="this.brokerStatus">
          <stats-card>
            <div class="icon-big" slot="header">
              <v-btn flat fab block :color="this.consumer.type" v-on:click="startConsumer()" :loading="this.consumer.loading" :disabled="this.consumer.loading">
                <v-icon size="50px">{{this.consumer.icon}}</v-icon>
              </v-btn>
            </div>
            <div class="numbers" slot="content">
              <p>{{this.consumer.title}}</p>
              {{this.consumer.value}}
            </div>
            <div class="stats" slot="footer">
              <i :class="this.consumer.footerIcon"></i> {{this.consumer.footerText}}
            </div>
          </stats-card>
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
import { StatsCard } from "@/components/index";

export default {
  components: {
    StatsCard
  },
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
      this.$store.commit('setKafkaConsumer');
    }
  },
  computed: mapGetters({
    producer: 'getProducerValue',
    producerStatus: 'getProducer',
    broker: 'getBrokerValue',
    brokerStatus: 'getBroker',
    consumer: 'getConsumerValue',
    consumerStatus: 'getConsumer'
  })
};
</script>
<style>
</style>
