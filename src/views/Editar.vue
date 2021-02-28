<template>
<div class="contenedor">
<!-- capturamos lo que viene de la url -->
<h2>Editar la tarea con id:  {{$route.params.id}}  </h2> <h3> Nombre de tarea: {{tarea.nombre}} </h3>
<form @submit.prevent="updateTarea(tarea)">
<Input :tarea="tarea"/>

</form>
</div>
</template>

<script>

import {mapState, mapActions} from 'vuex'
import Input from '../components/Input'

export default {
    components:{
        Input
    },
    computed:{
        ...mapState(['tarea'])
    },
    methods: {
        ...mapActions(['setTarea','updateTarea'])
    },
    created(){
        this.setTarea(this.$route.params.id)
    }

}
</script>
