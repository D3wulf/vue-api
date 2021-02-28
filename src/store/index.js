import { createStore } from 'vuex'
import router from '../router'

export default createStore({
    state: {
        tareas: [],
        tarea: {
            id: '',
            nombre: '',
            categorias: [],
            estado: '',
            owner: ''
        },
        user: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        cargar(state, payload) {
            state.tareas = payload
        },
        set(state, payload) {
            state.tareas.push(payload)
        },
        eliminar(state, payload) {
            state.tareas = state.tareas.filter(item => item.id !== payload)
        },
        tarea(state, payload) {
            if (!state.tareas.find(item => item.id === payload)) {
                router.push('/')
                return
            }
            state.tarea = state.tareas.find(item => item.id === payload)
        },
        update(state, payload) {
            state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item)
            router.push('/')
        }
    },
    actions: {
        async cargarTodo({ commit }) {
            try {
                //recoger datos de firebase
                const res = await fetch('https://vue-api-ed1d5-default-rtdb.europe-west1.firebasedatabase.app/tareas.json')
                    //transformar en json
                const dataDB = await res.json()
                    //console.log(dataDB)
                    //creamos una variable con un array vacio para llenarlo de datos
                const arrayTareas = []
                    //creamos un for para que los datos que hemos conseguido en el fetch, recorrerlos e ir añadiendolos
                    // en el arraytareas
                for (let id in dataDB) {
                    //console.log(id)
                    //console.log(dataDB[id])
                    arrayTareas.push(dataDB[id])
                }
                //console.log(arrayTareas)
                //Teniendo la info ya en arraytareas, la cargamos usando la mutacion, arraytareas seria el payload
                commit('cargar', arrayTareas)


            } catch (error) {
                console.log(error)

            }
        },
        cerrarSesion({ commit }) {
            commit('setUser', null)
            router.push('/login')
            localStorage.removeItem('usuario')
        },
        async loginUsuario({ commit }, usuario) {
            try {
                const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA5sEQkMAnxcN2QvUtqfJu26582_uqKzw0', {
                    method: 'POST',
                    body: JSON.stringify({

                        email: usuario.email,
                        password: usuario.password,
                        returnSecureToken: true
                    })
                })
                const userDB = await res.json()
                console.log('userDB', userDB)
                if (userDB.error) {
                    return console.log(userDB.error)
                }
                commit('setUser', userDB)
                router.push('/')
                localStorage.setItem('usuario', JSON.stringify(userDB))
            } catch (error) {
                console.log(error)
            }
        },
        async registrarUsuario({ commit }, usuario) {
            try {
                const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA5sEQkMAnxcN2QvUtqfJu26582_uqKzw0', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: usuario.email,
                        password: usuario.password,
                        returnSecureToken: true
                    })
                })
                const userDB = await res.json()
                console.log(userDB)
                if (userDB.error) {
                    console.log(userDB.error)
                    return
                }
                commit('setUser', userDB)
                router.push('/')
                localStorage.setItem('usuario', JSON.stringify(userDB))
            } catch (error) {
                console.log(error)
            }
        },
        async cargarLocalStorage({ commit, state }) {
            if (localStorage.getItem('usuario')) {
                commit('setUser', JSON.parse(localStorage.getItem('usuario')))
            } else {
                return commit('setUser', null)
            }
            try {
                const res = await fetch(`https://vue-api-ed1d5-default-rtdb.europe-west1.firebasedatabase.app/tareas/${state.user.localId}.json?auth=${state.user.idToken}`)
                const dataDB = await res.json()
                const arrayTareas = []
                for (let id in dataDB) {
                    arrayTareas.push(dataDB[id])
                }
                commit('cargar', arrayTareas)

            } catch (error) {
                console.log(error)
            }
        },
        async setTareas({ commit }, tarea) {
            try {
                const res = await fetch(`https://vue-api-ed1d5-default-rtdb.europe-west1.firebasedatabase.app/tareas/${tarea.id}.json`, {
                    //como segundo parametro metemos un objeto que sera configuracion del fetch

                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    //mandaremos el body y lo pasamos a json
                    body: JSON.stringify(tarea)

                })
                const dataDB = await res.json()
                console.log(dataDB)
            } catch (error) {
                console.log(error)
            }
            commit('set', tarea)
        },
        //=========================================================//
        // AQUI EL setTareas CON ID // 
        //=========================================================//
        /*
        async setTareas({ commit, state }, tarea) {
            try {
                const res = await fetch(`https://vue-api-ed1d5-default-rtdb.europe-west1.firebasedatabase.app/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(tarea)
                })

                const dataDB = await res.json()
                console.log(dataDB)

            } catch (error) {
                console.log(error)
            }
            commit('set', tarea)
        },*/
        async deleteTareas({ commit, state }, id) {
            try {
                await fetch(`https://vue-api-ed1d5-default-rtdb.europe-west1.firebasedatabase.app/tareas/${state.user.localId}/${id}.json?auth=${state.user.idToken}`, {
                    method: 'DELETE',
                })
                commit('eliminar', id)
            } catch (error) {
                console.log(error)
            }
        },
        setTarea({ commit }, id) {
            commit('tarea', id)
        },
        async updateTarea({ commit }, tarea) {
            try {
                const res = await fetch(`https://vue-api-ed1d5-default-rtdb.europe-west1.firebasedatabase.app/tareas/${tarea.id}.json`, {
                    method: 'PATCH',
                    body: JSON.stringify(tarea)
                })
                const dataDB = await res.json()
                commit('update', dataDB)
                router.push('/')
            } catch (error) {
                console.log(error)
            }
        }
        //=========================================================//
        // AQUI EL UPDATE CON ID // 
        //=========================================================//
        /*async updateTarea({ commit, state }, tarea) {
            try {
                const res = await fetch(`https://vue-api-ed1d5-default-rtdb.europe-west1.firebasedatabase.app/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
                    method: 'PATCH',
                    body: JSON.stringify(tarea)
                })
                const dataDB = await res.json()
                commit('update', dataDB)
                router.push('/')
            } catch (error) {
                console.log(error)
            }
        }*/
    },
    getters: {
        usuarioAutenticado(state) {
            return !!state.user
        }
    },
    modules: {}
})












