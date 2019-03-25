<template>
<div class="small">
  <line-chart :chart-data="datacollection" :options="chartoption"></line-chart>
</div>
</template>

<script>
import LineChart from './LineChart.js'
import 'chartjs-plugin-streaming';

export default {
  name: "input-chart",
  components: {
    LineChart
  },
  data() {
    return {
      datacollection: null,
      chartoption: {
        title: {
          display: true,
          text: 'Line chart (hotizontal scroll) sample'
        },
        responsive: true,
        scales: {
          xAxes: [{
            type: 'realtime',
            realtime: {
              onRefresh: function(chart) {
                chart.data.datasets.forEach(function(dataset) {
                  dataset.data.push({
                    x: Date.now(),
                    y: Math.round(Math.random() * 30)
                  });
                });
              },
              duration: 100000,
              ttl: 60000,
              refresh: 2000,
              delay: 0,

            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'value'
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
        maintainAspectRatio:false
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
          label: 'Dataset 1 (linear interpolation)',
          backgroundColor: "blue",
          borderColor: "red",
          fill: false,
          lineTension: 0,
          borderDash: [8, 4],
          data: []
        }, {
          label: 'Dataset 2 (cubic interpolation)',
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
  }
}
</script>
