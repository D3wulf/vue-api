<template>
<div class="login">
  <h1 class="my-5">Registro de usuarios</h1>
  <form @submit.prevent="procesarFormulario()">
      <input type="email" placeholder="email" class="form-control my-2" v-model.trim="email">
      <input type="password" placeholder="password" class="form-control my-2" v-model.trim="pass1">
      <input type="password" placeholder="password" class="form-control my-2" v-model.trim="pass2">
      <button type="submit" class="btn btn-primary" :disabled="bloquear">Registrar</button>


  </form>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import Input from '../components/Input.vue'
export default {
  components: { Input },
  data(){
      return {
          email: '',
          pass1:'',
          pass2: ''
      }
  },
  computed:{
      bloquear(){
          if (!this.email.includes('@')){
              return true
          }
          if(this.pass1.length >5 && this.pass1 === this.pass2){
              return false
          }
          return true
      }
  },
  methods:{
      ...mapActions(['registrarUsuario']),

      //esta funcion es para limpiar el formulario tras darle a submit
      procesarFormulario(){
          this.registrarUsuario({email:this.email, password:this.pass1})
          this.email= 'nepe';
          this.pass1= '';
          this.pass2= '';
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