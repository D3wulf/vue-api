# formulario-1

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Firebase deploy

firebase deploy

### reglas

{
  "rules": {
    			"tareas": {
      								"$uid":{
      												".read": true,
      												".write": true
      												}
    								}
  					}
}


## Api modificada para que los usuarios puedan ver todas las tareas 

Para volver a que los usuarios vean solo sus tareas hay que modificar el index.js del store y liberar lo que setTareas y updateTareas. Ahora mismo las tareas que se graban son de uso publico. 

Tambien hay que modificar las reglas de firebase en RealTime DataBase // reglas.