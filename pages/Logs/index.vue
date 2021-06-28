<template>
  <div>
    <Navbar />
    <div class="container">
     <div class="columns">
       <div class="column">
        <Table
          :headers="headers"
          :columns="logs"
          :lastPage="lastPage"
          :currentPage="page"
          :onChangePage="getLogs"
        /> 
       </div>
     </div>
    </div>
  </div>
</template>

<script>
  import Navbar from '../../components/Navbar'
  import Table from '../../components/Table'
  export default{
    components: {
      Navbar,
      Table
    },
    mounted(){
      this.getLogs(1)
    },
    data(){
      return{
        logs: [],
        headers: [ 'Evento', 'Fecha' ],
        page: 0,
        lastPage: 1
      }
    },
    methods: {
      getLogs( page ){
        this.page = page
        const { token } = JSON.parse(localStorage.getItem('token'))
        this.$axios.get('api/logs/'+this.page,{
          headers: { Authorization : `Bearer ${token}` }
        }).then(({data}) => {
          const newArr = data.data.data.map((item) => {
            return {
              id: item.id,
              event: item.event,
              date: item.created_at.substring(0, 12)  
            }
          })
          this.logs = newArr
          this.lastPage = data.data.meta.last_page
        }) 
      }
    }
  }
</script>

<style scoped>

</style>


