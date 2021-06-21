<template>
    <div id="quantityModal">
        <div class="blackScreen"/>
        <div id="message">
            <p class="title is-3">{{message}}</p>
            <div class="columns">
                <div 
                    v-if="requireInput"
                    class="column is-12">
                    <input
                        v-model="propInput"
                        :placeholder="placeholder"
                        class="input is-success is-fullwidth" 
                        type="number"
                    >                
                </div>
            </div>
            <div class="columns">
                <div class="column is-6">
                    <button  
                        @click="callMethod()"
                        class="button is-success is-fullwidth">
                        Aceptar
                    </button>        
                </div>
                <div class="column is-6">
                    <button 
                        @click="close()"
                        class="button is-danger is-fullwidth">
                        Cerrar
                    </button> 
                </div>
            </div>
        </div>  
    </div>
</template>

<script lang="js">
    import Vue from 'vue'
    export default Vue.extend({
        name: 'QuantityModal',
        props: {
            message : {
                type: String,
                required: true
            },
            method : {
                type: Function,
                required: true
            },
            close: {
                type: Function,
                required: true
            },
            requireInput : {
                type: Boolean,
                required: true
            },
            placeholder: {
                type: String,
                required: true
            }
        },
        data(){
            return {
                propInput: ''
            }
        },
        methods: {
            callMethod(){
                if (!this.requireInput) {
                    this.method()
                } else {
                    this.method( this.propInput )
                }
            }
        } 
    })

</script>

<style scoped>
    #quantityModal{
        display: flex;
        flex: 1;
        top: 0px;
        position: absolute;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        z-index: 4;
    }
    .blackScreen{
        display: flex;
        flex: 1;
        top: 0px;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: .8;
    }
    #message{
        padding: 25px;
        background-color: white;
        z-index: 5;
    }
</style>

