<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex'


export default{
   props:{
    logged :{ type : Boolean}
   },
   setup(){
        const store = useStore();

        let logged = computed(()=> store.state.logged)

        const logout = () =>{
            store.commit('logout');
            
        }

        return {logged, logout}
        
    }

}
</script>

<template>
    <nav   class="navbar navbar-light bg-light justify-content-end">
        <button v-if="logged" class="btn border border-dark my-2 my-sm-0 boton" type="button" @click="logout">Log out</button>
        <button v-if="!logged" class="btn border border-dark my-2 my-sm-0 boton" type="button" @click="login">Log in</button>
</nav>

</template>
<style scoped>
.boton{
    margin-right: 2vh;
}
.border:hover{
    background-color: black;
    color:white;
}
</style>
