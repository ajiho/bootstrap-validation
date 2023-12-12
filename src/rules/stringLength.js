import constants from '../constants'
import Utils from '../utils'

export default {
  html5Attributes: {
    message: 'message',
    min: 'min',
    max: 'max',
    trim: 'trim',
    utf8bytes: 'utf8Bytes',
  },

  enableByHtml5: function ($field) {
    let options = {}
    let maxLength = $field.attr('maxlength')
    let minLength = $field.attr('minlength')

    if (maxLength) {
      options.max = parseInt(maxLength, 10)
    }

    if (minLength) {
      options.min = parseInt(minLength, 10)
    }

    return $.isEmptyObject(options) ? false : options
  },

  /**
   * 检查元素值的长度是否小于或大于给定的数字
   *
   * @param {bootstrapValidation} validation 验证器插件实例
   * @param {jQuery} $field 字段元素
   * @param {Object} options 由以下键组成:
   * - min
   * - max
   *      - 数字
   *      - 字段的名称，其值定义数字
   *      - 返回数字的回调函数的名称
   *      - 返回数字的回调函数
   *
   * - message: 无效消息
   * - trim: 指示是否在修剪值后计算长度。默认情况下为false
   * - utf8bytes: 以UTF-8字节计算字符串长度，默认为false
   * @returns {Object}
   */
  rule: function (validation, $field, options) {
    let value = $field.val()

    // console.log(validation, $field, options);

    if (options.trim === true || options.trim === 'true') {
      value = $.trim(value)
    }

    if (value === '') {
      return true
    }

    let min = $.isNumeric(options.min)
      ? options.min
      : validation.getDynamicOption($field, options.min)

    let max = $.isNumeric(options.max)
      ? options.max
      : validation.getDynamicOption($field, options.max)

    let isValid = true
    let length = options.utf8Bytes ? Utils.utf8Length(value) : value.length
    let message =
      options.message || $.fn[constants.NAME].i18n.stringLength['default']

    if (
      (min && length < parseInt(min, 10)) ||
      (max && length > parseInt(max, 10))
    ) {
      isValid = false
    }

    switch (true) {
      case !!min && !!max:
        message = Utils.format(
          options.message || $.fn[constants.NAME].i18n.stringLength.between,
          [parseInt(min, 10), parseInt(max, 10)],
        )
        break

      case !!min:
        message = Utils.format(
          options.message || $.fn[constants.NAME].i18n.stringLength.more,
          parseInt(min, 10),
        )
        break

      case !!max:
        message = Utils.format(
          options.message || $.fn[constants.NAME].i18n.stringLength.less,
          parseInt(max, 10),
        )
        break

      default:
        break
    }

    return { valid: isValid, message: message }
  },
}
