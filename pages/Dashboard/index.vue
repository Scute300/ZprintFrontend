<template>
  <div>
    <Navbar/>
    <div class="container">
      <div id="parentColumn" class="columns">
        <div class="column is-3">
          <div
            v-for="menu in menus"
            class="columns is-mobile">
            <div class="column is-12">
              <div id="box">
                <div :style="menu.style">
                  <span class="title is-4" id="boxCantidad">
                    {{menu.value}}
                  </span>
                </div>
                <div id="boxBody">
                  <span class="title is-6">
                    {{menu.category}}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-9">
          <Graphbars/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Navbar from '../../components/Navbar.vue'
import Graphbars from './Components/Graphbars.vue'

export default Vue.extend({
  components:{
    Navbar, Graphbars
  },

  data(){
    return{
      menus: [
        {category:'Ventas del Dia', value: `$400`, style: {
          backgroundColor: '#81C784', padding: '10px',width: '100%', display: 'flex', justifyContent:'center'}},
        {category:'Devoluciones del Dia', value: `$400`, style: {
          backgroundColor:'#E57373', padding: '10px',width: '100%', display: 'flex', justifyContent:'center'}},
        {category:'Prestamos del Dia', value: `$400`, style: {
          backgroundColor: '#4FC3F7', padding: '10px', width: '100%', display: 'flex', justifyContent:'center'}},
        {category:'Gastos del Dia', value: `$400`, style: {
          backgroundColor:'#FFB74D', padding: '10px', width: '100%', display: 'flex', justifyContent:'center'}}
      ]
    }
  }
})
</script>

<style>
#box{
  border-radius: 8px;
  background-color: white;
  overflow: hidden;
}
#boxCantidad{
  color: white !important;
}
#boxBody{
  width: 100%;
  background-color: white;
  padding:21.5px;
  display: flex;
  justify-content: center;
}

</style>
