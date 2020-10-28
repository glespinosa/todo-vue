<template>
    <div class="todo-item">
        <div class="todo-item-left">
            <input type="checkbox" v-model="completed" @change="doneEdit">
            <div v-if="!editing" @dblclick="editTodo" class="todo-item-label"
            :class="{'completed':completed}">
                {{ title }}
            </div>
            <input v-else class="todo-item-edit" type="text" v-model="title" @blur="doneEdit" 
            @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus>
        </div>
        <div>
            <!-- <button @click="pluralize">Plural</button> -->
            <span class="remove-item" @click="removedTodo(id)">
                &times;
            </span>
        </div>
    </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
    name:'TodoItem',
    props:{
        todo:{
            type:Object,
            required:true
        },
        index:{
            type:Number,
            required:true
        },
        checkAll:{
            type:Boolean,
            required:true
        }
    },
    created(){
        eventBus.$on('pluralize',this.handlePluralize)
    },
    beforeDestroy(){
        eventBus.$off('pluralize',this.handlePluralize)

    },
    data(){
        return{
            id:this.todo.id,
            title:this.todo.title,
            completed:this.todo.completed,
            editing:this.todo.editing,
            beforeEditCache:''
        }
    },
    directives:{
        focus:{
            inserted:function(el){
                el.focus()
            }
        }
    },
    watch:{
        checkAll(){
            this.completed = this.checkAll ? true : this.todo.completed
        }
    },
    methods:{
        ...mapActions(['removeTodo','updateTodo']),
        removedTodo(id){
            this.removeTodo(id)
        },

        editTodo(){
            this.beforeEditCache = this.title
            this.editing = true
        },

        doneEdit(){
            if(this.title.trim().length === 0){
                this.title = this.beforeEditCache
            }
            this.editing = false
            this.updateTodo({
                    id:this.id,
                    title:this.title,
                    completed:this.completed,
                    editing:this.editing
                })
          
        },

        cancelEdit(){
            this.title = this.beforeEditCache
            this.editing = false
        },

        pluralize(){
            eventBus.$emit('pluralize')
        },

        handlePluralize(){
            this.title = this.title + 's'
            const index = this.$store.state.todos.findIndex(item => item.id == this.id)
            this.$store.state.todos.splice(index,1,{
                    id:this.id,
                    title:this.title,
                    completed:this.completed,
                    editing:this.editing
                })
        }
    }
}
</script>
