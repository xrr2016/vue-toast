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

    ;['bottom', 'center', 'top'].forEach(type => {
      Vue.prototype.$toast[type] = (msg) => {
        return Vue.prototype.$toast(msg, type)
      }
    })

    Vue.prototype.$loading = (msg, type) => {
      const load = $$('loading-mask')
      if (type === 'close') {
        load && body.removeChild(load)
      } else {
        if (load) {
          return
        }
        const LoadTpl = Vue.extend({
          template: `<div>${msg}</div>`
        })
        const tpl = new LoadTpl().$mount().$el
        body.appendChild(tpl)
      }
    }
    ['open', 'close'].forEach(type => {
      Vue.prototype.$loading[type] = (msg) => {
        return Vue.prototype.$loading(msg, type)
      }
    })
    function $$ (ele) {
      return document.querySelectorAll(ele)
    }
  }
}

module.export = Toast
