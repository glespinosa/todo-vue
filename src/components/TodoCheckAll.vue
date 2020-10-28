<template>
    <div>
        <label>
            <input type="checkbox" :checked="!anyRemaining"
            @change="allChecked"> Check All
        </label>
    </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'

export default {
    name:'TodoCheckAll',
    computed:{
        ...mapGetters(['anyRemaining'])
    },
    methods:{
        ...mapActions(['checkAll']),
        allChecked(){
            this.checkAll(event.target.checked)
        }
    }
}
</script>
