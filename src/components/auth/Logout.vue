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
        ...mapActions(['destroyToken','clearState']),
    },
    async created(){
        try{
            await this.clearState()
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