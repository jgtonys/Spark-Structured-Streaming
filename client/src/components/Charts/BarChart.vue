<template>
<div class="small">
  <p>{{ remnantPercent }}</p>
  <p>{{ nonremnantPercent }}</p>
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
        maintainAspectRatio:false,
        height: 200
      }
    }
  },
  mounted() {
    this.fillData()
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: ['추상화 성공률','추상화 실패률'],
        datasets: [{
          label: '추상화 성공률',
          backgroundColor: 'blue',
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: 'blue',
          data: [this.remnantPercent]
        },
        {
          label: '추상화 실패율',
          backgroundColor: 'green',
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: 'green',
          data: [this.nonremnantPercent]
        }
      ]
      }
    }
  },
  computed: mapGetters({
    remnantPercent: 'getRemnantPercent',
    nonremnantPercent: 'getNonRemnantPercent'
  })
}
</script>
