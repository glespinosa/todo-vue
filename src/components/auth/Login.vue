<template>
  <div class="page-wrapper login-form">
    <h2 class="login-heading">Login</h2>

    <form action="#" @submit.prevent="login">
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
      <div v-if="serverError" class="server-error">{{ serverError }}</div>
      <ValidationObserver ref="form">
        <ValidationProvider name="username" rules="required|email" v-slot="{ errors }">
          <div class="form-control">
            <label for="username">Username/Email</label>
            <input type="text" name="username" id="username" class="login-input" v-model="username">
            <span v-if="errors[0]" class="form-error">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider name="password" rules="required|min:6" v-slot="{ errors }">
          <div class="form-control">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" class="login-input"  v-model="password">
            <span v-if="errors[0]" class="form-error">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
        

        <div class="form-control">
          <button type="submit" class="btn-submit" :disabled="loading">
                <div class="lds-ring-container" v-if="loading">
                  <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div> Login
          </button>
        </div>
      </ValidationObserver>
    </form>
  </div>
</template>

<script>

import { mapActions } from 'vuex'


export default {
  name:'Login',
  data(){
    return{
      username:'',
      password:'',
      serverError:'',
      successMessage : this.dataSuccessMessage,
      loading:false
    }
  },
  props:{
    dataSuccessMessage:{
      type:String,
    }
  },
  
  methods:{
      ...mapActions(['retrieveToken']),
    async login(){
      this.loading = true

      try{
        const success = await this.$refs.form.validate()
        if(!success){
          this.serverError = ''
          this.loading = false
          return
        }else{
          try{
            const credentials = {
              username: this.username,
              password: this.password
            }
            await this.retrieveToken(credentials)
            this.loading = false
            this.$router.push({name:'todo'})

          }catch(error){
            this.loading = false
            this.serverError = error.response.data
            this.password = ''
            this.successMessage = ''
          }
        }
      }catch(error){
        console.log(error)
      }
      

        
  
    }
  }

}
</script>

<style>

</style>