<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="columns">
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

<script>
  import Navbar from '../../components/Navbar.vue'
  export default{
    components: {
      Navbar
    },
    data(){
      return{
        menus: [
          {
            name: 'Perfil',
            icon: require('../../assets/icons/014-name.png'),
            route: '/Gastos/nuevo',
            color: '#9CD77D',
          },
          {
            name: 'Usuarios',
            icon: require('../../assets/icons/017-user.png'),
            route: '/Prestamos',
            color: '#C6D18F',
          },
          {
            name: 'Ticket',
            icon: require('../../assets/icons/bill.png'),
            route: '/Prestamos',
            color: '#8878B9',
          },
        ]
      }
    },
    methods: {
      GoRoute(param) {
        this.$router.push(param)
      },
    },
  }
</script>

<style scoped>

</style>

