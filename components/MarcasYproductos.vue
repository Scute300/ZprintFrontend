<template>
  <div class="columns">
    <div class="column is-12">
      <div class="table-container">
        <table class="table is-fullwidth">
          <thead>
            <tr> 
              <th v-for="tableHead in tableHeads">
                {{ tableHead }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items">
              <td>
                {{item.name}}
              </td>
              <td>
                <button class="button is-success">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="button is-danger">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue'

export default Vue.extend({
  name: 'TableMarcasyProductos',
  props:{
    items:{
      type: Array,
      required:true
    }
  },
  mounted(){
    console.log(this.items)
  },
  data(){
    return{
      tableHeads: [
        'Nombre',
        'Accion'
      ]
    }
  },
  methods:{
    goLink(param){
      this.$router.push(param)
    }
  }

})
</script>

<style>

</style>
