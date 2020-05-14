import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		loading:'0'
	},
	mutations: {
		switch_loading(state,status){
			// console.log(status)
			if(status == "change"){
				if(state.loading=='0'){
					state.loading = '1'
				}else{
					state.loading = '0'
				}
			}else{
				state.loading = status;
			}
		}
	},
	actions: {
		
	}
})

export default store
