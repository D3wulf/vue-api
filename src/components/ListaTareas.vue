<template>
<!--{{tareas}}-->
  <table class="table">
        <thead>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Categorias</th>
            <th scope="col">Nivel</th>
            <th scope="col">Añadido por</th>
            <th scope="col">Acción</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in tareas" :key="item.id">
            <th scope="row">{{item.id}}</th>
            <td>{{item.nombre}}</td>
            <td>
                <span v-for="(cat,index) in item.categorias" :key="index">
                    
                    {{
                        item.categorias.length === index + 1 ? cat : cat + ', '
                    }}
                </span>
                <!-- {‌{item.categorias.join(', ')}} -->
                </td>
            <td>{{item.estado}}</td>
            <td>{{item.owner}}</td>
            <td>
                <button @click="deleteTareas(item.id)" class="btn btn-danger btn-sm"><img style="width: 25px; height: 25px" src="../assets/trash-alt-solid.svg"/>
                </button>
                <router-link 
                class="btn btn-warning ml-2 btn-sm"
                :to="{
                    name:'Editar',
                    params: {
                        id:item.id
                        }
                    
                    }">
                <img style="width: 25px; height:25px" src="../assets/editar.svg"/>
                </router-link>
                </td>
            </tr>
            
  </tbody>
</table>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    computed:{
        ...mapState(['tareas'])
    },
    methods: {
        ...mapActions(['deleteTareas'])
    }

}
</script>
<style >
.table{

    background: lightsteelblue;
    border-radius: 5px;
}
    
</style>
