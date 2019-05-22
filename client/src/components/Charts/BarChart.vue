<template>
<div class="small">
  <vertical-bar :chart-data="datacollection" :options="chartoption"></vertical-bar>
</div>
</template>

<script>
// nagix.github.io/chartjs-plugin-streaming/samples/interactions.html
import VerticalBar from './VerticalBar.js'
import {
  mapGetters
} from 'vuex';

export default {
  name: "bar-chart",
  components: {
    VerticalBar
  },
  data() {
    return {
      datacollection: null,
      chartoption: {
        title: {
          display: true,
          text: '실시간 정보'
        },
        responsive: true,
        scales: {
          yAxes: [{
						ticks: {
							beginAtZero: true
						},
						gridLines: {
							display: true
						}
					}],
					xAxes: [{
						ticks: {
							beginAtZero: true
						},
						gridLines: {
							display: false
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
          label: '잔존율',
          backgroundColor: '#f87979',
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: '#249EBF',
          data: [40]
        }
      ]
      }
    }
  }/*,
  computed: mapGetters({
    newDataSet: 'getNewDataSet'
  })*/
}
</script>
