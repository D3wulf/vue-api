<template>
<div class="contenedor">
<h2>Tareas pendientes</h2>
</div>

<VerTareas/>






</template>

<script>
import Navbar from '../components/Navbar.vue'
import VerTareas from '../components/VerTareas'
import {mapState, mapActions} from 'vuex'


export default {

  components: { 
      Navbar,
    VerTareas 
    },
  data(){
    return{

      tarea:{
        //agregamos Id
        id:'',
        nombre:'',
        categorias: [],
        estado:"",
        numero:0
      }
    }
  },
  methods:{
    ...mapActions(['cargarTodo']),

    
  },
  created(){
      this.cargarTodo()
    }
  
}
  




</script>
