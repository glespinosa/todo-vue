<template>
    <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>  
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
export default {
    name:'TodoClearCompleted',
    computed:{
        ...mapGetters(['showClearCompletedButton'])
    },
    methods:{
        ...mapActions(['clearCompleted'])
    }
}
</script>

<style>

</style>