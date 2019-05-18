<template>
<div>
  <div class="row">
    <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Data</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(d,i) in dataSetObj">
          <th scope="row">{{ i }}</th>
          <td>{{ d }}</td>
        </tr>
      </tbody>
    </table>
  </div>


  <div class="row">
    <div class="col-12">
      <v-btn depressed @click="sendMsg()">Send</v-btn>
    </div>
  </div>
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
      dialog: false
    };
  },
  sockets: {
    result(data) {
      /*
      this.$store.commit('updateConsumerData', {
        value: JSON.parse(data.value) // value: data
      });*/

      // for test
      this.$store.commit('updateNewDataSet', {
        value: data.value
      });
      //
    },
    failedResult(data) {
      this.$store.commit('updateTmpFailedResult', {
        value: data.value
      });
    },
    delimiter(data) {
      console.log(data);
      if(data.value == "end") {
        this.$store.commit('resultDataPush');
      }
    }
  },
  methods: {
    sendMsg: function() {
      this.$http.post('/sendMsg', {
          topic: 'test3',
          messages: this.tmpMsg,
          partition: 1
        })
        .then(response => {
          console.log(response);
          this.$store.commit('updateProducerMsg', {
            value: this.tmpMsg
          });
          this.tmpMsg = "";
        });
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
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    }
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
