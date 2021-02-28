<template>
<div class="login">
  <h1 class="my-5">Login de Usuario</h1>
  <form @submit.prevent="procesarFormulario">
      <input type="email" placeholder="email" class="form-control my-2" v-model.trim="email">
      <input type="password" placeholder="password" class="form-control my-2" v-model.trim="pass1">
      
      <button type="submit" class="btn btn-primary btn-lg" :disabled="bloquear">Entrar</button>


  </form>
</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  
  data(){
      return {
          email: '',
          pass1:''
         
      }
  },
  computed:{
      bloquear(){
          if (!this.email.includes('@')){
              return true
          }
          if(this.pass1.length >5){
              return false
          }
          return true
      }
  },
  methods:{
      ...mapActions(['loginUsuario']),

      //esta funcion es para limpiar el formulario tras darle a submit
      procesarFormulario(){
          this.loginUsuario({email:this.email, password:this.pass1})
          this.email= 'nepe';
          this.pass1= '';
          
      }
  }

}
</script>
<style scoped>

 .login{
     width: 800px;
     margin: 0 auto;
 }
 
</style>
