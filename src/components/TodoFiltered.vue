<template>
    <div>
        <button :class="{active : filter == 'all'}" @click="changeFilter('all')">All</button>
        <button :class="{active : filter == 'active'}" @click="changeFilter('active')">Active</button>
        <button :class="{active : filter == 'completed'}" @click="changeFilter('completed')">Completed</button>
    </div>
</template>

<script>

import { mapState,mapActions } from 'vuex'

export default {
    name:'TodoFiltered',
    computed:{
        filter(){
            return mapState.filter
        }
    },
    methods:{
        ...mapActions(['updateFilter']),
        changeFilter(filter){
            this.updateFilter(filter)
        }
    }
}
</script>

<style>

</style>