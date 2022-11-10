import {createStore} from 'vuex';
import router from '../routes/routes';

const store = createStore({

    state:{
        logged: false
    },
    getters:{
        getLogged(state){
            return state.logged;
        }
    },
    mutations:{
        login(state, payload){
            state.logged = true;
    
            localStorage.setItem("jwt", payload.jwt);
            localStorage.setItem("user", payload.usuario);
            router.push('/profile')

        },
        logout(state){
            state.logged = false;
            
            localStorage.setItem("jwt", null);
            localStorage.setItem("user", null);
            router.push('/login');
        }
    }

});


export default store;

