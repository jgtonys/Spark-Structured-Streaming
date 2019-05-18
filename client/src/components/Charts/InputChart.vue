<template>
<div class="small">
  <line-chart :chart-data="datacollection" :options="chartoption"></line-chart>
</div>
</template>

<script>
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
                  /*dataset.data.push({
                    x: Date.now(),
                    y: Math.round(Math.random() * 30)
                  });*/
                  if(key==0) {
                    dataset.data = this.newDataSet.success;
                  }
                  if(key==1) {
                    dataset.data = this.newDataSet.fail;
                  }

                });
              },
              duration: 400000,
              ttl: 400000,
              refresh: 2000,
              delay: 0,

            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Value'
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
            frameRate: 60
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
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  },
  computed: mapGetters({
    newDataSet: 'getNewDataSet'
  })
}
</script>
