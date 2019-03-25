<template>
<div>
  <div class="row">
    <div class="col-6">
      <card>
        <div class="card-body">
          <h3 class="card-header mb-5">Kafka-Producer User Input Testbed</h3>
          <v-textarea class="p-3 mb-3" readonly name="input-7-4" label="Sent Messages" :value="`${this.producer.logData}`" rows="6"></v-textarea>
          <form v-on:submit.prevent="noSubmit()" class="p-3">
            <div class="row">
              <div class="col-8">
                <v-text-field v-model="tmpMsg" v-on:keyup.enter="sendMsg()" label="Kafka Producer message" placeholder="Write Message" required></v-text-field>
              </div>
              <div class="col-4">
                <v-btn depressed @click="sendMsg()">Send</v-btn>
              </div>
            </div>
          </form>
        </div>


      </card>
    </div>

    <div class="col-6">
      <card>
        <div class="card-body">
          <h3 class="card-header mb-5">Kafka-Consumer Response Testbed</h3>
          <json-viewer :value="resultData" :expand-depth=5 copyable boxed sort></json-viewer>
        </div>
      </card>
    </div>
  </div>

  <div class="row">
    <div class="col-12">
      <input-chart />
      <button @click="testbutton">input</button>
    </div>
  </div>

  <div v-if="this.brokerStatus">
    <div class="card">

    </div>
  </div>
</div>
</template>
<script>
import { InputChart } from "@/components/index";
import {
  mapGetters
} from 'vuex';
export default {
  components: {
    InputChart
  },
  data() {
    return {
      tmpMsg: ""
    };
  },
  sockets: {
    consumer(data) {
      this.$store.commit('updateConsumerData', {
        value: data
      });
    }
  },
  methods: {
    sendMsg: function() {
      this.$http.post('/sendMsg', {
          topic: 'test',
          messages: this.tmpMsg,
          partition: 1
        })
        .then(response => {
          console.log(response);
          this.$store.commit('updateProducerMsg', {
            value: this.tmpMsg
          });
          this.tmpMsg = "";
        })
    },
    noSubmit: function() {
      console.log("no submit");
    },
    testbutton: function() {
      let dd = {
        x: Date.now(),
        y: 27
      }
      this.$store.commit('updateNewDataSet', {
        value: dd
      });
    }
  },
  computed: mapGetters({
    producer: 'getProducerValue',
    broker: 'getBrokerValue',
    brokerStatus: 'getBroker',
    resultData: 'getConsumerData'
  })
};
</script>
<style>
</style>
