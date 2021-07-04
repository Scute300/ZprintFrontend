<template>
  <div>
    <Navbar />
    <div class="container">
      <HeaderDetailScreen 
        :menuHeaders="menuHeaders"
      />
      <Table
        :headers="tableHeads"
        :columns="empleados"
        :lastPage="lastPage"
        :currentPage="page"
        :onChangePage="getEmpleados"
        :deleteAction="deleteEmpleado"
      /> 
    </div>
  </div>
</template>

<script>
  import Navbar from '../../components/Navbar'
  import HeaderDetailScreen from '../../components/HeaderDetailsScreen'
  import Table from '../../components/Table'
  export default{
    components: {
      Navbar,
      HeaderDetailScreen,
      Table
    },
    mounted(){
      this.getEmpleados(1)
    },
    data(){
      return {
        empleados: [],
        page: 0,
        lastPage:0,
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
        tableHeads: [
          'Nombre',
          'Puesto',
          'Sueldo',
          'Comision',
          'Telefono',
          'Correo'
        ]
      }
    },
    methods: {
      getEmpleados(page){
        this.page = page
        const token = JSON.parse(localStorage.getItem('token'))
        this.$axios.get('/api/getEmpleados/'+this.page, 
          { headers: { Authorization: `Bearer ${token.token}` } }
        ).then(({data}) => {
          console.log(data)
          const parse = data.data.data.map( ( element ) => {
            return {
              id: element.id,
              nombre: element.name,
              puesto: element.puesto,
              sueldo: element.sueldo,
              comision: `${element.comision} %`,
              telefono: element.phone,
              correo: element.email
            }
          })
          this.empleados = parse
          this.lastPage = data.data.meta.last_page
        })
      },
      deleteEmpleado(id){
        const token = JSON.parse(localStorage.getItem('token'))
        this.$axios.delete('/api/eliminarEmpleado/'+id,
         { headers: { Authorization: `Bearer ${token.token}` }}
        ).then(()=> {
          this.getEmpleados(this.page)
        })
      }
    }
  }
</script>

<style scoped>

</style>

