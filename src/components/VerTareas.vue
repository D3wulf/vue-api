<template>
<div class="contenedor">
  <table class="table">
        <thead>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Categorias</th>
            <th scope="col">Nivel</th>
            <th scope="col">Añadido por</th>
            
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
            
            </tr>
            
  </tbody>
</table>
</div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    computed:{
        ...mapState(['tareas'])
    }
    

}
</script>
<style >
.table{

    background: lightsteelblue;
    border-radius: 5px;
}
    
</style>