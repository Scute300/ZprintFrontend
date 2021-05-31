<template>
  <div>
    <Navbar />
    <div class="container">
      <HeaderDetailScreen />
      <div class="columns">
        <div class="column is-12">
          <div class="box">
            <ImageComponent 
              :image="formulario.image"
              :changeFile="onFileChange"
            />
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-7">
          <form>
            <div class="field has-addons">
              <div class="control">
                <input class="input" 
                v-model="formulario.codigoDeBarras"
                type="number" placeholder="Escanear Codigo de barras" />
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
                <input
                v-model="formulario.nombre"
                class="input is-fullwidth" type="text" placeholder="Nombre del producto">
              </div>
            </div>
            <div class="field">
              <label class="label">
                Precio*
              </label>
              <div class="control">
                <input 
                v-model="formulario.precio"
                class="input is-fullwidth" type="number" placeholder="Precio del producto">
              </div>
            </div>
            <div class="field">
              <label class="label">
                Precio 2
              </label>
              <div class="control">
                <input 
                v-model="formulario.precio2"
                class="input is-fullwidth" type="number" placeholder="Precio del producto">
              </div>
            </div>
            <div class="field">
              <label class="label">
                  Costo
              </label>
              <div class="control">
                <input 
                v-model="formulario.costo"
                class="input is-fullwidth" type="number" placeholder="Precio de compra">
              </div>
            </div>
            <div class="field">
              <label class="label">
                  Existencias
              </label>
              <div class="control">
                <input 
                v-model="formulario.existencias"
                class="input is-fullwidth" type="number" placeholder="Precio de compra">
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
                        <select
                          v-model="formulario.marca"
                        >
                          <option
                            v-for="marca in selects.marcas"
                          >
                          {{marca.name}}
                          </option>
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
                        <select
                          v-model="formulario.departamento"
                        >
                          <option
                            v-for="departamento in selects.departamentos"
                          >
                          {{departamento.name}}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="field">
                    <div class="label is-fullwidth">
                      Especificaciones
                    </div>
                    <div class="control">
                      <textarea 
                        v-model="formulario.especificaciones"
                        class="textarea is-fullwidth has-fixed-size" /> 
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
          <button 
            @click="sendForm"
            class="button is-success">
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
  mounted(){
    this.getInitials()
  },
  data() {
    return {
      selects:{
        marcas: [],
        departamentos: []
      },
      formulario:{
        image: '',
        imagen: {},
        file: '',
        codigoDeBarras:'',
        nombre: '',
        precio: '',
        precio2: '',
        costo: '',
        existencias: '',
        marca: '',
        departamento: '',
        especificaciones: '',
      }
    }
  },
  methods: {
    GoRoute(param) {
      this.$router.push(param)
    },
    getInitials(){
      const token = JSON.parse(localStorage.getItem('token'))
      this.$axios.get('/api/marcasydepartamentos',
        { headers: { Authorization: `Bearer ${token.token}` } }
      ).then(response => {
        console.log(response.data)
        const marcas = response.data?.marcas?.map( ( marca ) => {
          return {
            name: marca.name,
            id: marca.id
          }
        })  ;

        const departamentos = response.data?.departaments?.map( ( departament ) => {
          return {
            name: departament.name,
            id: departament.id
          }
        })

        this.selects.marcas = marcas
        this.selects.departamentos = departamentos
      })
    },   
    onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
        return;
        this.createImage(files[0]);
        this.formulario.file = files[0];
        console.log(this.cheateImage)
    },
    createImage(file) {
        let image = new Image();
        let reader = new FileReader();
        let vm = this;
        reader.onload = (e) => {
        vm.formulario.image = e.target.result;
        vm.formulario.imagen = e.target.result;
        };
        reader.readAsDataURL(file);
    },
    sendForm(){
      const token = JSON.parse(localStorage.getItem('token'))
      this.$axios.post('/api/newProduct',{
        marca_id: this.formulario.marca,
        departament_id: this.formulario.departamento,
        product_name: this.formulario.nombre,
        codigo_de_barras: this.formulario.codigoDeBarras,
        precio1: this.formulario.precio,
        precio2: this.formulario.precio2,
        costo: this.formulario.costo,
        especificaciones: this.formulario.especificaciones,
        existencia: this.formulario.existencias,
      },   { headers: { Authorization: `Bearer ${token.token}` } } )
        .then( response => {
          this.$router.push('/Inventario/Detail')
        })
    }
  },
})
</script>

<style>
</style>
