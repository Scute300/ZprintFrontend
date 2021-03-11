<template>
  <div class="columns">
    <div class="column is-12">
      <div class="box">
        <div class="field">
          <label class="label">Intervalo</label>
          <div class="select">
            <select>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
        </div>
        <line-chart :chartdata="datasets" :options="options"></line-chart>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LineChart from './Graphbars.graph.vue'
export default Vue.extend({
  name: "Graphbars",
  components: {LineChart},
  data(){
    return{
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [300, 900]
        }, {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [200, 900]
        }
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
})
</script>

<style>
 #separator{
  padding: 15px;
 }
</style>
