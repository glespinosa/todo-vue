<template>
<div class="page-wrapper login-form">
    <h2 class="login-heading">Register</h2>
    <form action="#" @submit.prevent="register">

      <!-- <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div> -->
      <div class="server-error" v-for="(value,key) in serverError" :key="key">
        {{ value[0] }}
      </div>
      <ValidationObserver ref="form">

        <ValidationProvider name="name" rules="required" v-slot="{ errors }">
          <div class="form-control">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" class="login-input" :class="{'input-error' : errors[0]}" v-model="name">
            <span v-if="errors[0]" class="form-error">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
          <div class="form-control">
            <label for="email">Email</label>
            <input type="text" name="email" id="email" class="login-input" :class="{'input-error' : errors[0]}" v-model="email">
            <span v-if="errors[0]" class="form-error">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider name="password" rules="required|min:6" v-slot="{ errors }">
          <div class="form-control mb-more">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" class="login-input" :class="{'input-error' : errors[0]}" v-model="password">
            <span v-if="errors[0]" class="form-error">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <div class="form-control">
          <button type="submit" class="btn-submit">Create Account</button>
        </div>

      </ValidationObserver>
    </form>
  </div>
</template>

<script>

export default {
  name:'Register',
  data(){
    return{
      name:'',
      email:'',
      password:'',
      serverError:'',
      successMessage: ''
    }
  },
  methods:{
      async register(){
        const success = await this.$refs.form.validate()
        const credentials = {
          name: this.name,
          email: this.email,
          password: this.password
        }

        if(!success){
          this.password = ''
          return
        }else{
          try{
            await this.$store.dispatch('register',credentials)
            this.successMessage = 'Registered Successfully!'
            this.$router.push({name:'login', params:{ dataSuccessMessage : this.successMessage} })
          }catch(error){
            this.serverError = Object.values(error.response.data.errors)
          }
        }

        

      }
    }
}
</script>

<style>

</style>