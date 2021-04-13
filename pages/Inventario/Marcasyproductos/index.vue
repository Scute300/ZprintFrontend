<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="columns">
        <div
          v-for="tipo in tipos"
          class="column is-6">
          <div class="box">
            <div class="columns">
              <div class="column is-12">
                <div class="boxTitle">
                  <p class="title is-6">
                    {{ tipo.nombre }}
                  </p>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column is-12">
                <div class="field has-addons">
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      :placeholder="`Agregar o buscar ${tipo.id}`"
                    />
                  </div>
                  <div class="control">
                    <a class="button is-success">
                      <i class="fas fa-save" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <TableMarcasyProductos
              :items="tipo.contenido"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue'
import Navbar from '../../../components/Navbar'
import TableMarcasyProductos from '../../../components/MarcasYproductos'
export default Vue.extend({
  components: {
    Navbar,TableMarcasyProductos
  },
  data() {
    return {
      tipos : [
        {
          id: 'marca',
          nombre: 'Marcas',
          contenido: [{name: 'Example', id: '0'}]
        },
        {
          id: 'departamento',
          nombre: 'Departamento',
          contenido: [{name: 'Example', id: '0'}]
        }
      ]
    }
  },
  methods: {
  },
})
</script>

<style>
#mySpan {
  margin-left: 8px !important;
  font-size: 10px;
}

.boxTitle {
  border-bottom: 1px solid black;
  padding: 5px;
}
</style>
