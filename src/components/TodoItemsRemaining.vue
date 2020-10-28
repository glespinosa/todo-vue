<template>
  <div>{{ remaining }} items left</div>
</template>

<script>

import { mapGetters } from 'vuex' 

export default {
    name:'TodoItemsRemaining',
    computed:{
        ...mapGetters(['remaining'])
    }
}
</script>
