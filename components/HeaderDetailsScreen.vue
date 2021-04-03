<template>
  <div class="columns">
    <div class="column is-9 is-offset-3">
      <button
        @click="GoRoute(menuHeader.url)"
        v-for="menuHeader in menuHeaders"
        class="button is-primary is-inverted"
        style="background-color: #F2F2F2;"
      >
        {{ menuHeader.name }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  components: {},
  data() {
    return {
      menuHeaders: [
        {
          name: 'Detalle del Inventario',
          url: '/Inventario/Detail',
        },
        {
          name: 'Nuevo Producto',
          url: '/Inventario/Detail/New/Product',
        },
        {
          name: 'Nuevo Servicio',
          url: '/New/Service',
        },
        {
          name: 'Lista de Productos y Servicios',
          url: '/Listadosyservicios',
        },
      ],
    }
  },
  methods: {
    GoRoute(param:string) {
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
