<template>
<div>
  <div class="row">
    <div class="col-12">
      <card>
        <div class="card-body">
          <input-chart :handle="handle" />
        </div>
      </card>
    </div>
  </div>

  <div class="row">
    <div class="col-12">
      <card>
        <div class="card-body">
          <bar-chart/>
        </div>
      </card>
    </div>
  </div>

  <div class="row">
    <div class="col-12">
      <router-link :to="{ name: 'table'}">
        <v-btn depressed>결과 테이블 비교</v-btn>
      </router-link>
    </div>
  </div>
</div>
</template>
<script>
import {
  InputChart, BarChart
} from "@/components/index";
import {
  mapGetters
} from 'vuex';
export default {
  components: {
    InputChart,
    BarChart
  },
  data() {
    return {
      tmpMsg: "",
      dialog: false
    };
  },
  methods: {
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
