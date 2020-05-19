import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		loading:'0',
		selectQuestions: [], //问答管理选择
		selectRequestCars: [], //求购管理选择
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
		},
		selectQuestion(state, selectQuestions) {
			this.state.selectQuestions = selectQuestions
		},
		selectRequestCar(state, selectRequestCars) {
			this.state.selectRequestCars = selectRequestCars
		}
	},
	actions: {
		
	}
})

export default store
