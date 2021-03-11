<script lang="ts">
import { Line, mixins } from 'vue-chartjs';
import { ChartData } from 'chart.js';

export default{
  extends: Line,
    mixins: [mixins.reactiveProp],
    props: {
      chartData:{
        type: Object,
        required: true
      }
    },
    mounted () {
      // this.chartData is created in the mixin.
      // If you want to pass options please create a local options object
      this.renderChart(this.chartData, {responsive: true,maintainAspectRatio: false})
    }
}
</script>

<style>

</style>
