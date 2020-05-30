import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";
import {BACK_POSITION} from './const'

export const itemImgListenerMixin = {
  data() {
    return {
      itemImgLoad: null,
      newRefresh: null
    }
  },
  mounted() {
    // 这里不能写小括号， 因为我们需要传的是一个方法， 如果我们不写小括号， 就是传的一个方法
    // 如果写了小括号， 传递的就是该方法的返回值了， 如果方法没有返回值， 那么就是undefind了
    this.newRefresh = debounce(this.$refs.scroll.refresh, 200)

    // 此处进行监听， 我们可以对callback函数进行保存
    this.itemImgLoad = () => {
      this.newRefresh()
    }
    this.$bus.$on('goodsItemImgLoad', this.itemImgLoad)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: {
        type: Boolean,
        default: false
      }
    }
  },
  mounted() {
    this.isShowBackTop = false
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    listenerShowBackTop(position) {
      this.isShowBackTop = (- position.y) > BACK_POSITION
    }
  }
}
