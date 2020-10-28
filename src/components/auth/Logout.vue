<template>
  <div>
      Logging out....
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name:'Logout',
    methods:{
        ...mapActions(['destroyToken','clearTodos']),
    },
    async created(){
        try{
            this.clearTodos()
            await this.destroyToken()
            this.$router.push({name:'home'})
        }catch(error){
            console.log(error)
        }
        

    }
}
</script>

<style>

</style>