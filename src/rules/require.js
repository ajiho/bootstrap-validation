export default {
  //断给定的 $field 元素是否启用了 HTML5 的 required 属性
  //为 true，则表示该元素要求必填；如果返回值为 false，则表示该元素不要求必填
  enableByHtml5($field) {
    let required = $field.prop('required')
    return required === true
  },

  /**
   * 检查输入值是否为空
   *
   * @param {BootstrapValidation} validation 验证器插件实例
   * @param {jQuery} $field 字段元素
   * @param {Object} options
   * @returns {Boolean}
   */
  rule(validation, $field, options) {
    let type = $field.attr('type')
    if ('radio' === type || 'checkbox' === type) {
      return (
        validation
          .getFieldElements($field.attr('data-bv-field'))
          .filter(':checked').length > 0
      )
    }

    if (
      'number' === type &&
      $field.get(0).validity &&
      $field.get(0).validity.badInput === true
    ) {
      return true
    }

    return $.trim($field.val()) !== ''
  },
}
