<template>
  <div>
    <Navbar/>
    <div class="container">
      <div class="columns">
        <div class="column is-12">
          <h3 class="title is-2">
            Prestamos
          </h3> 
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
          <label class="label">Monto</label>
          <input
            v-model="form.monto"
            class="input is-success is-fullwidth" 
            type="number"
            placeholder="El monto del prestamo"
          >
        </div>
      </div>
      <div class="columns is-centered">
        <div class="column is-half">
          <label class="label">Cuotas</label>
          <input 
            v-model="form.cuotas"
            class="input is-success is-fullwidth" 
            type="number"
            placeholder="El numero de cuotas en el que se va a dividir el prestamo"
          >
        </div>
      </div>
      <div class="columns is-centered">
        <div class="column is-half">
          <button
            @click="hacerPrestamo"
            class="button is-success is-fullwidth"
          > 
            Hacer prestamo
          </button>
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
    mounted(){
      this.getEmpleados()
    },
    data(){
      return{
        empleados: [],
        form: {
          empleado_id: 0,
          monto: 0,
          cuotas: 0
        }
      }
    },
    methods: {
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
      hacerPrestamo(){
        const token = JSON.parse(localStorage.getItem('token'))
        this.$axios.post('api/nuevoPrestamo', {
          empleado_id: this.form.empleado_id,
          monto: this.form.monto,
          cuotas: this.form.cuotas,
        }, { headers: { Authorization: `Bearer ${token.token}` } })
          .then(() => {
            this.$router.push('/Logs')
          })
      }
    }
  }
</script>

<style scoped>

</style>

