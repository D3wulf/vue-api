<template>
  <div class="contenedor">
  <!-- el prevent hace que no se ponga a enviar el formulario y enseñe los datos-->
  <form @submit.prevent="procesarFormulario">
    <Input :tarea="tarea"/>
  </form>
  <hr>
  <ListaTareas/>
  <!--
  <p>{{tarea}}</p>
  -->

  </div>
</template>

<script>
import Input from '../components/Input'
import ListaTareas from '../components/ListaTareas'
import { mapActions } from 'vuex'

const shortid = require ('shortid');



export default {
  name: 'Home',
  components: {
    Input,
    ListaTareas
    
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
                              //'cargarLocalStorage'
    ...mapActions(['setTareas','cargarTodo']),

    procesarFormulario(){
      console.log(this.tarea)
      if(this.tarea.nombre.trim()=== ""){
        console.log('Campo Vacío')
        return
      }
      //generamos id
      this.tarea.id = shortid.generate()
      console.log(this.tarea.id)

      //envio de datos
      //esto ira al index.js actions, luego a mutations y acaba en state
      this.setTareas(this.tarea)

      //limpiar datos tras el submit
      this.tarea = {
        id:'',
         nombre:'',
        categorias: [],
        estado:"",
        numero:0
      }
    }
  },
  created(){
        this.cargarTodo()
      //this.cargarLocalStorage()
    }
  
}
</script>
<style >

 .contenedor{
   margin: 0 auto;
   width: 1200px;
   background-color:lightgray;
   padding: 10px;
   text-align: center;
   margin-top:50px ;
   border-radius: 7px;
   box-shadow: 5px 10px 18px #888888;

}
</style>

