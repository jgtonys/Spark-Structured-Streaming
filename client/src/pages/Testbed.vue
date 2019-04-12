<template>
<div>
  <div class="row">
    <div class="col-6">
      <card>
        <div class="card-body">
          <h3 class="card-header mb-5">Kafka-Producer User Input Testbed</h3>
          <v-textarea class="p-3 mb-3" readonly id="producerLogData" :value="`${this.producer.logData}`" rows="6"></v-textarea>
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
      <card>
        <div class="card-body">
          <input-chart :handle="handle" />
        </div>
      </card>
    </div>
  </div>



  <v-dialog v-model="dialog" persistent scrollable max-width="500px">
    <v-card>
      <v-card-title class="headline">Detail Information</v-card-title>

      <v-card-text>
        <json-viewer :value="tmpObj" :expand-depth=5 copyable sort>
        </json-viewer>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat="flat" @click="dialog = false">
          확인
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>
</template>
<script>
import {
  InputChart
} from "@/components/index";
import {
  mapGetters
} from 'vuex';
export default {
  components: {
    InputChart
  },
  data() {
    return {
      tmpMsg: "",
      dialog: false,
    };
  },
  sockets: {
    consumer(data) {
      this.$store.commit('updateConsumerData', {
        value: data
      });
    }
  },
  mounted() {
    var el = document.getElementById("producerLogData");
    el.scrollTop = el.scrollHeight;
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
      //console.log("no submit");
    },
    handle(point, event) {
      const item = event[0];
      this.$store.commit('setTmpChartData', {
        value: this.dataSetObj[item._index]
      })
      this.dialog = true;
    }
  },
  updated: function() {
    var el = document.getElementById("producerLogData");
    el.scrollTop = el.scrollHeight;
  },
  computed: mapGetters({
    producer: 'getProducerValue',
    broker: 'getBrokerValue',
    brokerStatus: 'getBroker',
    resultData: 'getConsumerData',
    dataSetObj: 'getNewDataSetObj',
    tmpObj: 'getTmpChartData'
  })
};
</script>
<style>
</style>
