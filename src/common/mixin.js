import {debounce} from "./utils";
import backTop from "@/components/content/backTop/backTop";

export const itemsListenerMixin = {
    data(){
        return {
            itemsListener:null,
            refresh:null
        }
    },

  mounted(){

        // 防抖动延迟时间缩短则可以避免出现滑动商品延迟bug
      this.refresh=debounce(this.$refs.scroll.refresh,100)

      this.itemsListener=()=>{
          this.refresh()
      }


      // 一般放在mounted中防止拿不到$refs的参数
      this.$bus.$on("itemImageLoad",this.itemsListener)
      console.log("我是混入内容");
  }
}


//返回顶部
export const backTopMixin={

    data(){
        return {
            showIn:false
        }
    },

    components:{
        backTop
    },
    methods:{
        backClick(){
            // 调用scroll.vue中的backTop函数
            this.$refs.scroll.backTop(0,0,100)
        },
    }
}