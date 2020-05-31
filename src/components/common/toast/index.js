import Toast from "./Toast";

const obj = {}

obj.install = function (Vue) {
  // 我们的目的是要把Toast上的模板挂载到 document中的一个div上

  // 1. 首先， 我们要进行注册
  const ToastConstructor = Vue.extend(Toast)

  // 2. 然后我们就可以new出来需要的toast对象了
  const toast = new ToastConstructor()

  // 3. 接下来，我们就可以把toast里面的$el挂载到 document的div上了
  toast.$mount(document.createElement('div'))

  // 4. 最后， 我们要把toast的标签内容$el 追加到body后
  document.body.appendChild(toast.$el)

  // 5. 然后我们进行一次全局注册就好了
  Vue.prototype.$toast = toast
}

export default obj
