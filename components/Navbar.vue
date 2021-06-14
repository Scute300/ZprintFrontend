<template>
  <div id="menu2">
    <nav class="navbar is-fixed-top is-primary" role="navigation" aria-label="dropdown navigation">
      <div class="navbar-brand">
        <span class="navbar-item">
          Z Print
        </span>
      </div>
    </nav>
    <div v-if="showMenu == true" id="menu">
      <div class="container">
        <div v-for="menu in menus" class="columns is-vcentered">
          <div class="column is-12" id="menuContainer">
            <a :href="menu.route">
            <span class="icon-text">
              <span class="icon is-large">
                <i id="icon" :class="menu.icon"/>
              </span>
            </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue'

export default Vue.extend({
  name: 'Navbar',
  data(){
    return{
      showMenu: true,
      menus: [
        {name: 'User', icon: 'fas fa-user fa-2x'},
        {name: 'Escritorio', icon: 'fas fa-chart-line fa-2x', route: '/Dashboard'},
        {name: 'Punto de Venta', icon: 'fas fa-store fa-2x', route:'/PointVente'},
        {name: 'Principal', icon:'fas fa-th-large fa-2x', route: '/Main'},
        {name: 'Inventario', icon: 'fas fa-clipboard-list fa-2x', route: '/Inventario'},
        {name: 'Reportes', icon: 'fas fa-chart-pie fa-2x'},
        {name: 'Configuraciones', icon: 'fas fa-cog fa-2x'},
        {name: 'Suscripción', icon:'fas fa-project-diagram fa-2x', route: '/Payment'}
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
#menu{
  background-color: #00D1B2;
  width: 50px;
  height: 92.5vh;
  position:absolute;
  z-index: 3;
  position: fixed;

}
.container{
  margin-top: 60px;
}
#menuContainer{
 background-color: #00D1B2;
  width: 80%;
  display: flex;
  align-items: center !important;
}
#icon{
  color: white;
}
</style>
