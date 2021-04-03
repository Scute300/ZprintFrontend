<template>
  <div>
    <Navbar />
    <div class="container">
      <HeaderDetailScreen />
      <div class="columns">
        <div class="column is-12">
          <div class="box">
            <ImageComponent />
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-7">
          <form>
            <div class="field has-addons">
              <div class="control">
                <input class="input" type="text" placeholder="Escanear Codigo de barras" />
              </div>
              <div class="control">
                <button class="button is-success">
                  Escanear
                </button>
              </div>
            </div>
            <div class="field">
              <label class="label">
                Nombre*
              </label>
              <div class="control">
                <input class="input is-fullwidth" type="text" placeholder="Nombre del producto">
              </div>
            </div>
            <div class="field">
              <label class="label">
                Precio*
              </label>
              <div class="control">
                <input class="input is-fullwidth" type="number" placeholder="Precio del producto">
              </div>
            </div>
            <div class="field">
              <label class="label">
                Precio 2
              </label>
              <div class="control">
                <input class="input is-fullwidth" type="number" placeholder="Precio del producto">
              </div>
            </div>
            <div class="field">
              <label class="label">
                  Costo
              </label>
              <div class="control">
                <input class="input is-fullwidth" type="number" placeholder="Precio de compra">
              </div>
            </div>
            <div class="field">
              <label class="label">
                  Existencias
              </label>
              <div class="control">
                <input class="input is-fullwidth" type="number" placeholder="Precio de compra">
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <div class="box">
            <div class="columns">
              <div class="column is-7">
                <form>
                  <h3 class="title is-4">
                    Información adicional  
                  </h3>
                  <div class="field">
                    <div class="label">
                      Marca
                    </div>
                    <div class="control">
                      <div class="select is-fullwidth">
                        <select>
                          <option>Select dropdown</option>
                          <option>With options</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="field">
                    <div class="label is-fullwidth">
                      Departamento
                    </div>
                    <div class="control">
                      <div class="select is-fullwidth">
                        <select>
                          <option>Select dropdown</option>
                          <option>With options</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="field">
                    <div class="label is-fullwidth">
                      Especificaciones
                    </div>
                    <div class="control">
                      <textarea class="textarea is-fullwidth has-fixed-size" /> 
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <button class="button is-success">
            Listo
          </button>
          <button class="button is-danger">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue'
import Navbar from '../../../../components/Navbar'
import HeaderDetailScreen from '../../../../components/HeaderDetailsScreen'
import ImageComponent from '../../../../components/ImageComponent'
export default Vue.extend({
  components: {
    Navbar,
    HeaderDetailScreen,
    ImageComponent
  },
  data() {
    return {}
  },
  methods: {
    GoRoute(param) {
      this.$router.push(param)
    },
  },
})
</script>

<style>
</style>
