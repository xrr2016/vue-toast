const Toast = {}
Toast.install = (Vue, options) => {
  let _options = {
    defaultType: 'top',
    duration: 2500
  }

  if (options) {
    for (let key in options) {
      _options[key] = options[key]
    }
  }

  Vue.prototype.$toast = (msg, type) => {
    const body = document.body || document.documentElement.body
    if (type) {
      _options.defaultType = type
    }
    if ($$('vue-toast').length) {
      return
    }
    let ToastTpl = Vue.extend({
      template: `<div class="vue-toast toast-${_options.defaultType}">${msg}</div>`
    })
    let tpl = new ToastTpl().$mount().$el
    body.appendChild(tpl)
    setTimeout(() => {
      body.removeChild(tpl)
    }, _options.duration)
    ['bottom', 'center', 'top'].forEach(type => {
      Vue.prototype.$toast[type] = (msg) => {
        return Vue.prototype.$toast(msg, type)
      }
    })
    function $$ (ele) {
      return document.querySelectorAll(ele)
    }
  }
}

module.export = Toast
