import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://todo-laravel.test/api'


export const store = new Vuex.Store({
    state:{
        filter:'all',
        todos:[],
        token:localStorage.getItem('access_token') || null,
        username : null
    },

    getters:{
        username(state){
            return state.username
        },
        loggedIn(state){
            return state.token != null
        },

        remaining(state){
            return state.todos.filter((todo) => !todo.completed).length;
        },

        anyRemaining(state,getters){
            return getters.remaining != 0
        },

        todosFiltered(state){
            if(state.filter === 'active')
                return state.todos.filter((todo) => !todo.completed)
            else if(state.filter === 'completed')
                return state.todos.filter((todo) => todo.completed)
            
            return state.todos
        },

        showClearCompletedButton(state){
            return state.todos.filter(todo => todo.completed).length > 0
        }
    },

    mutations:{
        retrieveUser(state,response){
            state.username = response.data.name
        },
        clearState(state){
            state.todos = []
            state.username = null
        },
        destroyToken(state){
            state.token = null
        },
        retrieveToken(state,token){
            state.token = token
        },
        retrieveTodos(state,todos){
            state.todos = todos
        },
        addTodo(state,todo){
            state.todos.push(todo)
        },
        
        clearCompleted(state){
           
            state.todos = state.todos.filter(todo => !todo.completed)
        },

        updateFilter(state,filter){
            state.filter = filter
        },

        checkAll(state,checked){
            state.todos.forEach((todo) => todo.completed = checked)
        },

        removeTodo(state,id){
            const index = state.todos.findIndex(item => item.id == id)
            state.todos.splice(index,1)
        },

        updateTodo(state,todo){
            const index = state.todos.findIndex(item => item.id == todo.id)
            state.todos.splice(index,1,todo)
        }
    },

    actions:{
        retrieveUser(context){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;

                return new Promise(async function(resolve,reject)   {
                    try{
                        const response = await axios.get('/user')
                        const data = response
                        context.commit('retrieveUser',data)
                        resolve(response)
                    }catch(error){
                        reject(error)
                    }
                    
                })
        },
        clearState({ commit }){
            commit('clearState')
        },
        register({ commit },credentials){
            return new Promise(async function (resolve,reject) {
                try{
                    const response = await axios.post('/register',credentials)
                    resolve(response)
                }catch(error){
                    reject(error)
                }
            })
        },

        destroyToken( context ){
            if(context.getters.loggedIn){
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;

                return new Promise(async function(resolve,reject)   {
                    try{
                        const response = await axios.post('/logout')
                        localStorage.removeItem('access_token')
                        context.commit('destroyToken')
                        resolve(response)
                    }catch(error){
                        localStorage.removeItem('access_token')
                        reject(error)
                    }
                    
                })
            }

        },
        retrieveToken({ commit },credentials){
            return new Promise(async function(resolve,reject)   {
                try{
                    const response = await axios.post('/login',credentials)
                    const token = response.data.access_token; 
                    localStorage.setItem('access_token',token)
                    commit('retrieveToken',token)
                    resolve(response)
                }catch(error){
                    reject(error)
                }
                
            })
        },

        async retrieveTodos({ state,commit }){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token;
            const response = await axios.get('/todos')
            const data = response.data
            commit('retrieveTodos',data)
        },

        async addTodo({ state,commit },todo){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token;
            const response = await axios.post('/todos',todo)
            const data = response.data
            commit('addTodo',data)
        },
        
        async clearCompleted({ commit }){
            const completed = store.state.todos
                              .filter(todo => todo.completed)
                              .map(todo => todo.id)
            await axios.delete('/todosDeleteCompleted',{
                data:{
                    todos:completed
                }
            })
            commit('clearCompleted')
        },

        updateFilter({ commit },filter){
            commit('updateFilter',filter)
        },

        async checkAll({ state,commit },checked){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token;
            await axios.patch('/todosCheckAll',{
                completed:checked
            })
            commit('checkAll',checked)
        },

        async removeTodo({ state,commit },id){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token;
            await axios.delete('/todos/' + id)
            commit('removeTodo',id)
        },

        async updateTodo({ state,commit },todo){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token;
            const response = await axios.patch('/todos/' + todo.id,todo)
            const data = response.data
            commit('updateTodo',data)
        }
    }

})