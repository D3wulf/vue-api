<template>
<h2>Aquí se testean cosas para aprender Vue</h2>




</template>

<script>
import Navbar from '../components/Navbar.vue'
import ListaTareas from '../components/ListaTareas'
import {mapState, mapActions} from 'vuex'


export default {

  components: { 
      Navbar,
    ListaTareas 
    },

    methods:{
    ...mapActions(['cargarLocalStorage']),

    
  },
  created(){
      this.cargarLocalStorage()
    }
  



}
</script>
