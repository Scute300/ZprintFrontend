<template>
  <div id="bground">
    <div class="container">
      <div class="columns is-centered">
        <div v-if="menuType == 1" class="column is-6">
          <Login :change="changeMenu" />
        </div>
        <div v-if="menuType == 2" class="column is-6" id="register">
          <Register :change="changeMenu" />
        </div>
        <div v-if="menuType == 3" class="column is-6" id="register">
          <NewPassword :change="changeMenu" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="js">
import Vue from 'vue'
import Login from '../components/LoginComponent'
import Register from '../components/RegisterComponent'
import NewPassword from '../components/NewPasswordComponent'

export default Vue.extend({
  components:{
    Login,
    Register,
    NewPassword
  },
  data(){
    return{
      menuType: 1,
    }
  },
  mounted(){
    this.findToken()
  },
  methods:{
    changeMenu(param)
    {
      this.menuType = param
    },
    findToken(){
      const token = localStorage.getItem('token')
      if(token !== null){
        this.$router.push('/Dashboard')
      }
    }
  }
})
</script>

<style>
#login {
  top: 100px !important;
}
#bground {
  background-image: url('https://billypenn.com/wp-content/uploads/2020/04/liquorstore-lcb-markhenninger-01crop-1024x576.jpg');
  height: 101vh;
  background-position: center;
  background-size: cover;
}

#register {
  margin-top: 10px;
}
</style>
