<template>
<div>
  <div>
    <top-navbar></top-navbar>

    <h1>Table</h1>

    <v-btn @click="sync">데이터 싱크</v-btn>

      <v-layout row wrap>
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
        <v-flex xs6>
        <v-data-table :headers="headers" :items="desserts" :loading="true" class="elevation-1" :rows-per-page-items="[50, 100]">
          <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
          <template slot="items" slot-scope="props">
            <td class="text-xs-right">{{ props.item.calories }}</td>
            <td class="text-xs-right">{{ props.item.fat }}</td>
            <td class="text-xs-right">{{ props.item.carbs }}</td>
            <td class="text-xs-right">{{ props.item.protein }}</td>
            <td class="text-xs-right">{{ props.item.iron }}</td>
          </template>
        </v-data-table>
        </v-flex>
      </v-layout>

  </div>
</div>
</template>
<style lang="scss">
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
      resultData: [{
        InTime: '',
        SEXNUM: '',
        CITYCODE: '',
        AGECODE: '',
        HEIGHT_MIN: '',
        HEIGHT_MAX: '',
        HEIGHT_AVG: '',
        HEIGHT_DSTD: '',
        WEIGHT_MIN: '',
        WEIGHT_MAX: '',
        WEIGHT_AVG: '',
        WEIGHT_DSTD: '',
        BLOODSUGAR_MIN: '',
        BLOODSUGAR_MAX: '',
        BLOODSUGAR_AVG: '',
        BLOODSUGAR_DSTD: '',
        SBP_MIN: '',
        SBP_MAX: '',
        SBP_AVG: '',
        SBP_DSTD: '',
        DBP_MIN: '',
        DBP_MAX: '',
        DBP_AVG: '',
        DBP_DSTD: '',
        DRINK_CNCT: '',
        DRINK_MAX: '',
        CIGAR_CNCT: '',
        CIGAR_MAX: '',
        SEX_CNCT: ''
      }],
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
      ],
      headers: [
        {
          text: 'Calories',
          value: 'calories'
        },
        {
          text: 'Fat (g)',
          value: 'fat'
        },
        {
          text: 'Carbs (g)',
          value: 'carbs'
        },
        {
          text: 'Protein (g)',
          value: 'protein'
        },
        {
          text: 'Iron (%)',
          value: 'iron'
        }
      ],
      desserts: [{
          value: false,
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          value: false,
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          value: false,
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          value: false,
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          value: false,
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          value: false,
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          value: false,
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          value: false,
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          value: false,
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          value: false,
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ]
    }
  },
  methods: {
    sync() {
      this.resultData = this.$store.state.newDataSetObj;
      console.log(this.resultData);
      console.log(this.$store.state.zookeeper);
    }
  }
};
</script>
