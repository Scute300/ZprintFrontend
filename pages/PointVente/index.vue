<template>
    <div>
        <Navbar />
        <div class="container">
            <div class="columns">
                <div class="column is-7" id="inventoryContainer">
                    <div class="columns">
                        <div class="column is-5">
                            <div class="field">
                              <p class="control has-icons-right">
                                <input class="input is-success is-fullwidth" type="email" placeholder="Email"> 
                                <span class="icon is-small is-right">
                                  <i class="fas fa-check"></i>
                                </span>
                              </p>
                            </div>    
                        </div>
                        <div class="column is-1" />
                        <div class="column is-4">
                            <div class="select is-success is-fullwidth">
                              <select>
                                <option>Select dropdown</option>
                                <option>With options</option>
                              </select>
                            </div>         
                        </div>
                        <div class="column is-2">
                            <button class="button is-primary is-fullwidth">
                                Venta libre
                            </button> 
                        </div> 
                    </div>
                    <div class="columns is-multiline" style="margin-top: 40px;">
                          <div class="column" v-for="(product, index) in products">
                            <div @click="addProduct(product.id, index)" class="columns" id="boxy">
                                <img
                                    :src="product.image"
                                    id="imageContainer"
                                />                 
                            </div> 
                            <div class="columns" id="boxy">
                                <p class="has-text-centered has-text-weight-semibold">
                                    {{product.price}} $
                                </p> 
                            </div>
                            <div class="columns" id="boxy">
                                <p class="has-text-centered has-text-weight-semibold">
                                    {{product.name}} 
                                </p> 
                            </div>
                        </div>  
                    </div>
                </div>
                <div class="column is-5" id="canastaContainer">
                   <div class="columns is-centered">
                      <div class="column is-narrow">
                          <p class="has-text-centered has-text-weight-bold is-size-2">
                            Canasta
                          </p>
                      </div> 
                   </div>
                   <div  v-for="(product, index) in venta" class="columns" >
                       <div class="column is-12">
                            <div class="card">
                                <div class="card-content">
                                    <div class="media">
                                        <div class="media-left">
                                            <figure class="image is-48x48">
                                                <img :src="product.image" alt=""/> 
                                            </figure>
                                            
                                        </div>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-4">{{product.name}}</p>
                                        <div class="columns">
                                            <div class="column is-3">
                                                <input class="input is-success" type="number" :value="product.cantidad" disabled @change="changeProduct(index, $event)">  
                                            </div>
                                            <div class="column is-1">
                                                <button class="button is-success" @click="changeProduct(index, '+')">+</button> 
                                            </div>
                                            <div class="column is-1">
                                                <button class="button is-danger" @click="changeProduct(index, '-')">-</button> 
                                            </div>
                                            <div class="column is-6">
                                                <div class="select is-success is-fullwidth">
                                                  <select>
                                                    <option>Select dropdown</option>
                                                    <option>With options</option>
                                                  </select>
                                                </div>                   
                                            </div>
                                            <div class="column is-1">
                                                <button class="button is-danger" @click="deleteVentaElement(index)">
                                                    <i class="fas fa-trash-alt"></i>
                                               </button>        
                                            </div>
                                        </div>  
                                    </div>
                                </div>
                            </div>
                       </div>
                   </div>
                </div>
            </div>
            <div class="columns">
                <div class="column is-7">
                    
                </div>
                <div class="column is-5 is-vcentered" id="totalPriceContainer">
                   <p class="title is-3" style="color: white;">
                    Total: {{priceVente()}} $
                   </p> 
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="js">
    import Vue from 'vue'
    import Navbar from '../../components/Navbar'
    export default Vue.extend({
        components: {
            Navbar
        },
        data(){
            return{
                products: [
                    { name: 'abrazadera', id: 0, image: "https://carritoferretero.com/wp-content/uploads/2018/05/products-abrazadera-de-arranque-carrito-ferretero_2.png", price: 20, existencias: 3},
                    { name: 'tuerca', id: 1, image: "https://cdn.homedepot.com.mx/productos/819576/819576-d.jpg", price: 40, existencias: 5},
                    { name: 'martillo', id: 2, image: "https://cdn.homedepot.com.mx/productos/680442/680442-d.jpg", price: 50, existencias: 7}
                ],
                venta: [

                ],
                total : 0
            }
        },
        methods: {
            addProduct(id, index){
                let busqueda = this.venta.find( item => item.id == id)
                console.log(busqueda)
                if(typeof(busqueda) == 'undefined'){
                    let newObj = this.products[index]
                    newObj.cantidad = 1
                    this.venta.push(newObj)
                } else {
                    busqueda = this.venta.findIndex( element  => element.id == id )
                    let newObj = this.venta[busqueda]
                    if(newObj.cantidad < newObj.existencias){
                        newObj.cantidad = parseInt(this.venta[busqueda].cantidad, 10) + 1
                        this.venta.splice(busqueda, 1, newObj)
                    }
                }
                            },
            deleteVentaElement(index){
                this.venta.splice(index , 1)
                            
            },
            priceVente(){
                let price = 0
                this.venta.map( ( item ) => {
                    price = price + item.price * item.cantidad
                })
                return price
            },
            changeProduct(index, type){
                let newObj = this.venta[index]
                if(type == '+'){
                    if(newObj.cantidad < newObj.existencias){
                        newObj.cantidad = this.venta[index].cantidad + 1
                    }
                } else {
                    if(newObj.cantidad > 1){
                        newObj.cantidad = this.venta[index].cantidad - 1
                    }
                }
                this.venta.splice(index, 1, newObj)
            }
        }
    })
</script>

<style scoped>
 #imageContainer {
     height: 80px;
     width: 80px;
 }
 #boxy {
    display: flex;
    justify-content: center;
    cursor: pointer;
 }
 #inventoryContainer {
    height: 800px;
    max-height: 800px;
 }
 #canastaContainer {
    height: 730px;
    max-height: 730px
 }
 #totalPriceContainer {
    background-color: #00D1B2;
    height: 70px;
 }
</style>

