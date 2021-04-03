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

<script lang="js">
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
          name: 'Abonar a Caja',
          icon: require('../../assets/icons/006-money.png'),
          route: '/Caja/Open',
          color: '#8878B9',
        },
        {
          name: 'Cerrar Caja',
          icon: require('../../assets/icons/006-money2.png'),
          route: '',
          color: '#BE7DB7',
        },
        {
          name: 'Historial de Caja',
          icon: require('../../assets/icons/006-money3.png'),
          route: '',
          color: '#F396A8',
        },
        {
          name: 'Resumen de Caja',
          icon: require('../../assets/icons/historial.png'),
          route: '',
          color: '#F8BB85',
        },
        {
          name: 'Gastos',
          icon: require('../../assets/icons/042-shopping cart.png'),
          route: '',
          color: '#9CD77D',
        },
        {
          name: 'Prestamos',
          icon: require('../../assets/icons/021-sales2.png'),
          route: '',
          color: '#C6D18F',
        },
        {
          name: 'Devoluciones',
          icon: require('../../assets/icons/003-online shop.png'),
          route: '',
          color: '#72A7DB',
        },
        {
          name: 'Clientes',
          icon: require('../../assets/icons/clients.png'),
          route: '',
          color: '#E07481',
        },
        {
          name: 'Empleados',
          icon: require('../../assets/icons/workers.png'),
          route: '',
          color: '#9A73B2',
        },
        {
          name: 'Proveedores',
          icon: require('../../assets/icons/013-delivery truck.png'),
          route: '',
          color: '#DE84B7',
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
