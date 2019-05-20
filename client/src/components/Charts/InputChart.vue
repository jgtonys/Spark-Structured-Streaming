<template>
<div class="small">
  <line-chart :chart-data="datacollection" :options="chartoption"></line-chart>
</div>
</template>

<script>
// nagix.github.io/chartjs-plugin-streaming/samples/interactions.html
import LineChart from './LineChart.js'
import 'chartjs-plugin-streaming';
import {
  mapGetters
} from 'vuex';

export default {
  name: "input-chart",
  components: {
    LineChart
  },
  props: ['handle'],
  data() {
    return {
      datacollection: null,
      chartoption: {
        title: {
          display: true,
          text: '결과 잔존률 그래프'
        },
        responsive: true,
        scales: {
          xAxes: [{
            type: 'realtime',
            realtime: {
              onRefresh: (chart) => {
                chart.data.datasets.forEach((dataset,key) => {
                  if(key==0) {
                    dataset.data = this.newDataSet.success;
                  }
                  if(key==1) {
                    dataset.data = this.newDataSet.fail;
                  }

                });
              },
              duration: 80000,
              ttl: 100000,
              refresh: 1000,
              delay: 2000,

            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: '비율(%)'
            },
            ticks: {
              suggestedMin: 0
            }
          }]
        },
        tooltips: {
          mode: 'nearest',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: false
        },
        plugins: {
          streaming: {
            frameRate: 30
          }
        },
        maintainAspectRatio:false,
        onClick:this.handle
      }
    }
  },
  mounted() {
    this.fillData()
  },
  methods: {
    fillData() {
      this.datacollection = {
        datasets: [{
          label: 'success',
          backgroundColor: "white",
          borderColor: "red",
          fill: false,
          lineTension: 0,
          borderDash: [8, 4],
          data: []
        }, {
          label: 'fail',
          backgroundColor: "blue",
          borderColor: "blue",
          fill: false,
          cubicInterpolationMode: 'monotone',
          data: []
        }]
      }
    }
  },
  computed: mapGetters({
    newDataSet: 'getNewDataSet'
  })
}
</script>