//=========================mio===============

/*import { createStore } from 'vuex'
import router from '../router'

export default createStore({
    state: {
        tareas: [],
        tarea: {
            id: '',
            nombre: '',
            categorias: [],
            estado: "",
            numero: 0
        },
        user: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        cargar(state, payload) {
            state.tareas = payload
        },
        set(state, payload) {
            state.tareas.push(payload)
        },
        eliminar(state, payload) {
            //se filtran todos los id distintos al que pulsamos en eliminar
            state.tareas = state.tareas.filter(item => item.id !== payload)
        },
        tarea(state, payload) {
            if (!state.tareas.find(item => item.id === payload)) {
                router.push('/')
                return
            }
            state.tarea = state.tareas.find(item => item.id === payload)


        },
        update(state, payload) {

            state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item)
                //para redireccionar tras ejecutar el update
            router.push('/')

        }

    },
    actions: {
        cerrarSesion({ commit }) {
            commit('setUser', null)
            router.push('/login')
            localStorage.removeItem('usuario')
        },
        async loginUsuario({ commit }, usuario) {

            try {
                //TODO ESTO "SALE" EN LA DOCUMENTACION DE FIREBASE DE LA PARTE DE AUTH. EL METHOD, LO QUE PIDE EL BODY, EL FETCH...
                const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA5sEQkMAnxcN2QvUtqfJu26582_uqKzw0', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: usuario.email,
                        password: usuario.password,
                        returnSecureToken: true
                    })
                })
                const userDB = await res.json()
                console.log('userDB', userDB)
                if (userDB.error) {
                    return console.log(userDB.error)
                }
                commit('setUser', userDB)
                router.push('/')
                localStorage.setItem('usuario', JSON.stringify(userDB))

            } catch (error) {

                console.log(error)
            }

        },
        async registrarUsuario({ commit }, usuario) {
            try {
                const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA5sEQkMAnxcN2QvUtqfJu26582_uqKzw0', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: usuario.email,
                        password: usuario.password,
                        returnSecureToken: true
                    })
                })
                const userDB = await res.json()
                console.log(userDB)
                if (userDB.error) {
                    console.log(userDB.error)
                    return
                }
                commit('setUser', userDB)
                localStorage.setItem('usuario', JSON.stringify(userDB))
                router.push('/')

            } catch (error) {

                console.log(error)
            }

        },
        async cargarLocalStorage({ commit, state }) {
            if (localStorage.getItem('usuario')) {
                commit('setUser', JSON.parse(localStorage.getItem('usuario')))

            } else {
                return commit('setUser', null)
            }
            try {
                //recoger datos de firebase
                const res = await fetch(`https://vue-api-ed1d5-default-rtdb.europe-west1.firebasedatabase.app/tareas/${state.user.localId}.json?auth=${state.user.idToken}`)
                    //transformar en json
                const dataDB = await res.json()
                    //console.log(dataDB)
                    //creamos una variable con un array vacio para llenarlo de datos
                const arrayTareas = []
                    //creamos un for para que los datos que hemos conseguido en el fetch, recorrerlos e ir añadiendolos
                    // en el arraytareas
                for (let id in dataDB) {
                    //console.log(id)
                    //console.log(dataDB[id])
                    arrayTareas.push(dataDB[id])
                }
                //console.log(arrayTareas)
                //Teniendo la info ya en arraytareas, la cargamos usando la mutacion, arraytareas seria el payload
                commit('cargar', arrayTareas)


            } catch (error) {
                console.log(error)

            }
        },
        //firebase
        async setTareas({ commit, state }, tarea) {
            try {
                const res = await fetch(`https://vue-api-ed1d5-default-rtdb.europe-west1.firebasedatabase.app/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
                    //como segundo parametro metemos un objeto que sera configuracion del fetch

                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    //mandaremos el body y lo pasamos a json
                    body: JSON.stringify(tarea)

                })
                const dataDB = await res.json()
                console.log(dataDB)
            } catch (error) {
                console.log(error)
            }
            commit('set', tarea)
        },
        async deleteTareas({ commit }, id) {

            try {
                //fetch a la base de datos, esta vez por la id
                await fetch(`https://vue-api-ed1d5-default-rtdb.europe-west1.firebasedatabase.app/tareas/${state.user.localId}/${id}.json?auth=${state.user.idToken}`, {
                    //Delete para borrar
                    method: 'DELETE',

                })
                commit('eliminar', id)
            } catch (error) {

                console.log(error)
            }

        },
        setTarea({ commit }, id) {

            commit('tarea', id)
        },
        async update({ commit }, tarea) {

            try {
                //fetch a la base de datos, esta vez por la id
                const res = await fetch(`https://vue-api-ed1d5-default-rtdb.europe-west1.firebasedatabase.app/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
                        //patch es para actualizar
                        method: 'PATCH',
                        //pasamos a json string
                        body: JSON.stringify(tarea),


                    })
                    //guardamos los resultados en datadb en formato json
                const dataDB = await res.json()
                commit('update', dataDB)

            } catch (error) {

                console.log(error)
            }
            //ejecutamos los cambios al mutator update y mandamos lo que nos sale en dataDB

        }

    },
    getters: {
        usuarioAutenticado(state) {
            return !!state.user
        }

    },
    modules: {}
})*/