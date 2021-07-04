<template>
  <div class="container alignTable">
    <div class="columns">
      <div class="column is-12">
        <div class="table-container">
          <table class="table is-fullwidth is-bordered">
            <thead>
                <th v-for="header in headers">
                  {{ header }}
                </th>
                <th
                  v-if="deleteAction !== undefined"
                >
                  Acciones
                </th>
            </thead>
            <tbody>
              <tr v-for="column in columns">
                <td 
                  v-for="(item, key, index) in column"
                  v-if="key !== 'id'"
                >
                  {{ item }}
                </td>
                <td
                  v-if="deleteAction !== undefined || editAction !== undefined"
                >
                  <button 
                    v-if="deleteAction !== undefined"
                    class="button is-danger"
                    @click="deleteAction(column.id)"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                  <button
                    v-if="editAction !== undefined"
                    @click="$router.push(editAction)"
                    class="button is-success"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                </td>
              </tr>
            </tbody>    
          </table> 
        </div>
      </div> 
    </div>
    <div class="columns is-mobile">
      <div class="column is-12">
        <nav class="pagination" role="navigation" aria-label="pagination">
          <a
            v-if="currentPage !== 1"
            class="pagination-previous"
            @click="changePage('prev')"
          >
            Anterior
          </a>
          <a 
            @click="changePage('next')"
            v-if="currentPage !== lastPage"
            class="pagination-next"
          >
            Siguiente
          </a>
          <ul class="pagination-list"> 
            <li v-for="page in paginate()">
              <a 
                @click="changePage('goTo', page)"
                :class=" page == currentPage ? 'pagination-link is-current' : 'pagination-link'"
              >
                {{ page }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'Table',
    props: {
      headers: {
        type: Array,
        required: true
      },
      columns: {
        type: Array,
        required: true
      },
      lastPage: {
        type: Number,
        required: true
      },
      currentPage: {
        type: Number,
        required: true
      },
      onChangePage: {
        type: Function,
        required: true
      },
      deleteAction: {
        type: Function,
        required: false
      },
      editAction: {
        type: String,
        required: false
      }
    },
    computed:{
      renderObject : (obj) => {
        const newObj = obj
        delete newObj.id
        return obj
      },
    },
    methods:{
      paginate(){
        let pages = []
        for(let i = 1; i <= this.lastPage; i++){
          pages.push(i)
        }
        return pages
      },
      changePage(type, page){
        let newPage = 1
        switch (type) {
          case 'next':
            newPage = this.currentPage + 1
            this.onChangePage(newPage)
          break;
          case 'prev':
            newPage = this.currentPage - 1
            this.onChangePage(newPage)
          break;
          case 'goTo': 
            if(this.currentPage !== page){
              this.onChangePage(page)
            }
          break
        } 
      }, 
    }
  }
</script>

<style scoped>
.alignTable {
  top: 0px ;
}
</style>

