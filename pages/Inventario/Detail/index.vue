<template>
  <div>
    <Navbar />
    <div class="container">
      <HeaderDetailScreen 
         :menuHeaders="menuHeaders"
      />
      <div class="columns">
        <div class="column is-3">
          <div 
            class="columns"
            v-for="value in values"
          >
            <div class="column is-12">
              <div class="boxPrice">
                <div
                  class="boxPriceHeader"
                  :style="{ backgroundColor: value.color }"
                >
                  <p class="title is-4 boxCantidad">
                    {{ value.price }} 
                  </p>
                </div>
                <div class="boxBody">
                  <span class="title is-6">
                    {{ value.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-9">
          <div class="columns">
            <div class="column is-12">
              <div class="box">
                <div class="columns is-mobile is-vcentered">
                  <div class="column is-2">
                    <p class="subtitle is-5">Buscar por</p>
                  </div>
                  <div class="column is-4">
                    <div class="select">
                      <select>
                        <option>Marca/Departamento</option>
                      </select>
                    </div>
                  </div>
                  <div class="column">
                    <label class="checkbox">
                      <input type="checkbox" />
                      Precio 1
                    </label>
                    <label class="checkbox">
                      <input type="checkbox" />
                      Precio 2
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column is-12">
              <div class="box">
                <div class="columns">
                  <div class="column is-12">
                    <div class="control has-icons-right">
                      <input
                        class="input is-medium"
                        type="text"
                        placeholder="Buscar..."
                     />
                      <span class="icon is-small is-right">
                        <i class="fas fa-search"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="columns">
                <Table
                  :headers="tableHeads"
                  :columns="products"
                  :lastPage="lastPage"
                  :currentPage="page"
                  :onChangePage="getProducts"
                  :deleteAction="deleteProduct"
                  :editAction="'Detail/update/'"
                />
                  
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue'
import Navbar from '../../../components/Navbar'
import HeaderDetailScreen from '../../../components/HeaderDetailsScreen'
import Table from '../../../components/Table'
export default Vue.extend({
  components: {
    Navbar,
    HeaderDetailScreen,
    Table
  },
  mounted(){
    this.getTotales()
    this.getProducts(1)
  },
  data() {
    return {
      values: [
        {
          name: 'Valor del Inventario',
          id: 'inventoryValue',
          color: '#81C784',
          price: 0,
        },
        {
          name: 'Costo del Inventario',
          id: 'inventoryCoast',
          color: '#4DB6AC',
          price: 0,
        },
        {
          name: 'Utilidad',
          id: 'utily',
          color: '#4FC3F7',
          price: 0,
        },
        {
          name: 'Productos y Existencias',
          id: 'products',
          color: '#FFB74D',
          price: 0,
        },
      ],
      tableHeads: [
        'Marca',
        'Productos',
        'Existencias',
        'Valor Total',
        'Costo Total',
        'Utilidad' 
      ],
      page: 0,
      lastPage: 1,
      products: [],
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
      ],
    }
  },

  methods: {
    GoRoute(param) {
      this.$router.push(param)
    },
    getProducts(page){
      this.page = page
      const token = JSON.parse(localStorage.getItem('token'))
      this.$axios.get('/api/getProducts/'+this.page, 
        { headers: { Authorization: `Bearer ${token.token}` } }
      ).then(({data}) => {
        const parse = data.data.data.map( ( product ) => {
          return {
            id: product.id,
            marca: product.marca.name,
            producto: product.product_name,
            existencias: product.existencias,
            valor_total: product.precio * product.existencias,
            costo_total: product.costo * product.existencias,
            utilidad: product.precio * product.existencias - product.costo * product.existencias 
          }
        })
        this.lastPage = data.data.meta.last_page
        this.products = parse
      })
    },
    getTotales(){
      const token = JSON.parse(localStorage.getItem('token'))
      this.$axios.get('/api/totalInventario', 
        { headers: { Authorization: `Bearer ${token.token}` } }
      ).then(({data}) => {
          this.values[0].price = `${data.data.precio}$`
          this.values[1].price = `${data.data.costo}$`
          this.values[2].price = `${data.data.utilidad}$`
          this.values[3].price = data.data.unidades
      })
    },
    deleteProduct(id){
      const token = JSON.parse(localStorage.getItem('token'))
      this.$axios.delete('/api/deleteProduct/'+id, {
        headers: { Authorization: `Bearer ${token.token}` }
      }).then(()=> {
        this.getTotales()
        this.getProducts(this.page)
      })
    }
  },
})
</script>

<style>
#mySpan {
  margin-left: 8px !important;
  font-size: 10px;
}

.boxPriceHeader {
  padding: 8px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.boxPrice {
  border-radius: 8px;
  background-color: white;
  overflow: hidden;
}

.boxCantidad {
  color: white !important;
}

.boxBody {
  width: 100%;
  background-color: white;
  padding: 21.5px;
  display: flex;
  justify-content: center;
}
</style>
