import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)


const getters={
    cartLength(state) {
        return state.cartList.length;
    },
    cartList(state){
        return state.cartList
    }
}
const store =new Vuex.Store({

    state:{
        cartList:[]
    },

    // 通过mutation对数据进行传输
    mutations:{

        // mutations主要修改state中的状态，每个方法的完成尽可能单一
        // addToCart(state,playload){
            // state.cartList.push(playload)
            //找到cartList中存在和新增的playload一样的商品时赋值给oldProduct
            //即oldProduct==playload
            // let oldProduct = this.state.cartList.find(item => {
            //     return item.iid===playload.iid
            // })
            // //oldProduct==playload
            // if(oldProduct){
            //     oldProduct.count+=1;
            // }else {
            //     playload.count=1
            //     state.cartList.push(playload)
            // }
        // }
        addCounter(state,playload){
            playload.count++;

        },
        addToCartNum(state,playload){
            state.cartList.push(playload)
            console.log(playload);

        },
    },

    //代码重构建
    actions:{
        addToCart(context,playload){
            return new Promise((resolve, reject) => {
                let oldProduct = context.state.cartList.find(item => {
                    return item.iid===playload.iid
                })

                if(oldProduct){
                    context.commit("addCounter",oldProduct)
                    resolve("数量+1")
                }else {
                    playload.count=1
                    playload.checked=false
                    context.commit("addToCartNum",playload)
                    resolve("添加商品")
                }
            })
        }
    },
    getters

})

export default store
