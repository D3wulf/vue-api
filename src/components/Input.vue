<template>
  
  <input type="text"
    class="form-control my-2"
    placeholder="Escriba la tarea"
    v-model.trim="tarea.nombre"
    >
  <div class="progress">
  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
</div>
  <div class="form-check form-check-inline">
    <input
    type="checkbox"
    id="check-1"
    class="form-check-input"
    v-model="tarea.categorias"
    value="Cocina"
    >
    <label for="check-1" class="form-check-label"> Cocina</label>
  </div>
  
  <div class="form-check form-check-inline">
    <input
    type="checkbox"
    id="check-2"
    class="form-check-input"
    v-model="tarea.categorias"
    value="Salon"
    >
    <label for="check-2" class="form-check-label"> Salon</label>
  </div>
  
  <div class="form-check form-check-inline">
    <input
    type="checkbox"
    id="check-3"
    class="form-check-input"
    v-model="tarea.categorias"
    value="Baño"
    >
    <label for="check-3" class="form-check-label">Baño</label>
  </div>
  
  <div class="form-check form-check-inline">
    <input
    type="checkbox"
    id="check-4"
    class="form-check-input"
    v-model="tarea.categorias"
    value="Dormitorio"
    >
    <label for="check-4" class="form-check-label"> Dormitorio</label>

  </div>
  <div class="progress">
  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
</div>
  

  <div class="mt-2">
    <div class="form-check form-check-inline">

      <input 
      type="radio"
      id="radio-1"
      class="form-check-input"
      v-model="tarea.estado"
      value="Superficie"
      >
      <label for="radio-1"> Superficie </label>

    </div>

    <div class="form-check form-check-inline">

      <input 
      type="radio"
      id="radio-2"
      class="form-check-input"
      v-model="tarea.estado"
      value="aFondo"
      >
      <label for="radio-2"> A fondo</label>

    </div>

    <div class="mt-2">

      <input 
      type="text"
      v-model.trim="tarea.owner"
      >
    </div>

  </div>
  <hr>
  <button class="btn btn-primary btn-lg" type="submit" :disabled="bloquear">Enviar</button>
  

</template>

<script>
export default {
    props: {
    tarea:Object
    },
    computed:{
    bloquear(){
      return this.tarea.nombre.trim() === "" ? true : false;
    }
  }

}
</script>
