import $ from 'jquery'
import Constants from './constants'
import Utils from './utils'
import Rules from './rules'

class BootstrapValidation {
  // 确定用户更改字段值时激发的事件
  #changeEvent = 'input'
  // 当远程/回调验证器返回时，指示表单已准备好提交的标志
  #submitIfValid = null
  // 缓存的字段元素
  #cacheFields = {}
  //选项
  #options = {}
  //表单
  #$formEl = null

  // 无效字段数组
  #invalidFields = $([])

  //提交按钮
  #$submitButton = null
  // 隐藏按钮
  #$hiddenButton = null

  // 单击以提交表单的提交按钮

  //静态变量
  static VERSION = Constants.VERSION
  static DEFAULTS = Constants.DEFAULTS

  constructor(el, options) {
    this.#options = options
    this.#$formEl = $(el)

    //调用初始化方法
    this.#init()
  }

  // 初始化
  #init() {
    console.log('ww')
  }
}

/**
 * jQuery API
 * ====================================================
 */
$.fn[Constants.NAME] = function (option) {
  //获取参数
  let params = arguments
  return this.each(function () {
    let $this = $(this)
    let data = $this.data(Constants.NAME)

    //选项合并
    let options = $.extend(
      {},
      $.fn[Constants.NAME].defaults,
      'object' === typeof option && option,
    )
    //如果不存在就创建一个实例,然后存到data属性
    if (!data) {
      data = new BootstrapValidation(this, options)
      $this.data(Constants.NAME, data)
    }

    if ('string' === typeof option) {
      if (typeof data[option] !== 'function') {
        throw new Error(`Unknown method: ${option}`)
      }
      data[option].apply(data, Array.prototype.slice.call(params, 1))
    }
  })
}

$.fn[Constants.NAME].Constructor = BootstrapValidation
$.fn[Constants.NAME].VERSION = BootstrapValidation.VERSION
$.fn[Constants.NAME].defaults = BootstrapValidation.DEFAULTS
$.fn[Constants.NAME].validators = Rules
$.fn[Constants.NAME].i18n = {}
$.fn[Constants.NAME].utils = Utils

export default BootstrapValidation
