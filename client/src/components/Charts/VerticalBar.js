import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
