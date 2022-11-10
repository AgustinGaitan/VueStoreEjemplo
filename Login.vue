<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';


export default{
    name:'Login',
    components:{
        
    },
    setup(){
        const store = useStore();
        let logged = computed(()=> store.state.logged);

        const login = (obj) =>{
            store.commit('login',obj);
        }
    
        return {
            logged,
            login
        }

    },  
    data(){
        return{
            error_user:false,
            error_password:false,
            usuario:null,
            pwd:null,
            notarobot:false
        }
    },
    computed: {

        computedCondition(){
            return (this.usuario 
            && this.pwd 
            && this.notarobot);
        },

    },
    methods:{
        async LoginSubmit(){
            let response = await (await fetch("http://localhost:8082/login",{
                method: 'POST',
                body: JSON.stringify({email : this.usuario, password: this.pwd}),
                headers:{
                    'Content-Type':'application/json'
                }
            })).json();
            
            if(response.ok){
            
                this.login({jwt : response.jwt , usuario: this.usuario});
            
            }
        }
    }
}

</script>

<template>
    <div id="login-container" class="d-flex justify-content-center align-items-center" >
        <div class="login">           
            <h1 class="text-center">Hola!</h1>
                <form>
                    <div class="form-group">
                        <label class="form-label" for="usuario">USUARIO</label>
                        <input class="form-control" v-model="this.usuario" placeholder="Ingrese su usuario" type="text" id="usuario" required>
                        <div v-if="this.error_user" class="invalid-feedback">
                            Por favor ingrese un usuario
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="password">PASSWORD</label>
                        <input class="form-control" v-model="this.pwd" placeholder="******" type="password" id="password" required>
                        <div v-if="this.error_password"  class="invalid-feedback" >
                            Por favor ingrese una contraseña
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" v-model="this.notarobot">
                        <label class="label">No soy un robot</label>
                    </div>
                    <div class="text-center">
                        <button type="button" :disabled="!computedCondition" class="btn btn-success w-80 bg-white text-dark" @click="LoginSubmit()">Aceptar</button>
                    </div>
                </form>
        </div>
    </div>
</template>

<style scoped>* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.label{
    margin-left: 1vh;
    font-size:medium;
}
#login-container{
        height:100vh;
        
    }
.invalid-feedback{
    visibility: hidden;
}

.login {
    width: 360px;
    padding: 20px;
    border-radius: 12px;
    background: black;
    
    color:#ffffff;
}

.login h1 {
    font-size: 36px;
    margin-bottom: 25px;
}

.login form {
    font-size: 20px;
}

.login form .form-group {
    margin-bottom: 12px;
}

.login form input[type="submit"] {
    font-size: 20px;
    margin-top: 15px;
}
</style>