import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: { rutaProtegida: true }
    },
    {
        path: '/editar/:id',
        name: 'Editar',
        component: () =>
            import ('../views/Editar.vue'),
        meta: { rutaProtegida: true }
    },
    {
        path: '/registro',
        name: 'Registro',
        component: () =>
            import ('../views/Registro.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/test',
        name: 'Test',
        //carpeta componentes
        component: () =>
            import ('../views/Test.vue')
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    // console.log(to.meta.rutaProtegida)
    if (to.meta.rutaProtegida) {
        if (store.getters.usuarioAutenticado) {
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
})

export default router