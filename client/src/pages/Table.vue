<template>
<div>
  <div>
    <top-navbar></top-navbar>

    <v-btn @click="sync">데이터 싱크</v-btn>

    <v-layout row wrap>
      <v-flex xs6>
        <v-data-table :headers="originalHeaders" :items="resultData" :loading="true" class="elevation-1" :rows-per-page-items="[50, 100]">
          <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
          <template slot="items" slot-scope="props">
            <td class="text-xs-right">{{ props.item.InTime }}</td>
            <td class="text-xs-right">{{ props.item.HEIGHT }}</td>
            <td class="text-xs-right">{{ props.item.WEIGHT }}</td>
            <td class="text-xs-right">{{ props.item.BLOODSUGAR }}</td>
            <td class="text-xs-right">{{ props.item.SBP }}</td>
            <td class="text-xs-right">{{ props.item.DBP }}</td>
          </template>
        </v-data-table>
      </v-flex>
      <v-flex xs6>
        <v-data-table :headers="resultHeaders" :items="resultData" :loading="true" class="elevation-1" :rows-per-page-items="[50, 100]">
          <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
          <template slot="items" slot-scope="props">
            <td class="text-xs-right">{{ props.item.InTime }}</td>
            <td class="text-xs-right">{{ props.item.HEIGHT_AVG }}</td>
            <td class="text-xs-right">{{ props.item.WEIGHT_AVG }}</td>
            <td class="text-xs-right">{{ props.item.BLOODSUGAR_AVG }}</td>
            <td class="text-xs-right">{{ props.item.SBP_AVG }}</td>
            <td class="text-xs-right">{{ props.item.DBP_AVG }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

  </div>
</div>
</template>
<style lang="scss">
table.v-table tbody td:first-child,
table.v-table tbody td:not(:first-child),
table.v-table tbody th:first-child,
table.v-table tbody th:not(:first-child),
table.v-table thead td:first-child,
table.v-table thead td:not(:first-child),
table.v-table thead th:first-child,
table.v-table thead th:not(:first-child) {
    font-size: 4px;
    width: 50px;
}

table.v-table tbody td:first-child,
table.v-table tbody th:first-child,
table.v-table thead td:first-child,
table.v-table thead th:first-child {
    padding: 1px 1px 1px 24px;

}

table.v-table tbody td:not(:first-child),
table.v-table tbody th:not(:first-child),
table.v-table thead td:not(:first-child),
table.v-table thead th:not(:first-child) {
    padding: 1px 1px 1px 1px;
}
</style>
<script>
import TopNavbar from "../layout/dashboard/TopNavbar.vue";
import {
  mapGetters
} from 'vuex';
export default {
  components: {
    TopNavbar
  },
  data() {
    return {
      originalHeaders: [{
          text: '시간',
          value: 'InTime'
        },
        {
          text: '키',
          value: 'HEIGHT',
          sortable: false,
        },
        {
          text: '몸무게',
          value: 'WEIGHT',
          sortable: false,
        },
        {
          text: '혈당',
          value: 'BLOODSUGAR',
          sortable: false,
        },
        {
          text: '수축기혈압',
          value: 'SBP',
          sortable: false,
        },
        {
          text: '이완기혈압',
          value: 'DBP',
          sortable: false,
        }
      ],
      resultHeaders: [{
          text: '시간',
          value: 'InTime'
        },
        {
          text: '평균 키',
          value: 'HEIGHT_AVG'
        },
        {
          text: '평균 몸무게',
          value: 'WEIGHT_AVG'
        },
        {
          text: '평균 혈당',
          value: 'BLOODSUGAR_AVG'
        },
        {
          text: '평균 수축기혈압',
          value: 'SBP_AVG'
        },
        {
          text: '평균 이완기혈압',
          value: 'DBP_AVG'
        }
      ]
    }
  },
  methods: {
    sync() {
      console.log(this.resultData);
    }
  },
  computed: mapGetters({
    resultData: 'getNewDataSetObj',
    originalData: 'getOriginalData'
  })
};
</script>
