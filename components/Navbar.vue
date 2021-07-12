<template>
  <div id="menu2">
    <div v-if="blockScreen"  class="blackScreen" />
    <nav class="navbar is-fixed-top is-primary navTop" role="navigation" aria-label="dropdown navigation">
      <div class="navbar-brand">
        <a 
          @click="displayMenu"
          class="navbar-item"
        >
          <i class="fas fa-bars fa-2x"></i>
        </a>
        <span class="navbar-item title is-4">
          MAMMON
        </span>
      </div>
    </nav>
    <transition name="menu-element">
      <div v-if="showMenu == true" id="menu">
        <div class="container">
          <div v-for="menu in menus" class="columns is-vcentered"> 
            <div class="column is-12" id="menuContainer">
              <a @click="goLink(menu.route)" style="display: flex; align-items: center;">
                <span class="icon-text">
                  <span class="icon is-large">
                    <i id="icon" :class="menu.icon"/>
                  </span>
                </span>
                <span class="title is-4 has-text-white">
                  {{menu.name}}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>  
  </div>
</template>

<script lang="js">
import Vue from 'vue'

export default Vue.extend({
  name: 'Navbar',
  data(){
    return{
      showMenu: false,
      blockScreen: false,
      menus: [
        {name: 'User', icon: 'fas fa-user fa-2x'},
        {name: 'Escritorio', icon: 'fas fa-chart-line fa-2x', route: '/Dashboard'},
        {name: 'Punto de Venta', icon: 'fas fa-store fa-2x', route:'/PointVente'},
        {name: 'Principal', icon:'fas fa-th-large fa-2x', route: '/Main'},
        {name: 'Inventario', icon: 'fas fa-clipboard-list fa-2x', route: '/Inventario'},
        {name: 'Reportes', icon: 'fas fa-chart-pie fa-2x'},
        {name: 'Configuraciones', icon: 'fas fa-cog fa-2x', route: '/Config'},
        {name: 'Suscripción', icon:'fas fa-project-diagram fa-2x', route: '/Payment'}
      ]
    }
  },
  methods:{
    goLink(param){
      this.displayMenu()
      setTimeout(() => {
        this.$router.push(param)
      }, 1000)
    },
    displayMenu(){
      if (this.showMenu) {
        this.showMenu = false
        setTimeout(() => {
          if (!this.showMenu) {
           this.blockScreen = false
   
          }
        }, 1000)
      } else {
        this.blockScreen = true
        if (this.blockScreen) {
          this.showMenu = true
        }
      }
    }
  }

})
</script>

<style>
.navTop{
    z-index: 2 !important;
}
#menu{
  background-color: #00D1B2;
  width: 300px;
  height: 95vh;
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
.blackScreen{
    display: flex;
    flex: 1;
    top: 0px;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: .8;
    z-index: 2;
}
.menu-element-enter-active {
  transition: all 1s ease;
}

.menu-element-leave-active {
  transition: all 1s ease
}

.menu-element-enter, .menu-element-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-300px);
  opacity: 0;
}
</style>
