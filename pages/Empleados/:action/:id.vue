<template>
  <div>
    <Navbar />
    <div class="container">
      <HeaderDetailScreen 
        :menuHeaders="menuHeaders"
      />
      <div class="columns">
        <div class="column is-12">
          <h3  
            class="title is-3"
            v-if="$route.params.action == 'new'"
          >Nuevo Empleado</h3>
          <h3
            v-else
            class="title is-3"
          >
            Editar empleado {{ form.name }}
          </h3>
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <h3 class="title is-5">Información Basica</h3>
        </div>
      </div>
      <div class="columns">
        <div class="column is-6">
          <label class="label">Nombre *</label>
          <input
            v-model="form.name"
            class="input is-success is-fullwidth" 
            type="text" 
            placeholder="Ej: Juan Garcia"
          >           
        </div> 
      </div>
      <div class="columns">
        <div class="column is-12">
          <label class="label"> 
            Numero telefónico *
          </label>
          <input 
            v-model="form.phone"
            class="input is-success is-fullwidth" 
            type="number"
            placeholder="Ej: 2284934211"
          >
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <label class="label"> 
            Email *
          </label>
          <input 
            v-model="form.email"
            class="input is-success is-fullwidth" 
            type="email"
            placeholder="Ej: ejemplo@email.com"
          >
        </div>
      </div>
      <div class="columns">
        <div class="column is-6">
          <label class="label"> 
            Sueldo Diario *
          </label>
          <input
            v-model="form.sueldo"
            class="input is-success is-fullwidth" 
            type="number"
            placeholder="30.00"
          >  
        </div>
        <div class="column is-6">
          <label class="label"> 
            Comision % *
          </label>
          <input
            v-model="form.comision"
            class="input is-success is-fullwidth" 
            type="number"
            placeholder="Valores del 0 al 100"
          >  
        </div>
      </div>
      <div class="columns">
        <div class="column is-2">
          <label class="label">
            Genero *
          </label>    
        <div class="select is-success is-fullwidth">
          <select
            placeholder="H/M"
            v-model="form.gender"
          >
            <option>H</option>
            <option>M</option>
          </select>
        </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <h3 class="title is-5">Información adicional</h3>
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <label class="label">Puesto</label>
          <input 
            v-model="form.puesto"
            class="input is-success is-fullwidth" 
            type="text"
            placeholder="Ej: Gerente"
          >
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <label class="label">Fecha de contratacion</label>
          <input 
            v-model="form.contratacion"
            class="input is-success is-fullwidth" 
            type="date"
          > 
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <label class="label">Dirección</label>
          <textarea 
            v-model="form.address"
            class="textarea is-success is-fullwidth"
            placeholder="Ej: Calle zavila #40 Col mineros"
          >
          </textarea>
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
            @click="$router.push('/Empleados')"
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
import Navbar from '../../../components/Navbar.vue'
import HeaderDetailScreen from '../../../components/HeaderDetailsScreen'
  export default{
    components: {
      Navbar,
      HeaderDetailScreen
    },
    mounted(){
      this.getDetails()
    },
    data() {
      return{
        form: {
          name: '',
          phone: '',
          email: '',
          sueldo: 0,
          comision: 0,
          gender: '',
          contratacion: '12-03-2021',
          puesto: '',
          address: ''
        },
        menuHeaders: [
          {
            name: 'Lista de empleados',
            url: '/Empleados',
          },
          {
            name: 'Nuevo Empleado',
            url: '/Empleados/new/empleado'
          }

        ],
      }
    },
    methods: {
      sendForm(){
        if (this.$route.params.action == 'update') {
          this.updateEmpleado()
        } else {
          this.addEmpleado()
        }
      },
      addEmpleado(){
        let dateParts = this.form.contratacion.replace(/-/g, '/')
        const token = JSON.parse(localStorage.getItem('token'))
        this.$axios.post('api/newEmpleado', {
          name: this.form.name,
          phone: this.form.phone,
          email: this.form.email,
          sueldo: this.form.sueldo,
          gender: this.form.gender,
          comision: this.form.comision,
          puesto: this.form.puesto,
          address: this.form.address,
          fecha_contratacion: new Date(dateParts).toISOString(),
        }, { headers: { Authorization: `Bearer ${token.token}` }}).then(() => {
          this.$router.push('/Empleados')
        }).catch(error => {
          console.log(error)
        })
      },
      getDetails(){
        if (this.$route.params.action == 'update') {
          const token = JSON.parse(localStorage.getItem('token')) 
          this.$axios.get('api/detailEmpleados/'+this.$route?.params.id, {
            headers: { Authorization: `Bearer ${token.token}` }
          }).then(({data}) => {
            const obj = data.data
            this.form = {
              name: obj.name,
              phone: obj.phone,
              email: obj.email,
              sueldo: obj.sueldo,
              gender: obj.gender,
              comision: obj.comision,
              puesto: obj.puesto,
              address: obj.adress,
              contratacion: obj.fecha_contratacion.substring(0, 10),
            }
          })
        }
      },
      updateEmpleado(){
        let dateParts = this.form.contratacion.replace(/-/g, '/')
        const token = JSON.parse(localStorage.getItem('token'))
        this.$axios.put('api/updateEmpleado/'+this.$route.params.id, {
          name: this.form.name,
          phone: this.form.phone,
          email: this.form.email,
          sueldo: this.form.sueldo,
          gender: this.form.gender,
          comision: this.form.comision,
          puesto: this.form.puesto,
          address: this.form.address,
          fecha_contratacion: new Date(dateParts).toISOString(),
        },{ headers: { Authorization: `Bearer ${token.token}` }})
        .then(() => {
          this.$router.push('/Empleados')
        })
      }
    },
  }
</script>

<style scoped>

</style>

