<template>
<div>
  <div class="row">
    <div class="col-12">
      <v-data-table :headers="resultTableHeaders" :items="dataSetObj" class="elevation-1" :pagination.sync="pagination" select-all item-key="id">
        <template v-slot:no-data>
          <v-alert :value="true" color="error" icon="warning">
            데이터가 존재하지 않습니다
          </v-alert>
        </template>
        <template v-slot:headers="props">
          <tr>
            <th v-for="header in props.headers" :key="header.text" :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']" @click="changeSort(header.value)">
              <v-icon small>arrow_upward</v-icon>
              {{ header.text }}
            </th>
          </tr>
        </template>
        <template v-slot:items="props">
          <td class="text-xs-right">{{ props.index }}</td>
          <td class="text-xs-right">{{ props.item.window.start }}</td>
          <td class="text-xs-right">{{ props.item.SEXNUM_ }}</td>
          <td class="text-xs-right">{{ props.item.CITYCODE_ }}</td>
          <td class="text-xs-right">{{ props.item.AGECODE_ }}</td>
          <td class="text-xs-right">{{ props.item.G_BLOODSUGAR_AVG }}</td>
          <td class="text-xs-right">{{ props.item.G_BLOODSUGAR_DSTD }}</td>
          <td class="text-xs-right">{{ props.item.G_SBP_AVG }}</td>
          <td class="text-xs-right">{{ props.item.G_SBP_DSTD }}</td>
          <td class="text-xs-right">{{ props.item.G_DBP_AVG }}</td>
          <td class="text-xs-right">{{ props.item.G_DBP_DSTD }}</td>
          <td class="text-xs-right">{{ props.item.G_DRINK_CNCT }}</td>
          <td class="text-xs-right">{{ props.item.G_DRINK_DMX }}</td>
          <td class="text-xs-right">{{ props.item.GID_INDEX }}</td>
        </template>
      </v-data-table>
    </div>
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
      dialog: false,
      resultTableHeaders: [{
          text: 'IDs',
          value: 'id'
        },
        {
          text: 'Window',
          value: 'string'
        },
        {
          text: 'Sexnum',
          value: 'string'
        },
        {
          text: 'Citycode',
          value: 'string'
        },
        {
          text: 'Agecode',
          value: 'string'
        },
        {
          text: 'G_BLOODSUGAR_AVG',
          value: 'string'
        }, {
          text: 'G_BLOODSUGAR_DSTD',
          value: 'string'
        }, {
          text: 'G_SBP_AVG',
          value: 'string'
        }, {
          text: 'G_SBP_DSTD',
          value: 'string'
        }, {
          text: 'G_DBP_AVG',
          value: 'string'
        }, {
          text: 'G_DBP_DSTD',
          value: 'string'
        }, {
          text: 'G_DRINK_CNCT',
          value: 'string'
        }, {
          text: 'G_DRINK_DMX',
          value: 'string'
        }, {
          text: 'GID_INDEX',
          value: 'string'
        }
      ],
      pagination: {
        sortBy: 'id',
        descending: true
      }
    };
  },
  sockets: {
    consumer(data) {
      this.$store.commit('updateConsumerData', {
        value: JSON.parse(data.value) // value: data
      });

      // for test
      this.$store.commit('updateNewDataSet', {
        value: data.value
      });
      //
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
