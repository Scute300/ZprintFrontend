<template>
  <div>
    <Navbar />
    <div class="container">
      <HeaderDetailScreen />
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
                    {{ value.price }} $
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
                  <div class="column is-12">
                    <div class="table-container">
                      <table class="table is-fullwidth">
                        <thead>
                          <tr>
                            <th v-for="tableHead in tableHeads">
                              {{ tableHead.name }}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="product in products">
                            <td>
                              {{product.marca}}
                            </td>
                            <td>
                              {{product.producto}}
                            </td>
                            <td>
                              {{product.existencias}}
                            </td>
                            <td>
                              {{product.valor_total}}
                            </td>
                            <td>
                              {{product.costo_total}}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
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
export default Vue.extend({
  components: {
    Navbar,
    HeaderDetailScreen,
  },
  mounted(){
    this.getProducts()
  },
  data() {
    return {
      values: [
        {
          name: 'Valor del Inventario',
          id: 'inventoryValue',
          color: '#81C784',
          price: 500,
        },
        {
          name: 'Costo del Inventario',
          id: 'inventoryCoast',
          color: '#4DB6AC',
          price: 8000,
        },
        {
          name: 'Utilidad',
          id: 'utily',
          color: '#4FC3F7',
          price: 9999,
        },
        {
          name: 'Productos y Existencias',
          id: 'products',
          color: '#FFB74D',
          price: 8000,
        },
      ],
      tableHeads: [
        {
          id: 'marca',
          name: 'Marca',
        },
        {
          id: 'productos',
          name: 'Productos',
        },
        {
          id: 'existencias',
          name: 'Existencias',
        },
        {
          id: 'valor',
          name: 'Valor Total',
        },
        {
          id: 'costo',
          name: 'Costo Total',
        },
        {
          id: 'utilidad',
          name: 'Utilidad',
        },
      ],
      products: []
    }
  },

  methods: {
    GoRoute(param) {
      this.$router.push(param)
    },
    getProducts(){
      const token = JSON.parse(localStorage.getItem('token'))
      this.$axios.get('/api/getProducts', 
        { headers: { Authorization: `Bearer ${token.token}` } }
      ).then(response => {
        const parse = response.data.data.map( ( product ) => {
          return {
            marca: product.marca.name,
            producto: product.product_name,
            existencias: product.existencias,
            valor_total: product.precio * product.existencias,
            costo_total: product.costo * product.existencias,
            utilidad: ''
          }
        })
        this.products = parse
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
