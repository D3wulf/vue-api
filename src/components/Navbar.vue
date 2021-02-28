<template>
  <div class="navbar navbar-dark bg-dark">

  <router-link to="/" class="navbar-brand">
  Formulario Vue M.Angel Sánchez Miranda
    </router-link>
  <div class="d-flex">
      <!--<router-link to="/" class="btn btn-dark" v-if="usuarioAutenticado"
      >
        Tareas
      </router-link>-->
    <router-link to="/login" class="btn btn-dark" v-if="!usuarioAutenticado"
      >
        Login
    </router-link>
    <router-link to="/registro" class="btn btn-dark" v-if="!usuarioAutenticado"
      >
        Registro
    </router-link>

    <router-link to="/test" class="btn btn-dark" v-if="usuarioAutenticado"
      >
        Ver tareas
    </router-link>
    <button
    v-if ="usuarioAutenticado"
    class="btn btn-dark"
    @click="cerrarSesion"
    >Cerrar Sesión</button>



  </div>
  
  
</div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {

  computed:{
    
    ...mapGetters(['usuarioAutenticado'])
  },
  methods:{

    ...mapActions(['cerrarSesion'])
  }
}
</script>

