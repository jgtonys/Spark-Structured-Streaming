<template>
<div>
  <div>
    <top-navbar></top-navbar>

    <v-btn @click="sync">데이터 싱크</v-btn>

      <v-layout row wrap>
        <v-flex xs6>
        <v-data-table :headers="originalHeaders" :items="originalData" :loading="true" class="elevation-1" :rows-per-page-items="[50, 100]">
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

table.v-table tbody td:first-child, table.v-table tbody td:not(:first-child), table.v-table tbody th:first-child, table.v-table tbody th:not(:first-child), table.v-table thead td:first-child, table.v-table thead td:not(:first-child), table.v-table thead th:first-child, table.v-table thead th:not(:first-child) {
  padding: 0 1px;
  font-size: 4px;
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
      originalHeaders: [
        {
          text: 'InTime',
          value: 'InTime'
        },
        {
          text: 'HEIGHT',
          value: 'HEIGHT'
        },
        {
          text: 'WEIGHT',
          value: 'WEIGHT'
        },
        {
          text: 'BLOODSUGAR',
          value: 'BLOODSUGAR'
        },
        {
          text: 'SBP',
          value: 'SBP'
        },
        {
          text: 'DBP',
          value: 'DBP'
        }
      ],
      resultHeaders: [
        {
          text: 'InTime',
          value: 'InTime'
        },
        {
          text: 'HEIGHT_AVG',
          value: 'HEIGHT_AVG'
        },
        {
          text: 'WEIGHT_AVG',
          value: 'WEIGHT_AVG'
        },
        {
          text: 'BLOODSUGAR_AVG',
          value: 'BLOODSUGAR_AVG'
        },
        {
          text: 'SBP_AVG',
          value: 'SBP_AVG'
        },
        {
          text: 'DBP_AVG',
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
