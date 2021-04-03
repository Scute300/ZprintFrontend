<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="columns is-multiline is-mobile">
        <div v-for="menu in menus" class="column is-3">
          <a v-on:click="GoRoute(menu.route)">
            <div class="box" :style="{ backgroundColor: menu.color, display: 'flex', justifyContent: 'center' }">
              <figure>
                <img v-bind:src="menu.icon" width="100" height="100"/>
              </figure>
            </div>
          </a>
          <span class="has-text-link has-text-centered" id="mySpan">
            {{ menu.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Navbar from '../../components/Navbar'
export default Vue.extend({
  components: {
    Navbar,
  },
  data() {
    return {
      menus: [
        {
          name: 'Productos Y Servicios',
          icon: require('../../assets/icons/004-onlinestore.png'),
          route: '/Inventario/Detail',
          color: '#8878B9',
        },
        {
          name: 'Ingresar Productos',
          icon: require('../../assets/icons/049-login.png'),
          route: '',
          color: '#F396A8',
        },
        {
          name: 'Egresar Productos',
          icon: require('../../assets/icons/050-logout.png'),
          route: '',
          color: '#BE7DB7',
        },
        {
          name: 'Historial de Ingresos',
          icon: require('../../assets/icons/historialingresos.png'),
          route: '',
          color: '#F8BB85',
        },
        {
          name: 'Historial de egresos',
          icon: require('../../assets/icons/historialegresos.png'),
          route: '',
          color: '#9CD77D',
        },
        {
          name: 'Detalles del Inventario',
          icon: require('../../assets/icons/046-shopping cart.png'),
          route: '',
          color: '#C6D18F',
        },
        {
          name: 'Marcas y Departamentos',
          icon: require('../../assets/icons/001-online store.png'),
          route: '',
          color: '#72A7DB',
        },
        {
          name: 'Descuentos',
          icon: require('../../assets/icons/019-tag.png'),
          route: '',
          color: '#E07481',
        },
      ],
    }
  },
  methods: {
    GoRoute(param) {
      this.$router.push(param)
    },
  },
})
</script>

<style>
#mySpan {
  margin-left: 8px !important;
  font-size: 10px;
}
</style>
