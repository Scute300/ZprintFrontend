<template>
  <div>
    <Navbar />
    <div class="container">
        <div class="columns">
            <div class="column is-6">
                <div class="boxes" style="background-color: #ABFFA5;">
                    <p class="title is-3"> Caja </p>       
                    <p class="title is-4">{{caja}}</p>             
                </div>                 
            </div>
            <div class="column is-6">
                <div class="boxes" style="background-color: #A6CBFF;">
                    <p class="title is-3"> Caja Fuerte </p>
                    <p class="title is-4">{{cajaFuerte}}</p>
                    <a href="#" @click="openModal()">Retirar Efectivo</a>
                </div>
            </div>
        </div>
        <div class="colums is-centered">
            <div class="column is-12 bottomArrow is-vcentered">
               <a 
                    @click="cerrarCaja()"
                    class="title is-3"
                > 
                    Cerrar Caja
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    </div>
    <QuantityModal
        v-if="modal"
        :message="'¿Cuanto deseas retirar?'"
        :close="closeModal"
        :method="retiroCajaFuerte"
        :requireInput="true"
        :placeholder="'Introduzca una Cantidad'"
    />
  </div>
</template>

<script lang="js">
import Vue from 'vue'
import Navbar from '../../components/Navbar'
import QuantityModal from '../../components/ToastModal.component'
export default Vue.extend({
  components: {
    Navbar,
    QuantityModal
  },
  mounted(){
    this.getBoxes()
  },
  data() {
    return {
        caja: 0,
        cajaFuerte: 0,
        modal: false
    }
  },
  methods: {
    GoRoute(param) {
      this.$router.push(param)
    },
    async getBoxes(){
        const token = await JSON.parse(localStorage.getItem('token')) 
        this.$axios.get('api/getCajas', {
            headers: { Authorization: `Bearer ${token.token}` } 
        }).then( ({data}) => { 
            this.caja = data.data.caja.importe,
            this.cajaFuerte = data.data.cajaFuerte.importe 
        })
    },
    async cerrarCaja(){
        const token = await JSON.parse(localStorage.getItem('token')) 
        this.$axios.post('/api/cerrarCaja', {}, {
            headers: { Authorization: `Bearer ${token.token}` } 
        }).then( ( {data} ) => {
            this.caja = data.data.caja.importe,
            this.cajaFuerte = data.data.cajaFuerte.importe 
        })
    },
    closeModal(){
        this.modal = false
    },
    openModal(){
        this.modal = true
    },
    async retiroCajaFuerte(cantidad){
        const token = await JSON.parse(localStorage.getItem('token')) 
        this.$axios.post('/api/retiro', {
            cantidad: cantidad
        }, { headers: {Authorization: `Bearer ${token.token}`} }) 
        .then(({data}) => {
            alert(data.message)
            this.cajaFuerte = data.cajaFuerte.importe
            this.closeModal()
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
.boxes {
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.bottomArrow {
    display: flex;
    justify-content: center; 
}
</style>
