<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="columns">
        <div class="column is-12">
          <h3 class="title is-3">
            Crear Gasto
          </h3>
        </div>
      </div>
      <div
        class="columns is-centered"
      >
        <div 
          v-if="form.tipoCaja"
          class="column is-half"
        >
          <div class="boxes" style="background-color: #ABFFA5;">
            <p class="title is-3"> Caja </p>       
            <p class="title is-4">{{caja}}</p>             
          </div>                 
        </div>
        <div
          v-else
          class="column is-half"
        >
          <div class="boxes" style="background-color: #A6CBFF;">
            <p class="title is-3"> Caja Fuerte </p>
            <p class="title is-4">{{cajaFuerte}}</p>
          </div>
        </div>
      </div>
      <div class="columns is-centered is-mobile">
        <div class="column is-half">
          <div class="columns is-mobile">
            <div class="column is-4">
              <p class="is-size-6">Caja fuerte</p>
            </div>
            <div class="column is-4">
              <toggle-button v-model="form.tipoCaja"/>
            </div>
            <div class="column is-4">
              <p class="is-size-6">Caja</p>
            </div> 
          </div>
        </div>
      </div>
      <div class="columns is-centered">
        <div class="column is-half">
          <label class="label">Empleado</label>
          <div class="select is-success is-fullwidth">
            <select
              v-model="form.empleado_id"
            >
              <option
                v-for="empleado in empleados"
                :value="empleado.value"
              >
                {{empleado.name}}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="columns is-centered">
        <div class="column is-half">
          <label class="label">Cantidad</label>
          <input 
            v-model="form.cantidad"
            class="input is-success is-fullwidth"  
            type="number"  
          > 
        </div> 
      </div>
      <div class="columns is-centered">
        <div class="column is-half">
          <label class="label">Tipo de gasto</label>
          <input
            v-model="form.concepto"
            class="input is-success is-fullwidth"  
            type="text"  
          > 
        </div> 
      </div>
      <div class="columns is-centered">
        <div class="column is-half">
          <label class="label">Descripcion</label>
          <textarea 
            v-model="form.descripcion"
            class="textarea is-success is-fullwidth"  
            type="number"  
          ></textarea> 
        </div> 
      </div>
      <div class="columns is-centered">
        <div class="column is-half">
          <button 
            v-if="disableButton(form.tipoCaja)"
            class="button is-success"
            disabled
          >
            Listo
          </button>
          <button 
            v-else
            class="button is-success"
            @click="agregarGasto()"
          >
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

<script>
import Navbar from '../../components/Navbar'
  export default{
    components: {
      Navbar,
    },
    mounted(){
      this.getBoxes()
      this.getEmpleados()
    },
    data(){
      return {
        caja: 0,
        cajaFuerte: 0,
        empleados: [],
        form: {
          tipoCaja: true,
          empleado_id: 0,
          cantidad: 0,
          concepto: '',
          descripcion: ''
        }
      }
    },
    methods: {  
      async getBoxes(){
        const token = await JSON.parse(localStorage.getItem('token')) 
        this.$axios.get('api/getCajas', {
          headers: { Authorization: `Bearer ${token.token}` } 
        }).then( ({data}) => { 
          this.caja = data.data.caja.importe,
          this.cajaFuerte = data.data.cajaFuerte.importe 
        })
      },
      getEmpleados(){
        const token = JSON.parse(localStorage.getItem('token'))
        this.$axios.get('api/allEmpleados', {
          headers: { Authorization: `Bearer ${token.token}` }
        }).then(({data}) => {
          const parseSelect = data.data.map((item) => {
            return {
              name: item.name,
              value: item.id
            }
          })
          this.empleados = parseSelect
        })
      },
      disableButton(param){
        switch(param){
          case true:
            if (this.caja < this.form.cantidad || this.form.cantidad == '' || this.form.cantidad == 0) {
              return true  
            } else {
              return false
            }
          break
          case false:
            if (this.cajaFuerte < this.form.cantidad || this.form.cantidad == '' || this.form.cantidad == 0) {
              return true      
            } else {
              return false
            }
          break
        }
      },
      agregarGasto(){
        const token = JSON.parse(localStorage.getItem('token'))
        this.$axios.post('api/addGasto', {
          empleado_id: this.form.empleado_id,
          cantidad: this.form.cantidad,
          concepto: this.form.concepto,
          descripcion: this.form.descripcion,
          caja: this.form.tipoCaja,
        }, { headers: { Authorization: `Bearer ${token.token}` } })
          .then(()=> {
            this.$router.push('/Main')
          })
      }
    }
  }
</script>

<style scoped>
.boxes {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>

