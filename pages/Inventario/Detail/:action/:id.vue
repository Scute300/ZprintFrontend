<template>
  <div>
    <Navbar />
    <div class="container">
      <HeaderDetailScreen 
        :menuHeaders="menuHeaders"
      />
      <div 
        v-if="$route.params.action == 'update'"
        class="columns">
        <div class="column is-12">
          <h3 class="title is-3">Editar Producto {{formulario.nombre}}</h3>
        </div>
      </div>
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
                            :value="marca.id"
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
                            :value="departamento.id"
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
          <button 
            @click="$router.go(-1)"
            class="button is-danger"
          >
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
    this.getDetails()
    this.getInitials()
  },
  data() {
    return {
      selects:{
        marcas: [],
        departamentos: []
      },
      fileTosend: [],
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
      },
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
      ]
    }
  },
  methods: {
    GoRoute(param) {
      this.$router.push(param)
    },
    getDetails(){
      if (this.$route.params.action == 'update') {
        const token = JSON.parse(localStorage.getItem('token'))
        this.$axios.get('/api/detailProduct/'+this.$route.params.id, {
          headers: { Authorization: `Bearer ${token.token}`}
        }).then(({data}) => {
          let obj = data.data
          this.formulario = {
            image: obj.image,
            codigoDeBarras: obj. codigo_de_barras,
            nombre: obj.product_name,
            precio: obj.precio,
            precio2: obj.precio_segundo,
            costo: obj.costo,
            existencias: obj.existencias,
            marca: obj.marca_id,
            departamento: obj.departament_id,
            especificaciones: obj.especificaciones
          }
        })       
      }
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
        console.log(e)
        let files = e.target.files || e.dataTransfer.files; 
        if (!files.length)
        return;
        this.fileTosend = files[0]
        this.createImage(files[0]);
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
      if (this.$route.params.action == 'update') {
        this.updateProduct()  
      } else {
        this.newProduct()
      }
    },
    newProduct(){
        const token = JSON.parse(localStorage.getItem('token'))
        const formSend = new FormData()
        formSend.append('imageProduct', this.fileTosend)
        formSend.append('marca_id', this.formulario.marca) 
        formSend.append('departament_id', this.formulario.departamento)
        formSend.append('product_name', this.formulario.nombre)
        formSend.append('codigo_de_barras', this.formulario.codigoDeBarras)
        formSend.append('precio1', this.formulario.precio)
        formSend.append('precio2', this.formulario.precio2)
        formSend.append('costo', this.formulario.costo)
        formSend.append('especificaciones', this.formulario.especificaciones)
        formSend.append('existencias', this.formulario.existencias)
        this.$axios.post('/api/newProduct', formSend,   
            { headers: { Authorization: `Bearer ${token.token}` } } )
        .then( response => {
          this.$router.push('/Inventario/Detail')
        })
    },
    updateProduct(){
      const token = JSON.parse(localStorage.getItem('token'))
      const formSend = new FormData()
      if (typeof(this.fileTosend) == 'object') {
        formSend.append('imageProduct', this.fileTosend)
      }
      formSend.append('marca_id', this.formulario.marca) 
      formSend.append('departament_id', this.formulario.departamento)
      formSend.append('product_name', this.formulario.nombre)
      formSend.append('codigo_de_barras', this.formulario.codigoDeBarras)
      formSend.append('precio1', this.formulario.precio)
      formSend.append('precio2', this.formulario.precio2)
      formSend.append('costo', this.formulario.costo)
      formSend.append('especificaciones', this.formulario.especificaciones)
      formSend.append('existencias', this.formulario.existencias)

      this.$axios.put('api/updateProduct/'+this.$route.params.id, 
        formSend 
      ,{headers: { Authorization: `Bearer ${token.token}` }})
    }
  },
})
</script>

<style>
</style>
