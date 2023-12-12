export default {
  html5Attributes: {
    message: 'message',
    name: 'name',
    type: 'type',
    url: 'url',
    data: 'data',
    delay: 'delay',
  },

  /**
   * 销毁bootstrapValidattion时销毁计时器（使用validation.dedestroy（）方法）
   */
  destroy(validation, $field, options) {
    if ($field.data('bv.remote.timer')) {
      clearTimeout($field.data('bv.remote.timer'))
      $field.removeData('bv.remote.timer')
    }
  },

  /**
   * 请求远程服务器检查输入值
   *
   * @param {BootstrapValidation} validation 插件实例
   * @param {jQuery} $field 字段元素
   * @param {Object} options 选项
   * - url {String|Function}
   * - type {String} [optional] 可以是GET或POST（默认）
   * - data {Object|Function} [optional]: 默认情况下，它将采用值
   *  {
   *      <fieldName>: <fieldValue>
   *  }
   * - delay
   * - name {String} [optional]: 覆盖请求的字段名称。
   * - message: 无效消息
   * - headers: 附加标头
   * @returns {Deferred}
   */
  rule(validation, $field, options) {
    let value = $field.val()
    let dfd = new $.Deferred()

    if (value === '') {
      // 异步操作成功，调用 resolve()
      dfd.resolve($field, 'remote', { valid: true })
      return dfd
    }

    let name = $field.attr('data-bv-field')
    let data = options.data || {}
    let url = options.url
    let type = options.type || 'GET'
    let headers = options.headers || {}

    // 支持动态数据
    if ('function' === typeof data) {
      data = data.call(this, validation)
    }

    // 从HTML5属性分析字符串数据
    if ('string' === typeof data) {
      data = JSON.parse(data)
    }

    // 支持动态url
    if ('function' === typeof url) {
      url = url.call(this, validation)
    }

    data[options.name || name] = value

    function runCallback() {
      const xhr = $.ajax({
        type: type,
        headers: headers,
        url: url,
        dataType: 'json',
        data: data,
      })

      xhr.then(function (response) {
        response.valid = response.valid === true || response.valid === 'true'

        //异步操作成功，调用 resolve()
        dfd.resolve($field, 'remote', response)
      })

      dfd.fail(function () {
        xhr.abort()
      })
      return dfd
    }

    if (options.delay) {
      //由于表单可能有多个具有相同名称的字段
      //我必须将计时器连接到字段元素
      if ($field.data('bv.remote.timer')) {
        clearTimeout($field.data('bv.remote.timer'))
      }
      $field.data('bv.remote.timer', setTimeout(runCallback, options.delay))
      return dfd
    } else {
      return runCallback()
    }
  },
}
