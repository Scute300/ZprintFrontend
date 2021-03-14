<template>
  <form class="box" @submit.prevent="register">

    <div class="field">
      <label class="label">Nombre de la cuenta</label>
      <div class="control">
        <input v-model="store_name" class="input" type="text" placeholder="De 5 a 20 caracteres sin numeros ni simbolos">
      </div>
      <span class="help is-danger">
        {{errors[0].error}}
      </span>
    </div>

    <div class="field">
      <label class="label">Nombre del propietario </label>
      <div class="control">
        <input v-model="name" class="input" type="text" placeholder="De 4 a 25 caracteres sin numeros ni simbolos">
      </div>
      <span class="help is-danger">
        {{errors[1].error}}
      </span>
    </div>

    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input v-model="email" class="input" type="email" placeholder="Email">
      </div>
      <span class="help is-danger">
        {{errors[3].error}}
      </span>
    </div>

    <div class="field">
      <label class="label">Contraseña</label>
      <div class="control">
        <input v-model="password" class="input" type="password" placeholder="8 caracteres como minimo, 30 como maximo">
      </div>
      <span class="help is-danger">
        {{errors[4].error}}
      </span>
    </div>

    <div class="field">
      <label class="label">Confirmar contraseña</label>
      <div class="control">
        <input v-model="password_confirmation" class="input" type="password" placeholder="Ambas contraseñas deben coincidir">
      </div>
    </div>

    <button class="button is-primary is-fullwidth is-small" :class="{'button is-primary is-fullwidth is-loading is-small' : loading}">Registrar</button>
    <a @click="change(1)">
      <span class="help is-primary">
        Regresar al login
      </span>
    </a>
  </form>
</template>

<script lang="js">
import Vue from 'vue'

export default Vue.extend({
  name: 'Register',
  props: ['change'],
  data(){
    return{
      loading: false,
      store_name: '',
      name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors:[
        {field: "store_name", error: ""},
        {field: "name", error: ""},
        {field: "last_name", error: ""},
        {field: "email", error: ""},
        {field: "password", error : ""}
      ]
    }
  },
  methods:{
    async register(){
      this.loading = true
      await this.$axios.post('register',{
        store_name: this.store_name,
        name: this.name,
        last_name: this.last_name,
        email:this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      }).then(response =>{
        this.loading = false
        this.$router.push('/Dashboard')
      }).catch(error =>{
        this.loading = false
        error.response.data.errors.map((err)=>{
          this.errors.map((ferr, index)=>{
            if(err.field == ferr.field){
              this.errors[index].error = err.message
            }
          })
        })
        console.log(error.response.data.errors)
      })
    }
  }
})
</script>

<style>
</style>
