<template>
  <div>
    <div v-if="username" class="name-container">
        Welcome, {{ username }}
    </div>
    <input type="text" 
    class="todo-input" 
    v-model="newTodo" 
    placeholder="What needs to be done"
    @keyup.enter="addedTodo">
    
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <TodoItem v-for="(todo,index) in todosFiltered" :key="todo.id"
        :todo="todo" :index="index" 
         :checkAll="!anyRemaining" />
    </transition-group>

    <div class="extra-container">
        <TodoCheckAll />
        <TodoItemsRemaining />
    </div>

    <div class="extra-container">
        <TodoFiltered />
        <div>
            <transition name="fade">
                <TodoClearCompleted />
            </transition>
        </div>
    </div>


  </div>
</template>

<script>
import TodoItem from './TodoItem'
import TodoItemsRemaining from './TodoItemsRemaining'
import TodoCheckAll from './TodoCheckAll'
import TodoFiltered from './TodoFiltered'
import TodoClearCompleted from './TodoClearCompleted'

import { mapGetters,mapActions } from 'vuex'

export default {
    name:'TodoList',
    components:{
        TodoItem,
        TodoItemsRemaining,
        TodoCheckAll,
        TodoFiltered,
        TodoClearCompleted
    },
    async created(){
        await this.retrieveUser()
        this.retrieveTodos()

    },
    data(){
        return{
            newTodo: '',
            idForTodo:3,
            beforeEditCache: '',
        }
    },
    computed:{
        ...mapGetters(['remaining','anyRemaining','todosFiltered','showClearCompletedButton','username'])
    },

    methods:{
        ...mapActions(['addTodo','retrieveTodos','retrieveUser']),
        addedTodo(){
            if(this.newTodo.trim().length === 0) return
            this.addTodo({
                id:this.idForTodo,
                title:this.newTodo,
                completed:false,
                editing:false
            })

            this.newTodo = ''
            this.idForTodo++
        },
    }
}
</script>

<style lang="scss">

</style>