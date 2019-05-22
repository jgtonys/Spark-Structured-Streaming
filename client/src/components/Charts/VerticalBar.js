import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ['options','signal'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  watch: {
    signal() {
      this.$data._chart.destroy();
      this.renderChart(this.chartData, this.options);
    }
  }
}
