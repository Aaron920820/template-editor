import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
	showFooter: true,
    images:'white'
};
const getters = {
	isShow(state){
		return state.showFooter
	},
	changebgr(state){
		return state.images
	}
};
const mutations = {
    show(state) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        state.showFooter = true;
    },
    hide(state) {  //同上
        state.showFooter = false;
    },
    newNum(state,color){ //同上，这里面的参数除了state之外还传了需要增加的值sum
       state.images = color;
    }
};
 const actions = {
    hideFooter(context) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
        context.commit('hide');
    },
    showFooter(context) {  //同上注释
        context.commit('show');
    },
    getNewNum(context,color){   //同上注释，num为要变化的形参
        context.commit('newNum',color)
     }
};
const store = new Vuex.Store({
	state
});
 
export default store;