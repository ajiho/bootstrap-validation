import isEmail from 'validator/lib/isEmail'

export default {
  html5Attributes: {
    message: 'message',
    multiple: 'multiple',
    separator: 'separator',
  },

  enableByHtml5($field) {
    return 'email' === $field.attr('type')
  },

  /**
   * 当且仅当输入值是有效的电子邮件地址时返回true
   *
   * @param {BootstrapValidation} validation 验证插件实例
   * @param {jQuery} $field Field element
   * @param {Object} [options]
   * - multiple: 允许多个电子邮件地址，用逗号或分号分隔；默认值为false。
   * - separator: Regex用于一个或多个字符，这些字符应作为地址之间的分隔符；默认值为逗号/[，；]/，即逗号或分号。
   * @returns {Boolean}
   */
  rule(validation, $field, options) {
    let value = $field.val()
    if (value === '') {
      return true
    }

    let allowMultiple = options.multiple === true || options.multiple === 'true'

    if (allowMultiple) {
      //如果是多个邮箱
      let separator = options.separator || /[,;]/

      let addresses = this._splitEmailAddresses(value, separator)

      for (let i = 0; i < addresses.length; i++) {
        if (!isEmail(addresses[i])) {
          return false
        }
      }
      return true
    } else {
      return isEmail(value)
    }
  },

  _splitEmailAddresses(emailAddresses, separator) {
    let quotedFragments = emailAddresses.split(/"/),
      quotedFragmentCount = quotedFragments.length,
      emailAddressArray = [],
      nextEmailAddress = ''

    for (let i = 0; i < quotedFragmentCount; i++) {
      if (i % 2 === 0) {
        let splitEmailAddressFragments = quotedFragments[i].split(separator),
          splitEmailAddressFragmentCount = splitEmailAddressFragments.length

        if (splitEmailAddressFragmentCount === 1) {
          nextEmailAddress += splitEmailAddressFragments[0]
        } else {
          emailAddressArray.push(
            nextEmailAddress + splitEmailAddressFragments[0],
          )

          for (let j = 1; j < splitEmailAddressFragmentCount - 1; j++) {
            emailAddressArray.push(splitEmailAddressFragments[j])
          }
          nextEmailAddress =
            splitEmailAddressFragments[splitEmailAddressFragmentCount - 1]
        }
      } else {
        nextEmailAddress += '"' + quotedFragments[i]
        if (i < quotedFragmentCount - 1) {
          nextEmailAddress += '"'
        }
      }
    }

    emailAddressArray.push(nextEmailAddress)
    return emailAddressArray
  },
}
